<template>
  <motion.nav
    aria-label="Glass refraction navigation prototype"
    class="prototype-nav"
    :class="{ 'is-scrolled': isScrolled, 'no-motion': keyboardMode }"
    :style="{
      width: navWidth,
      x: '-50%',
      y: navOffset,
      borderRadius: navRadius,
      backdropFilter: navBlur,
    }"
  >
    <div
      ref="surfaceEl"
      class="nav-surface"
      @pointerenter="handlePointerMove"
      @pointermove="handlePointerMove"
      @pointerleave="lensVisible = false"
    >
      <span ref="lensEl" class="glass-lens" :class="{ 'is-visible': lensVisible }" aria-hidden="true"></span>
      <button class="brand" type="button" @click="selectItem(0)">Serhii Resnianskyi</button>

      <div class="menu">
        <button
          v-for="(item, index) in menuItems"
          :key="item"
          type="button"
          class="nav-item"
          :class="{ 'is-active': activeIndex === index }"
          :aria-current="activeIndex === index ? 'page' : undefined"
          @keydown="keyboardMode = true"
          @keyup="keyboardMode = false"
          @click="selectItem(index)"
        >
          <span class="label-base">{{ item }}</span>
          <span class="label-refracted" aria-hidden="true">{{ item }}</span>
        </button>
      </div>
    </div>
  </motion.nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { motion, useMotionValueEvent, useScroll, useTransform } from 'motion-v'

const menuItems = ['Home', 'About', 'Projects', 'Blog', 'Gear', 'Contact'] as const
const activeIndex = ref(0)
const keyboardMode = ref(false)
const lensVisible = ref(false)
const surfaceEl = ref<HTMLElement | null>(null)
const lensEl = ref<HTMLElement | null>(null)

const { scrollY } = useScroll()
const isScrolled = ref(false)
useMotionValueEvent(scrollY, 'change', (latest) => { isScrolled.value = latest > 10 })

const navWidth = useTransform(scrollY, [0, 100], ['100%', '85%'], { clamp: true })
const navOffset = useTransform(scrollY, [0, 100], [0, 20], { clamp: true })
const navRadius = useTransform(scrollY, [0, 100], ['0rem', '0.75rem'], { clamp: true })
const navBlur = useTransform(scrollY, [0, 100], ['blur(0px)', 'blur(12px)'], { clamp: true })

function selectItem(index: number) {
  activeIndex.value = index
}

function handlePointerMove(event: PointerEvent) {
  if (event.pointerType !== 'mouse' || !surfaceEl.value || !lensEl.value) return
  const rect = surfaceEl.value.getBoundingClientRect()
  const x = event.clientX - rect.left - 80
  const y = event.clientY - rect.top - 32
  lensEl.value.style.transform = `translate3d(${x}px, ${y}px, 0)`
  lensVisible.value = true
}
</script>

<style scoped>
.prototype-nav {
  position: fixed;
  top: 0;
  left: 50%;
  z-index: 50;
  color: var(--color-text);
  transition: box-shadow 180ms var(--ease-out);
}

.prototype-nav.is-scrolled {
  box-shadow: 0 18px 54px rgb(35 58 91 / 12%), inset 0 0 0 1px rgb(23 34 52 / 10%);
}

.nav-surface {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  padding: 0.8rem clamp(1.5rem, 3vw, 3rem);
  border-radius: inherit;
  background: rgb(244 247 251 / 58%);
  backdrop-filter: blur(10px) saturate(1.15);
}

.glass-lens {
  position: absolute;
  top: 0;
  left: 0;
  width: 10rem;
  height: 4rem;
  border-radius: 50%;
  background:
    radial-gradient(ellipse at center, rgb(255 255 255 / 50%) 0, rgb(119 171 244 / 13%) 38%, transparent 72%);
  filter: blur(8px);
  opacity: 0;
  pointer-events: none;
  will-change: transform, opacity;
  transition: transform 190ms var(--ease-out), opacity 130ms ease;
}

.glass-lens.is-visible { opacity: 0.46; }

.brand,
.nav-item {
  position: relative;
  z-index: 1;
  border: 0;
  background: transparent;
  font: inherit;
  cursor: pointer;
}

.brand {
  color: var(--color-primary);
  font-size: 1.0625rem;
  font-weight: 650;
  letter-spacing: -0.03em;
}

.menu {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-item {
  padding: 0.55rem 1rem;
  color: var(--color-text-light);
  font-size: 0.75rem;
  font-weight: 650;
  letter-spacing: -0.018em;
  text-transform: uppercase;
  transition: transform 120ms var(--ease-out), color 140ms ease;
}

.label-base,
.label-refracted {
  display: block;
  white-space: nowrap;
}

.label-refracted {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
  clip-path: inset(41% 0 36% 0);
  opacity: 0;
  transform: translate3d(-1px, 0, 0);
  transition: transform 160ms var(--ease-out), opacity 120ms ease;
}

.nav-item:hover,
.nav-item:focus-visible {
  color: var(--color-text);
}

.nav-item:hover .label-refracted,
.nav-item:focus-visible .label-refracted {
  opacity: 0.34;
  transform: translate3d(1px, 0, 0);
}

.nav-item.is-active {
  color: var(--color-primary);
  font-weight: 700;
  letter-spacing: -0.032em;
}

.nav-item.is-active .label-refracted { opacity: 0.14; }
.nav-item:active { transform: scale(0.97); }
.nav-item:focus-visible { outline: 2px solid rgb(21 94 204 / 28%); outline-offset: 3px; }

.no-motion .nav-item,
.no-motion .label-refracted { transition: none; }

@media (hover: none), (pointer: coarse) {
  .glass-lens, .label-refracted { display: none; }
}

@media (prefers-color-scheme: dark) {
  .prototype-nav { color: var(--color-text-dark); }
  .nav-surface { background: rgb(16 23 34 / 62%); }
  .glass-lens { background: radial-gradient(ellipse at center, rgb(166 203 255 / 20%) 0, rgb(64 122 209 / 11%) 42%, transparent 72%); }
  .brand, .nav-item.is-active, .label-refracted { color: var(--color-primary-light); }
  .nav-item { color: var(--color-text-light-dark); }
  .nav-item:hover, .nav-item:focus-visible { color: var(--color-text-dark); }
}

@media (prefers-reduced-motion: reduce) {
  .glass-lens { display: none; }
  .nav-item, .label-refracted { transition: color 100ms ease, opacity 100ms ease; transform: none; }
}

@media (max-width: 48rem) {
  .nav-surface { padding-inline: 1.1rem; }
  .brand { display: none; }
  .menu { width: 100%; justify-content: space-between; gap: 0; }
  .nav-item { padding-inline: 0.45rem; font-size: 0.65rem; }
}
</style>
