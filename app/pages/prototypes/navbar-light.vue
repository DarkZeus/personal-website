<template>
  <div class="prototype-page">
    <component :is="currentComponent" :key="`${currentIndex}-${replayKey}`" />

    <main class="prototype-context">
      <div class="context-circle" aria-hidden="true"></div>
      <section class="context-hero">
        <h1>Serhii <span>Resnianskyi</span></h1>
        <div class="context-copy">
          <p class="context-kicker">Software Engineer</p>
          <h2>I build fast, scalable web products</h2>
          <p>Engineering dependable interfaces and systems with an emphasis on performance, clarity, and maintainable architecture.</p>
        </div>
      </section>

      <section class="context-grid" aria-label="Page context">
        <div><span>Focus</span><strong>Frontend systems</strong></div>
        <div><span>Approach</span><strong>Quietly precise</strong></div>
        <div><span>Based in</span><strong>Chernihiv, Ukraine</strong></div>
      </section>

      <section class="context-scroll">
        <p>Scroll to preview the island’s compact state</p>
      </section>
    </main>

    <nav ref="pickerEl" class="proto-picker" aria-label="Prototype variants">
      <span ref="highlightEl" class="proto-picker-highlight" aria-hidden="true"></span>
      <button
        v-for="(variant, index) in variants"
        :key="variant.name"
        :ref="(element) => setPickerItemRef(element, index)"
        class="proto-picker-item"
        :data-active="currentIndex === index ? '' : undefined"
        :aria-current="currentIndex === index ? 'true' : undefined"
        @click="setActive(index)"
      >
        {{ variant.name }}
      </button>
      <span class="proto-picker-divider" aria-hidden="true"></span>
      <button class="proto-picker-item proto-picker-replay" aria-label="Replay animation (R)" @click="replay">↻</button>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { computed, markRaw, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import GlassRefractionNavbar from '~/components/prototypes/navbar-light/GlassRefractionNavbar.vue'
import MagneticTypeNavbar from '~/components/prototypes/navbar-light/MagneticTypeNavbar.vue'
import WeightTransferNavbar from '~/components/prototypes/navbar-light/WeightTransferNavbar.vue'

definePageMeta({ layout: false })

const variants = [
  { name: 'Magnetic Type', component: markRaw(MagneticTypeNavbar) },
  { name: 'Weight Transfer', component: markRaw(WeightTransferNavbar) },
  { name: 'Glass Refraction', component: markRaw(GlassRefractionNavbar) },
] as const

const route = useRoute()
const requestedVariant = Number.parseInt(String(route.query.v ?? '1'), 10) - 1
const currentIndex = ref(Number.isInteger(requestedVariant) && requestedVariant >= 0 && requestedVariant < variants.length ? requestedVariant : 0)
const replayKey = ref(0)
const pickerEl = ref<HTMLElement | null>(null)
const highlightEl = ref<HTMLElement | null>(null)
const pickerItemRefs = ref<HTMLElement[]>([])
const currentComponent = computed(() => variants[currentIndex.value].component)

function setPickerItemRef(element: unknown, index: number) {
  if (element instanceof HTMLElement) pickerItemRefs.value[index] = element
}

function moveHighlight() {
  const item = pickerItemRefs.value[currentIndex.value]
  const highlight = highlightEl.value
  if (!item || !highlight) return
  highlight.style.width = `${item.offsetWidth}px`
  highlight.style.transform = `translateX(${item.offsetLeft}px)`
}

function setActive(index: number) {
  if (index < 0 || index >= variants.length) return
  currentIndex.value = index
  replayKey.value += 1
  const url = new URL(window.location.href)
  url.searchParams.set('v', String(index + 1))
  window.history.replaceState(null, '', url)
  nextTick(moveHighlight)
}

function replay() {
  replayKey.value += 1
}

function handleKeydown(event: KeyboardEvent) {
  const target = event.target as HTMLElement
  if (/^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName) || target.isContentEditable) return
  if (event.metaKey || event.ctrlKey || event.altKey) return

  const number = Number.parseInt(event.key, 10)
  if (number >= 1 && number <= variants.length) setActive(number - 1)
  else if (event.key === 'ArrowRight') setActive((currentIndex.value + 1) % variants.length)
  else if (event.key === 'ArrowLeft') setActive((currentIndex.value - 1 + variants.length) % variants.length)
  else if (event.key === 'r' || event.key === 'R') replay()
}

