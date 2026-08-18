<template>
  <div
    ref="stage"
    class="holo-stage"
    :inert="motionGateVisible"
    tabindex="-1"
    @pointerenter="handlePointerEnter"
    @pointermove="handlePointerMove"
    @pointerleave="handlePointerLeave"
    @click="handleCardActivation"
  >
    <div ref="card" class="holo-card">
      <div class="card-stock" aria-hidden="true"></div>
      <div class="foil foil-rings" aria-hidden="true"></div>
      <div class="foil foil-spectrum" aria-hidden="true"></div>
      <div class="foil foil-diffraction" aria-hidden="true"></div>
      <div class="foil foil-sweet-spot" aria-hidden="true"></div>
      <div class="glare" aria-hidden="true"></div>
      <div class="edge edge-top" aria-hidden="true"></div>
      <div class="edge edge-right" aria-hidden="true"></div>
      <div class="edge edge-bottom" aria-hidden="true"></div>
      <div class="edge edge-left" aria-hidden="true"></div>

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
            {{ motionState === 'denied' ? 'Motion access is off' : 'Unlock physical mode' }}
          </h2>
          <p id="motion-permission-description" class="motion-permission-description">
            {{ motionState === 'denied'
              ? 'Motion wasn’t allowed. Retry the request, or continue with touch.'
              : 'Move your phone to bend light across the card. Motion access only drives the effect.' }}
          </p>

          <div class="motion-permission-actions">
            <button
              ref="enableMotionButton"
              class="motion-permission-primary"
              type="button"
              :disabled="motionState === 'requesting' || motionState === 'enabled'"
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

type MotionState = 'idle' | 'requesting' | 'enabled' | 'denied' | 'skipped'
type MotionPermissionApi = {
  requestPermission?: () => Promise<'granted' | 'denied'>
}

const MOTION_PREFERENCE_KEY = 'business-card-motion'

const stage = ref<HTMLElement | null>(null)
const card = ref<HTMLElement | null>(null)
const enableMotionButton = ref<HTMLButtonElement | null>(null)
const skipMotionButton = ref<HTMLButtonElement | null>(null)
const motionState = ref<MotionState>('idle')
const motionGateVisible = ref(false)
const prefersReducedMotion = ref(false)

const motionPermissionAction = computed(() => {
  if (motionState.value === 'requesting') return 'Waiting for permission…'
  if (motionState.value === 'enabled') return 'Motion connected'
  if (motionState.value === 'denied') return 'Try again'
  return 'Enable motion'
})

const target = { x: 0, y: 0 }
const tilt = { x: 0, y: 0 }
const velocity = { x: 0, y: 0 }
const foil = { x: 0, y: 0 }
const direct = { x: 0, y: 0 }
const orientationOrigin = { beta: 0, gamma: 0, set: false }

let frame = 0
let lastFrame = 0
let orientationAttached = false
let visible = true
let motionQuery: MediaQueryList | null = null
let intersectionObserver: IntersectionObserver | null = null
let handleMotionPreferenceChange: ((event: MediaQueryListEvent) => void) | null = null
let gateDismissTimer = 0

function clamp(value: number, min = -1, max = 1) {
  return Math.min(max, Math.max(min, value))
}

function canUseOrientation() {
  const hasTouchInput = navigator.maxTouchPoints > 0 || 'ontouchstart' in window
  return !prefersReducedMotion.value
    && 'DeviceOrientationEvent' in window
    && hasTouchInput
}

function getMotionPermissionRequester() {
  const orientationApi = DeviceOrientationEvent as typeof DeviceOrientationEvent & MotionPermissionApi
  if (typeof orientationApi.requestPermission === 'function') {
    return orientationApi.requestPermission.bind(orientationApi)
  }

  if ('DeviceMotionEvent' in window) {
    const motionApi = DeviceMotionEvent as typeof DeviceMotionEvent & MotionPermissionApi
    if (typeof motionApi.requestPermission === 'function') {
      return motionApi.requestPermission.bind(motionApi)
    }
  }

  return null
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
  if (prefersReducedMotion.value || motionState.value === 'enabled') return
  handlePointerMove(event)
}

