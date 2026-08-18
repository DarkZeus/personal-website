<template>
  <div
    ref="stage"
    class="holo-stage"
    :inert="motionGateVisible"
    tabindex="-1"
    @pointerenter="handlePointerEnter"
    @pointerdown="handlePointerDown"
    @pointermove="handlePointerMove"
    @pointerup="handlePointerUp"
    @pointercancel="handlePointerUp"
    @pointerleave="handlePointerLeave"
    @click="handleCardActivation"
  >
    <div ref="card" class="holo-card">
      <div class="card-stock" aria-hidden="true"></div>
      <canvas ref="materialCanvas" class="holo-material" aria-hidden="true"></canvas>

      <div class="printed-face">
        <slot />
      </div>
    </div>
  </div>

  <Teleport to="body">
    <Transition name="motion-gate">
      <section
        v-if="motionGateVisible"
        class="motion-permission-overlay"
        role="dialog"
        aria-modal="true"
        aria-labelledby="motion-permission-title"
        aria-describedby="motion-permission-description motion-permission-privacy"
        @keydown="handleMotionGateKeydown"
      >
        <div class="motion-permission-content">
          <h2 id="motion-permission-title">
            {{ motionPermissionTitle }}
          </h2>
          <p id="motion-permission-description" class="motion-permission-description">
            {{ motionPermissionDescription }}
          </p>

          <div class="motion-permission-actions">
            <button
              ref="enableMotionButton"
              class="motion-permission-primary"
              type="button"
              :disabled="motionState === 'requesting' || motionState === 'enabled' || motionState === 'unavailable'"
              :aria-busy="motionState === 'requesting'"
              @click="enableDeviceMotion"
            >
              {{ motionPermissionAction }}
            </button>
            <button
              ref="skipMotionButton"
              class="motion-permission-secondary"
              type="button"
              :disabled="motionState === 'enabled'"
              @click="continueWithoutMotion"
            >
              Continue with touch
            </button>
          </div>

          <p id="motion-permission-privacy" class="motion-permission-privacy">
            <LockClosedIcon aria-hidden="true" />
            Sensor data stays on this device.
          </p>
        </div>
      </section>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { LockClosedIcon } from '@heroicons/vue/24/outline'
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { createHoloMaterialRenderer, type HoloMaterialRenderer } from './holoMaterialRenderer'

type MotionState = 'idle' | 'requesting' | 'enabled' | 'denied' | 'skipped' | 'unavailable'
type MotionPermissionApi = {
  requestPermission?: () => Promise<'granted' | 'denied'>
}
type WakeLockSentinelLike = {
  readonly released?: boolean
  release: () => Promise<void>
}
type WakeLockNavigator = Navigator & {
  wakeLock?: {
    request: (type: 'screen') => Promise<WakeLockSentinelLike>
  }
}

const MOTION_PREFERENCE_KEY = 'business-card-motion'

const stage = ref<HTMLElement | null>(null)
const card = ref<HTMLElement | null>(null)
const materialCanvas = ref<HTMLCanvasElement | null>(null)
const enableMotionButton = ref<HTMLButtonElement | null>(null)
const skipMotionButton = ref<HTMLButtonElement | null>(null)
const motionState = ref<MotionState>('idle')
const motionGateVisible = ref(false)
const prefersReducedMotion = ref(false)

const motionPermissionAction = computed(() => {
  if (motionState.value === 'requesting') return 'Waiting for permission…'
  if (motionState.value === 'enabled') return 'Motion connected'
  if (motionState.value === 'denied') return 'Try again'
  if (motionState.value === 'unavailable') return 'HTTPS required'
  return 'Enable motion'
})

const motionPermissionTitle = computed(() => {
  if (motionState.value === 'denied') return 'Motion access is off'
  if (motionState.value === 'unavailable') return 'Secure connection required'
  return 'Unlock physical mode'
})

const motionPermissionDescription = computed(() => {
  if (motionState.value === 'denied') {
    return 'Motion wasn’t allowed. Retry the request, or continue with touch.'
  }
  if (motionState.value === 'unavailable') {
    return 'This preview is using HTTP. Open the card over HTTPS to enable phone motion; touch still works here.'
  }
  return 'Move your phone to bend light across the card. Motion access only drives the effect.'
})