onMounted(() => {
  nextTick(() => {
    moveHighlight()
    requestAnimationFrame(() => requestAnimationFrame(() => pickerEl.value?.setAttribute('data-ready', '')))
  })
  window.addEventListener('resize', moveHighlight)
  document.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', moveHighlight)
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.prototype-page {
  min-height: 150vh;
  overflow: clip;
  background: var(--color-soft-titanium);
  color: var(--color-text);
  font-family: var(--font-sans);
}

.prototype-context {
  position: relative;
  width: min(calc(100% - 4rem), var(--studio-content-max));
  margin-inline: auto;
  padding-top: 8.5rem;
}

.context-circle {
  position: absolute;
  top: 3rem;
  right: -19rem;
  width: 36rem;
  height: 36rem;
  border-radius: 50%;
  background: rgb(21 94 204 / 5.5%);
}

.context-hero {
  position: relative;
  display: grid;
  min-height: 35rem;
  grid-template-columns: 1.24fr 0.76fr;
  align-items: center;
  gap: 5rem;
}

.context-hero h1 {
  margin: 0;
  font-size: clamp(4.25rem, 7.4vw, 6.5rem);
  font-weight: 500;
  line-height: 0.92;
  letter-spacing: -0.045em;
}

.context-hero h1 span { display: block; color: var(--color-primary); }
.context-copy { position: relative; }
.context-kicker { margin: 0 0 1rem; color: var(--color-primary) !important; font-size: 0.7rem !important; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; }
.context-copy h2 { max-width: 18ch; margin: 0; font-size: clamp(1.8rem, 2.3vw, 2.25rem); font-weight: 500; line-height: 1.08; letter-spacing: -0.035em; }
.context-copy p { max-width: 35rem; margin: 1.6rem 0 0; color: var(--color-text-light); font-size: 1.04rem; line-height: 1.72; }

.context-grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-block: 1px solid rgb(23 34 52 / 13%);
}

.context-grid div { display: grid; gap: 0.7rem; padding: 2rem; border-left: 1px solid rgb(23 34 52 / 13%); }
.context-grid div:first-child { border-left: 0; }
.context-grid span { color: var(--color-text-light); font-size: 0.68rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; }
.context-grid strong { font-size: 1.2rem; letter-spacing: -0.02em; }
.context-scroll { display: grid; min-height: 34rem; place-items: center; }
.context-scroll p { color: var(--color-text-light); font-size: 0.78rem; letter-spacing: 0.09em; text-transform: uppercase; }

.proto-picker {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2147483647;
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 4px;
  border-radius: 999px;
  background: rgba(10, 10, 10, 0.82);
  -webkit-backdrop-filter: blur(12px) saturate(1.4);
  backdrop-filter: blur(12px) saturate(1.4);
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.08) inset,
    0 8px 24px rgba(0, 0, 0, 0.24),
    0 2px 6px rgba(0, 0, 0, 0.12);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: 13px;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  user-select: none;
  -webkit-user-select: none;
}

.proto-picker-highlight {
  position: absolute;
  top: 4px;
  left: 0;
  height: 28px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  will-change: transform;
}

.proto-picker[data-ready] .proto-picker-highlight {
  transition:
    transform 250ms cubic-bezier(0.23, 1, 0.32, 1),
    width 250ms cubic-bezier(0.23, 1, 0.32, 1);
}

@media (prefers-reduced-motion: reduce) {
  .proto-picker[data-ready] .proto-picker-highlight { transition: none; }
}

.proto-picker-item {
  position: relative;
  display: flex;
  align-items: center;
  height: 28px;
  padding: 0 12px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: rgba(255, 255, 255, 0.55);
  font: inherit;
  cursor: pointer;
  transition: color 150ms ease-out;
}

.proto-picker-item:hover { color: rgba(255, 255, 255, 0.85); }
.proto-picker-item:active { transform: scale(0.97); }
.proto-picker-item:focus-visible { outline: 2px solid rgba(255, 255, 255, 0.4); outline-offset: 2px; }
.proto-picker-item[data-active] { color: #fff; }
.proto-picker-divider { width: 1px; height: 16px; margin: 0 4px; background: rgba(255, 255, 255, 0.12); }
.proto-picker-replay { padding: 0 10px; font-size: 14px; }
.proto-picker[data-position="top"] { bottom: auto; top: 24px; }

@media (prefers-color-scheme: dark) {
  .prototype-page { background: var(--color-void-black); color: var(--color-text-dark); }
  .context-circle { background: rgb(115 167 245 / 7%); }
  .context-hero h1 span, .context-kicker { color: var(--color-primary-light) !important; }
  .context-copy p, .context-grid span, .context-scroll p { color: var(--color-text-light-dark); }
  .context-grid, .context-grid div { border-color: rgb(174 185 202 / 16%); }
}

@media (max-width: 48rem) {
  .prototype-context { width: min(calc(100% - 2.25rem), 45rem); padding-top: 7rem; }
  .context-hero { min-height: 39rem; grid-template-columns: 1fr; gap: 2rem; }
  .context-grid { grid-template-columns: 1fr; }
  .context-grid div { border-top: 1px solid rgb(23 34 52 / 13%); border-left: 0; }
  .context-grid div:first-child { border-top: 0; }
}
</style>