function handlePointerMove(event: PointerEvent) {
  if (!stage.value || prefersReducedMotion.value || motionState.value === 'enabled') return
  const rect = stage.value.getBoundingClientRect()
  const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
  const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2
  setInput(x, y)
}

function handlePointerLeave() {
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
  if (motionState.value !== 'idle' || !canUseOrientation()) return
  void requestDeviceMotion()
}

function continueWithoutMotion() {
  motionState.value = 'skipped'
  storeMotionPreference('skipped')
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

  if (angle === 90) setInput(deltaBeta, -deltaGamma)
  else if (angle === 270) setInput(-deltaBeta, deltaGamma)
  else setInput(deltaGamma, deltaBeta)
}

function attachOrientation() {
  if (orientationAttached) return
  orientationOrigin.set = false
  window.addEventListener('deviceorientation', handleOrientation, { passive: true })
  orientationAttached = true
  motionState.value = 'enabled'
}

async function requestDeviceMotion() {
  if (!canUseOrientation()) return false
  motionState.value = 'requesting'
  const requestPermission = getMotionPermissionRequester()

  try {
    if (requestPermission) {
      const permission = await requestPermission()
      if (permission !== 'granted') {
        motionState.value = 'denied'
        return false
      }
    }
    attachOrientation()
    return true
  } catch {
    motionState.value = 'denied'
    return false
  }
}

async function enableDeviceMotion() {
  const enabled = await requestDeviceMotion()
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

  const delta = lastFrame ? Math.min(2, (now - lastFrame) / 16.667) : 1
  lastFrame = now

  const spring = 0.085 * delta
  velocity.x = (velocity.x + (target.x - tilt.x) * spring) * Math.pow(0.77, delta)
  velocity.y = (velocity.y + (target.y - tilt.y) * spring) * Math.pow(0.77, delta)
  tilt.x += velocity.x * delta
  tilt.y += velocity.y * delta

  const foilFollow = 1 - Math.pow(0.92, delta)
  foil.x += (target.x - foil.x) * foilFollow
  foil.y += (target.y - foil.y) * foilFollow

  const magnitude = Math.min(1, Math.hypot(tilt.x, tilt.y))
  card.value.style.cssText = [
    `--rotate-x:${(-tilt.y * 8).toFixed(3)}deg`,
    `--rotate-y:${(tilt.x * 10).toFixed(3)}deg`,
    `--foil-x:${(50 + foil.x * 31).toFixed(2)}%`,
    `--foil-y:${(50 + foil.y * 36).toFixed(2)}%`,
    `--glare-x:${(50 + direct.x * 46).toFixed(2)}%`,
    `--glare-y:${(50 + direct.y * 46).toFixed(2)}%`,
    `--reveal:${(0.32 + magnitude * 0.6).toFixed(3)}`,
    `--edge-top:${Math.max(0, -tilt.y).toFixed(3)}`,
    `--edge-right:${Math.max(0, tilt.x).toFixed(3)}`,
    `--edge-bottom:${Math.max(0, tilt.y).toFixed(3)}`,
    `--edge-left:${Math.max(0, -tilt.x).toFixed(3)}`,
  ].join(';')
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
  restart()
}