const target = { x: 0, y: 0 }
const sensorTarget = { x: 0, y: 0 }
const tilt = { x: 0, y: 0 }
const velocity = { x: 0, y: 0 }
const foil = { x: 0, y: 0 }
const direct = { x: 0, y: 0 }
const impulseTarget = { x: 0, y: 0 }
const materialImpulse = { x: 0, y: 0 }
const gravityEstimate = { x: 0, y: 0 }
const orientationOrigin = { beta: 0, gamma: 0, set: false }

let frame = 0
let lastFrame = 0
let sensorsAttached = false
let visible = true
let pointerId: number | null = null
let pointerOverride = false
let isMobilePhysicalCard = false
let materialRenderer: HoloMaterialRenderer | null = null
let renderScale = 1
let slowFrameCount = 0
let fastFrameCount = 0
let motionEnergy = 0
let motionEnergyTarget = 0
let keepAwake = false
let wakeLock: WakeLockSentinelLike | null = null
let motionQuery: MediaQueryList | null = null
let intersectionObserver: IntersectionObserver | null = null
let handleMotionPreferenceChange: ((event: MediaQueryListEvent) => void) | null = null
let gateDismissTimer = 0

function clamp(value: number, min = -1, max = 1) {
  return Math.min(max, Math.max(min, value))
}

function hasTouchInput() {
  return navigator.maxTouchPoints > 0 || 'ontouchstart' in window
}

function canUseOrientation() {
  return !prefersReducedMotion.value
    && window.isSecureContext
    && 'DeviceOrientationEvent' in window
    && hasTouchInput()
}

function isInsecureMobilePreview() {
  return !window.isSecureContext && hasTouchInput()
}

function getMotionPermissionRequesters() {
  const requesters: Array<() => Promise<'granted' | 'denied'>> = []
  const orientationApi = DeviceOrientationEvent as typeof DeviceOrientationEvent & MotionPermissionApi
  if (typeof orientationApi.requestPermission === 'function') {
    requesters.push(orientationApi.requestPermission.bind(orientationApi))
  }

  if ('DeviceMotionEvent' in window) {
    const motionApi = DeviceMotionEvent as typeof DeviceMotionEvent & MotionPermissionApi
    if (typeof motionApi.requestPermission === 'function') {
      requesters.push(motionApi.requestPermission.bind(motionApi))
    }
  }

  return requesters
}

function getStoredMotionPreference() {
  try {
    return sessionStorage.getItem(MOTION_PREFERENCE_KEY)
  }
  catch {
    return null
  }
}

function storeMotionPreference(value: 'enabled' | 'skipped') {
  try {
    sessionStorage.setItem(MOTION_PREFERENCE_KEY, value)
  }
  catch {
    // The card still works when session storage is unavailable.
  }
}

async function showMotionGate() {
  motionGateVisible.value = true
  await nextTick()
  enableMotionButton.value?.focus({ preventScroll: true })
}

async function dismissMotionGate() {
  motionGateVisible.value = false
  await nextTick()
  stage.value?.focus({ preventScroll: true })
}

function setInput(x: number, y: number) {
  target.x = clamp(x)
  target.y = clamp(y)
  direct.x = target.x
  direct.y = target.y
  scheduleRender()
}

function handlePointerEnter(event: PointerEvent) {
  if (prefersReducedMotion.value || (motionState.value === 'enabled' && event.pointerType !== 'touch')) return
  handlePointerMove(event)
}

function handlePointerDown(event: PointerEvent) {
  if (prefersReducedMotion.value) return
  pointerId = event.pointerId
  pointerOverride = true
  stage.value?.setPointerCapture(event.pointerId)
  handlePointerMove(event)
  void requestWakeLock()
}

function handlePointerMove(event: PointerEvent) {
  if (!stage.value || prefersReducedMotion.value) return
  if (pointerId !== null && event.pointerId !== pointerId) return
  if (motionState.value === 'enabled' && !pointerOverride) return
  const rect = stage.value.getBoundingClientRect()
  const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
  const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2
  setInput(x, y)
}

function handlePointerUp(event: PointerEvent) {
  if (pointerId !== event.pointerId) return
  if (stage.value?.hasPointerCapture(event.pointerId)) stage.value.releasePointerCapture(event.pointerId)
  pointerId = null
  pointerOverride = false
  if (motionState.value === 'enabled') setInput(sensorTarget.x, sensorTarget.y)
  else handlePointerLeave()
}