onMounted(() => {
  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  prefersReducedMotion.value = motionQuery.matches
  if (canUseOrientation()) {
    const requestPermission = getMotionPermissionRequester()
    const storedPreference = getStoredMotionPreference()
    if (!requestPermission || storedPreference === 'enabled') attachOrientation()
    else if (storedPreference === 'skipped') motionState.value = 'skipped'
    else void showMotionGate()
  }

  handleMotionPreferenceChange = (event) => {
    prefersReducedMotion.value = event.matches
    if (event.matches) {
      motionGateVisible.value = false
      if (orientationAttached) {
        window.removeEventListener('deviceorientation', handleOrientation)
        orientationAttached = false
      }
      motionState.value = 'idle'
    }
    else if (canUseOrientation()) {
      const requestPermission = getMotionPermissionRequester()
      const storedPreference = getStoredMotionPreference()
      if (!requestPermission || storedPreference === 'enabled') attachOrientation()
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
  if (orientationAttached) window.removeEventListener('deviceorientation', handleOrientation)
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
  --foil-x: 50%;
  --foil-y: 50%;
  --glare-x: 50%;
  --glare-y: 50%;
  --reveal: 0.32;
  --edge-top: 0;
  --edge-right: 0;
  --edge-bottom: 0;
  --edge-left: 0;
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
.foil,
.glare,
.edge {
  position: absolute;
  pointer-events: none;
}

.card-stock {
  inset: 0;
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

.foil {
  inset: -12%;
  opacity: var(--reveal);
}

.foil-rings {
  inset: -34% -18%;
  background:
    repeating-radial-gradient(
      ellipse at 73% 43%,
      transparent 0 8%,
      rgb(255 117 218 / 0.2) 8.4% 8.8%,
      rgb(73 224 255 / 0.36) 9.1% 9.6%,
      transparent 10% 14%
    ),
    radial-gradient(ellipse at var(--foil-x) var(--foil-y), rgb(255 255 255 / 0.55), transparent 34%);
  mix-blend-mode: soft-light;
}

.foil-spectrum {
  background:
    conic-gradient(
      from 210deg at var(--foil-x) var(--foil-y),
      rgb(255 88 193 / 0.76),
      rgb(255 211 91 / 0.72),
      rgb(75 244 211 / 0.7),
      rgb(85 137 255 / 0.78),
      rgb(204 91 255 / 0.72),
      rgb(255 88 193 / 0.76)
    ),
    linear-gradient(
      112deg,
      transparent 15%,
      rgb(255 66 168 / 0.8) 30%,
      rgb(255 217 93 / 0.82) 40%,
      rgb(99 255 223 / 0.76) 51%,
      rgb(86 143 255 / 0.84) 62%,
      rgb(205 93 255 / 0.72) 73%,
      transparent 87%
    );
  background-position: var(--foil-x) var(--foil-y);
  background-size: 170% 170%;
  filter: saturate(1.28) contrast(1.08);
  mix-blend-mode: multiply;
  opacity: calc(var(--reveal) * 0.54);
  -webkit-mask-image:
    radial-gradient(ellipse at 74% 44%, #000 0 10%, transparent 38%),
    repeating-linear-gradient(118deg, #000 0 8%, transparent 8.5% 15%);
  mask-image:
    radial-gradient(ellipse at 74% 44%, #000 0 10%, transparent 38%),
    repeating-linear-gradient(118deg, #000 0 8%, transparent 8.5% 15%);
  -webkit-mask-composite: source-over;
  mask-composite: add;
}

.foil-diffraction {
  background:
    repeating-linear-gradient(
      122deg,
      transparent 0 7px,
      rgb(255 255 255 / 0.2) 8px,
      rgb(93 217 255 / 0.15) 9px,
      transparent 10px 16px
    );
  mix-blend-mode: overlay;
  opacity: calc(var(--reveal) * 0.65);
  background-position: var(--foil-x) var(--foil-y);
}

.foil-sweet-spot {
  inset: -30%;
  background: radial-gradient(
    circle at calc(var(--foil-x) - 8%) calc(var(--foil-y) + 4%),
    rgb(255 255 255 / 0.82) 0,
    rgb(128 242 255 / 0.32) 7%,
    rgb(255 111 220 / 0.18) 14%,
    transparent 28%
  );
  filter: blur(5px);
  mix-blend-mode: color-dodge;
  opacity: calc(var(--reveal) * 0.8);
}

.glare {
  inset: 0;
  z-index: 3;
  background: radial-gradient(
    circle at var(--glare-x) var(--glare-y),
    rgb(255 255 255 / 0.28) 0,
    rgb(255 255 255 / 0.07) 22%,
    transparent 58%
  );
  mix-blend-mode: soft-light;
}

.edge {
  z-index: 5;
  background: rgb(255 255 255 / 0.9);
  filter: blur(0.5px);
}

.edge-top,
.edge-bottom {
  right: 5%;
  left: 5%;
  height: 1px;
}

.edge-left,
.edge-right {
  top: 7%;
  bottom: 7%;
  width: 1px;
}

.edge-top { top: 0; opacity: var(--edge-top); }
.edge-right { right: 0; opacity: var(--edge-right); }
.edge-bottom { bottom: 0; opacity: var(--edge-bottom); }
.edge-left { left: 0; opacity: var(--edge-left); }

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