function handlePointerLeave(event?: PointerEvent) {
  if (pointerOverride && event?.pointerId === pointerId) return
  if (motionState.value === 'enabled') return
  velocity.x += tilt.x > 0 ? -0.025 : 0.025
  velocity.y += tilt.y > 0 ? -0.02 : 0.02
  target.x = 0
  target.y = 0
  direct.x = 0
  direct.y = 0
  scheduleRender()
}

function handleCardActivation() {
  void requestWakeLock()
  if (motionState.value === 'idle' && canUseOrientation()) void requestDeviceMotion()
}

function continueWithoutMotion() {
  motionState.value = 'skipped'
  storeMotionPreference('skipped')
  void requestWakeLock()
  void dismissMotionGate()
}

function handleMotionGateKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    event.preventDefault()
    continueWithoutMotion()
    return
  }

  if (event.key !== 'Tab') return
  const controls = [enableMotionButton.value, skipMotionButton.value]
    .filter((control): control is HTMLButtonElement => Boolean(control && !control.disabled))
  if (!controls.length) return

  const currentIndex = controls.indexOf(document.activeElement as HTMLButtonElement)
  const nextIndex = event.shiftKey
    ? (currentIndex <= 0 ? controls.length - 1 : currentIndex - 1)
    : (currentIndex >= controls.length - 1 ? 0 : currentIndex + 1)
  event.preventDefault()
  controls[nextIndex]?.focus()
}

function handleOrientation(event: DeviceOrientationEvent) {
  if (prefersReducedMotion.value) return
  const beta = event.beta ?? 0
  const gamma = event.gamma ?? 0

  if (!orientationOrigin.set) {
    orientationOrigin.beta = beta
    orientationOrigin.gamma = gamma
    orientationOrigin.set = true
    return
  }

  const deltaBeta = clamp((beta - orientationOrigin.beta) / 22)
  const deltaGamma = clamp((gamma - orientationOrigin.gamma) / 22)
  const angle = window.screen.orientation?.angle ?? 0

  if (angle === 90) {
    sensorTarget.x = deltaBeta
    sensorTarget.y = -deltaGamma
  }
  else if (angle === 270) {
    sensorTarget.x = -deltaBeta
    sensorTarget.y = deltaGamma
  }
  else {
    sensorTarget.x = deltaGamma
    sensorTarget.y = deltaBeta
  }
  if (!pointerOverride) setInput(sensorTarget.x, sensorTarget.y)
}

function mapMotionToScreen(x: number, y: number) {
  const angle = window.screen.orientation?.angle ?? 0
  if (angle === 90) return { x: y, y: -x }
  if (angle === 270) return { x: -y, y: x }
  return { x, y }
}

function handleDeviceMotion(event: DeviceMotionEvent) {
  if (prefersReducedMotion.value) return
  let x = event.acceleration?.x
  let y = event.acceleration?.y

  if (x == null || y == null) {
    const includingGravityX = event.accelerationIncludingGravity?.x ?? 0
    const includingGravityY = event.accelerationIncludingGravity?.y ?? 0
    gravityEstimate.x += (includingGravityX - gravityEstimate.x) * 0.12
    gravityEstimate.y += (includingGravityY - gravityEstimate.y) * 0.12
    x = includingGravityX - gravityEstimate.x
    y = includingGravityY - gravityEstimate.y
  }

  const mapped = mapMotionToScreen(x, y)
  const nextX = clamp(mapped.x / 7.5)
  const nextY = clamp(-mapped.y / 7.5)
  impulseTarget.x = clamp(impulseTarget.x + nextX * 0.42)
  impulseTarget.y = clamp(impulseTarget.y + nextY * 0.42)
  motionEnergyTarget = Math.max(motionEnergyTarget, Math.min(1, Math.hypot(nextX, nextY) * 1.35))
  scheduleRender()
}

function attachSensors() {
  if (sensorsAttached) return
  orientationOrigin.set = false
  window.addEventListener('deviceorientation', handleOrientation, { passive: true })
  if ('DeviceMotionEvent' in window) window.addEventListener('devicemotion', handleDeviceMotion, { passive: true })
  sensorsAttached = true
  motionState.value = 'enabled'
  void requestWakeLock()
}

function detachSensors() {
  if (!sensorsAttached) return
  window.removeEventListener('deviceorientation', handleOrientation)
  window.removeEventListener('devicemotion', handleDeviceMotion)
  sensorsAttached = false
}

async function requestDeviceMotion() {
  if (!canUseOrientation()) return false
  motionState.value = 'requesting'
  const requesters = getMotionPermissionRequesters()

  try {
    if (requesters.length) {
      const permissions = await Promise.all(requesters.map(requestPermission => requestPermission()))
      if (permissions.some(permission => permission !== 'granted')) {
        motionState.value = 'denied'
        return false
      }
    }
    attachSensors()
    return true
  } catch {
    motionState.value = 'denied'
    return false
  }
}

async function requestWakeLock() {
  keepAwake = true
  if (document.hidden || wakeLock && !wakeLock.released) return
  const wakeLockApi = (navigator as WakeLockNavigator).wakeLock
  if (!wakeLockApi) return

  try {
    wakeLock = await wakeLockApi.request('screen')
  }
  catch {
    wakeLock = null
  }
}

async function releaseWakeLock() {
  const activeLock = wakeLock
  wakeLock = null
  if (!activeLock || activeLock.released) return
  try {
    await activeLock.release()
  }
  catch {
    // Losing a wake lock is harmless; the browser owns its lifecycle.
  }
}

function requestFullscreen() {
  const root = document.documentElement
  if (document.fullscreenElement || typeof root.requestFullscreen !== 'function') return

  try {
    void root.requestFullscreen({ navigationUI: 'hide' }).catch(() => {
      // Fullscreen is an enhancement; motion activation must still succeed when unavailable.
    })
  } catch {
    // Some mobile browsers expose the API but reject fullscreen for ordinary documents.
  }
}

async function enableDeviceMotion() {
  const motionRequest = requestDeviceMotion()
  requestFullscreen()
  const enabled = await motionRequest
  if (!enabled) {
    await nextTick()
    enableMotionButton.value?.focus({ preventScroll: true })
    return
  }

  storeMotionPreference('enabled')
  window.clearTimeout(gateDismissTimer)
  gateDismissTimer = window.setTimeout(() => {
    void dismissMotionGate()
  }, 360)
}

function applyFrame(now: number) {
  if (!card.value) return

  const elapsed = lastFrame ? now - lastFrame : 16.667
  const delta = Math.min(2, elapsed / 16.667)
  lastFrame = now

  if (elapsed > 25) {
    slowFrameCount += 1
    fastFrameCount = 0
  }
  else if (elapsed < 18) {
    fastFrameCount += 1
    slowFrameCount = Math.max(0, slowFrameCount - 1)
  }
  else {
    slowFrameCount = Math.max(0, slowFrameCount - 1)
    fastFrameCount = 0
  }
  if (slowFrameCount >= 8 && renderScale > 0.63) {
    renderScale = renderScale > 0.85 ? 0.78 : 0.62
    materialRenderer?.setRenderScale(renderScale)
    slowFrameCount = 0
  }
  else if (fastFrameCount >= 90 && renderScale < 1) {
    renderScale = renderScale < 0.7 ? 0.78 : 1
    materialRenderer?.setRenderScale(renderScale)
    fastFrameCount = 0
  }

  const spring = 0.085 * delta
  velocity.x = (velocity.x + (target.x - tilt.x) * spring) * Math.pow(0.77, delta)
  velocity.y = (velocity.y + (target.y - tilt.y) * spring) * Math.pow(0.77, delta)
  tilt.x += velocity.x * delta
  tilt.y += velocity.y * delta

  const foilFollow = 1 - Math.pow(0.92, delta)
  foil.x += (target.x - foil.x) * foilFollow
  foil.y += (target.y - foil.y) * foilFollow

  const impulseFollow = 1 - Math.pow(0.78, delta)
  materialImpulse.x += (impulseTarget.x - materialImpulse.x) * impulseFollow
  materialImpulse.y += (impulseTarget.y - materialImpulse.y) * impulseFollow
  impulseTarget.x *= Math.pow(0.8, delta)
  impulseTarget.y *= Math.pow(0.8, delta)
  motionEnergy += (motionEnergyTarget - motionEnergy) * impulseFollow
  motionEnergyTarget *= Math.pow(0.82, delta)

  const rotateX = isMobilePhysicalCard ? 0 : -tilt.y * 8
  const rotateY = isMobilePhysicalCard ? 0 : tilt.x * 10
  card.value.style.setProperty('--rotate-x', `${rotateX.toFixed(3)}deg`)
  card.value.style.setProperty('--rotate-y', `${rotateY.toFixed(3)}deg`)
  materialRenderer?.draw({
    lightX: foil.x * 0.72 + direct.x * 0.28,
    lightY: foil.y * 0.72 + direct.y * 0.28,
    impulseX: materialImpulse.x,
    impulseY: materialImpulse.y,
    energy: motionEnergy,
    time: now / 1000,
  })
}

function render(now: number) {
  frame = 0
  if (!visible || document.hidden || prefersReducedMotion.value) return
  applyFrame(now)
  const unsettled = Math.abs(target.x - tilt.x) > 0.001
    || Math.abs(target.y - tilt.y) > 0.001
    || Math.abs(target.x - foil.x) > 0.001
    || Math.abs(target.y - foil.y) > 0.001
    || Math.abs(velocity.x) > 0.0005
    || Math.abs(velocity.y) > 0.0005
    || Math.abs(impulseTarget.x) > 0.001
    || Math.abs(impulseTarget.y) > 0.001
    || Math.abs(materialImpulse.x) > 0.001
    || Math.abs(materialImpulse.y) > 0.001
    || motionEnergy > 0.001
    || motionEnergyTarget > 0.001
  if (unsettled) frame = requestAnimationFrame(render)
}

function scheduleRender() {
  if (frame || !visible || document.hidden || prefersReducedMotion.value) return
  frame = requestAnimationFrame(render)
}

function restart() {
  cancelAnimationFrame(frame)
  frame = 0
  lastFrame = 0
  if (!visible || document.hidden) return
  if (prefersReducedMotion.value) {
    target.x = 0
    target.y = 0
    tilt.x = 0
    tilt.y = 0
    foil.x = 0
    foil.y = 0
    direct.x = 0
    direct.y = 0
    applyFrame(performance.now())
    return
  }
  scheduleRender()
}

function handleVisibilityChange() {
  if (document.hidden) void releaseWakeLock()
  else if (keepAwake) void requestWakeLock()
  restart()
}

onMounted(async () => {
  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  prefersReducedMotion.value = motionQuery.matches
  isMobilePhysicalCard = navigator.maxTouchPoints > 0 && window.matchMedia('(pointer: coarse)').matches

  if (materialCanvas.value) {
    try {
      const rendererOverride = import.meta.dev && new URLSearchParams(window.location.search).get('renderer') === 'webgl2'
        ? 'webgl2'
        : 'auto'
      materialRenderer = await createHoloMaterialRenderer(materialCanvas.value, rendererOverride)
      stage.value?.setAttribute('data-renderer', materialRenderer.backend)
    }
    catch (error) {
      materialCanvas.value.hidden = true
      stage.value?.setAttribute('data-renderer', 'css')
      if (import.meta.dev && error instanceof Error) stage.value?.setAttribute('data-renderer-error', error.message)
    }
  }

  if (isInsecureMobilePreview()) {
    const storedPreference = getStoredMotionPreference()
    if (storedPreference === 'skipped') motionState.value = 'skipped'
    else {
      motionState.value = 'unavailable'
      void showMotionGate()
    }
  }
  else if (canUseOrientation()) {
    const requestPermission = getMotionPermissionRequesters().length > 0
    const storedPreference = getStoredMotionPreference()
    if (!requestPermission || storedPreference === 'enabled') attachSensors()
    else if (storedPreference === 'skipped') motionState.value = 'skipped'
    else void showMotionGate()
  }

  handleMotionPreferenceChange = (event) => {
    prefersReducedMotion.value = event.matches
    if (event.matches) {
      motionGateVisible.value = false
      detachSensors()
      motionState.value = 'idle'
    }
    else if (isInsecureMobilePreview()) {
      const storedPreference = getStoredMotionPreference()
      if (storedPreference === 'skipped') motionState.value = 'skipped'
      else {
        motionState.value = 'unavailable'
        void showMotionGate()
      }
    }
    else if (canUseOrientation()) {
      const requestPermission = getMotionPermissionRequesters().length > 0
      const storedPreference = getStoredMotionPreference()
      if (!requestPermission || storedPreference === 'enabled') attachSensors()
      else if (storedPreference === 'skipped') motionState.value = 'skipped'
      else void showMotionGate()
    }
    restart()
  }
  motionQuery.addEventListener('change', handleMotionPreferenceChange)

  intersectionObserver = new IntersectionObserver(([entry]) => {
    visible = entry?.isIntersecting ?? true
    restart()
  }, { threshold: 0.05 })
  if (stage.value) intersectionObserver.observe(stage.value)

  document.addEventListener('visibilitychange', handleVisibilityChange)
  restart()
})

onBeforeUnmount(() => {
  cancelAnimationFrame(frame)
  window.clearTimeout(gateDismissTimer)
  intersectionObserver?.disconnect()
  document.removeEventListener('visibilitychange', handleVisibilityChange)
  if (motionQuery && handleMotionPreferenceChange) {
    motionQuery.removeEventListener('change', handleMotionPreferenceChange)
  }
  detachSensors()
  keepAwake = false
  void releaseWakeLock()
  materialRenderer?.destroy()
  materialRenderer = null
})
</script>

<style scoped>
.holo-stage {
  position: relative;
  width: 100%;
  perspective: 1100px;
  -webkit-tap-highlight-color: transparent;
}

.holo-card {
  --rotate-x: 0deg;
  --rotate-y: 0deg;
  position: relative;
  width: 100%;
  aspect-ratio: 1.58;
  overflow: hidden;
  border: 1px solid rgb(255 255 255 / 0.74);
  border-radius: clamp(1.25rem, 2.2dvw, 2rem);
  background: #e9e5f3;
  box-shadow:
    0 18px 70px rgb(48 42 77 / 0.22),
    0 2px 4px rgb(50 45 75 / 0.12),
    inset 0 1px 0 rgb(255 255 255 / 0.85);
  transform: rotateX(var(--rotate-x)) rotateY(var(--rotate-y)) scale(1.005);
  will-change: transform;
}

.card-stock,
.holo-material {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.card-stock {
  background:
    radial-gradient(circle at 16% 8%, rgb(255 255 255 / 0.9), transparent 34%),
    radial-gradient(circle at 90% 95%, rgb(127 102 184 / 0.18), transparent 40%),
    linear-gradient(135deg, #f1edf7 0%, #e1ddec 52%, #ebe6f1 100%);
}

.card-stock::after {
  position: absolute;
  inset: 0;
  background-image: repeating-linear-gradient(115deg, rgb(81 69 117 / 0.024) 0 1px, transparent 1px 5px);
  content: '';
}

.holo-material {
  z-index: 2;
  display: block;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 240ms ease-out;
}

.holo-stage[data-renderer='webgpu'] .holo-material,
.holo-stage[data-renderer='webgl2'] .holo-material {
  opacity: 1;
}

@supports (color: color(display-p3 1 1 1)) {
  .card-stock {
    background:
      radial-gradient(circle at 16% 8%, color(display-p3 1 1 1 / 0.9), transparent 34%),
      radial-gradient(circle at 90% 95%, color(display-p3 0.5 0.4 0.76 / 0.18), transparent 40%),
      linear-gradient(135deg, color(display-p3 0.96 0.94 0.99), color(display-p3 0.87 0.85 0.93) 52%, color(display-p3 0.94 0.91 0.97));
  }
}

.printed-face {
  position: absolute;
  inset: 0;
  z-index: 10;
}

.motion-permission-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  min-height: 100dvh;
  place-items: center;
  padding: max(1.5rem, env(safe-area-inset-top)) max(1.5rem, env(safe-area-inset-right)) max(1.5rem, env(safe-area-inset-bottom)) max(1.5rem, env(safe-area-inset-left));
  overflow: hidden;
  background: rgb(0 0 0 / 0.76);
  -webkit-backdrop-filter: blur(18px) saturate(0.72);
  backdrop-filter: blur(18px) saturate(0.72);
  color: #f7f4fb;
  font-family: 'Archivo', ui-sans-serif, system-ui, sans-serif;
  text-align: center;
}

.motion-permission-overlay::before {
  position: absolute;
  width: min(42rem, 130dvw);
  aspect-ratio: 1;
  border-radius: 50%;
  background:
    radial-gradient(circle, rgb(255 255 255 / 0.09) 0 1px, transparent 1.5px 100%),
    conic-gradient(
      from 210deg,
      rgb(255 71 194 / 0.12),
      rgb(255 211 91 / 0.08),
      rgb(71 240 218 / 0.1),
      rgb(95 125 255 / 0.16),
      rgb(215 89 255 / 0.11),
      rgb(255 71 194 / 0.12)
    );
  filter: blur(44px);
  content: '';
  opacity: 0.78;
  pointer-events: none;
  transform: translateY(-8%);
}

.motion-permission-content {
  position: relative;
  width: min(27rem, 100%);
}

.motion-permission-content h2 {
  max-width: 10ch;
  margin: 0 auto;
  font-size: clamp(2.4rem, 10dvw, 4rem);
  font-weight: 560;
  letter-spacing: -0.04em;
  line-height: 0.94;
  text-wrap: balance;
}

.motion-permission-description {
  max-width: 34ch;
  margin: 1.25rem auto 0;
  color: rgb(247 244 251 / 0.72);
  font-size: 0.98rem;
  line-height: 1.55;
  text-wrap: pretty;
}

.motion-permission-actions {
  display: grid;
  gap: 0.45rem;
  margin-top: 2rem;
}

.motion-permission-primary,
.motion-permission-secondary {
  width: 100%;
  min-height: 3.25rem;
  border-radius: 0.625rem;
  font: inherit;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.motion-permission-primary {
  border: 0;
  background: #f7f4fb;
  color: #17141e;
  font-weight: 700;
  box-shadow: 0 0.8rem 2.6rem rgb(0 0 0 / 0.34);
  transition: background-color 160ms ease, transform 160ms ease;
}

.motion-permission-primary:hover:not(:disabled) {
  background: #fff;
}

.motion-permission-primary:active:not(:disabled) {
  transform: scale(0.98);
}

.motion-permission-primary:disabled {
  cursor: wait;
  opacity: 0.68;
}

.motion-permission-secondary {
  border: 0;
  background: transparent;
  color: rgb(247 244 251 / 0.72);
  font-size: 0.9rem;
  font-weight: 560;
  transition: color 160ms ease;
}

.motion-permission-secondary:hover {
  color: #fff;
}

.motion-permission-secondary:disabled {
  cursor: default;
  opacity: 0.45;
}

.motion-permission-primary:focus-visible,
.motion-permission-secondary:focus-visible {
  outline: 2px solid #9b86ff;
  outline-offset: 3px;
}

.motion-permission-privacy {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  margin: 1.4rem 0 0;
  color: rgb(247 244 251 / 0.5);
  font-size: 0.72rem;
  line-height: 1.4;
}

.motion-permission-privacy svg {
  width: 0.88rem;
  height: 0.88rem;
  flex: 0 0 auto;
  stroke-width: 1.8;
}

.motion-gate-enter-active,
.motion-gate-leave-active {
  transition: opacity 420ms cubic-bezier(0.22, 1, 0.36, 1), backdrop-filter 420ms cubic-bezier(0.22, 1, 0.36, 1);
}

.motion-gate-enter-active .motion-permission-content,
.motion-gate-leave-active .motion-permission-content {
  transition: filter 420ms cubic-bezier(0.22, 1, 0.36, 1), transform 420ms cubic-bezier(0.22, 1, 0.36, 1);
}

.motion-gate-enter-from,
.motion-gate-leave-to {
  opacity: 0;
  -webkit-backdrop-filter: blur(0) saturate(1);
  backdrop-filter: blur(0) saturate(1);
}

.motion-gate-enter-from .motion-permission-content {
  filter: blur(8px);
  transform: translateY(0.8rem) scale(0.985);
}

.motion-gate-leave-to .motion-permission-content {
  filter: blur(6px);
  transform: scale(1.035);
}

@media (max-width: 42rem) {
  .holo-card {
    aspect-ratio: 0.68;
    border-radius: 1.5rem;
  }
}

@media (max-width: 32rem) {
  .holo-card {
    aspect-ratio: 0.56;
  }

  .motion-permission-overlay {
    padding-inline: max(1.25rem, env(safe-area-inset-left));
  }
}

@media (prefers-reduced-motion: reduce) {
  .holo-card {
    box-shadow: 0 1.5rem 4rem rgb(48 42 77 / 0.18), inset 0 1px 0 rgb(255 255 255 / 0.85);
    transform: none;
    transition: none;
  }

  .motion-gate-enter-active,
  .motion-gate-leave-active,
  .motion-gate-enter-active .motion-permission-content,
  .motion-gate-leave-active .motion-permission-content,
  .motion-permission-primary,
  .motion-permission-secondary {
    transition: none;
  }
}
</style>
