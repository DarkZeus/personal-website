<template>
  <motion.nav
    aria-label="Magnetic type navigation prototype"
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
    <div class="nav-surface">
      <button class="brand" type="button" @click="selectItem(0)">Serhii Resnianskyi</button>

      <div class="menu" @mouseleave="hoveredIndex = null">
        <button
          v-for="(item, index) in menuItems"
          :key="item"
          type="button"
          class="nav-item"
          :class="{ 'is-active': activeIndex === index }"
          :style="itemStyle(index)"
          :aria-current="activeIndex === index ? 'page' : undefined"
          @mouseenter="hoveredIndex = index"
          @focus="hoveredIndex = index"
          @blur="hoveredIndex = null"
          @keydown="keyboardMode = true"
          @keyup="keyboardMode = false"
          @click="selectItem(index)"
        >
          {{ item }}
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
const hoveredIndex = ref<number | null>(null)
const keyboardMode = ref(false)

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

function itemStyle(index: number) {
  if (hoveredIndex.value === null) return { transform: 'translate3d(0, 0, 0) scale(1)' }

  const distance = index - hoveredIndex.value
  if (distance === 0) return { transform: 'translate3d(0, -1px, 0) scale(1.045)' }
  if (Math.abs(distance) === 1) {
    const x = distance < 0 ? -4 : 4
    return { transform: `translate3d(${x}px, 0, 0) scale(0.995)` }
  }
  if (Math.abs(distance) === 2) {
    const x = distance < 0 ? -1.5 : 1.5
    return { transform: `translate3d(${x}px, 0, 0) scale(1)` }
  }
  return { transform: 'translate3d(0, 0, 0) scale(1)' }
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem clamp(1.5rem, 3vw, 3rem);
  border-radius: inherit;
  background: rgb(244 247 251 / 58%);
  backdrop-filter: blur(10px) saturate(1.15);
}

.brand,
.nav-item {
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
  transform-origin: center;
  transition:
    transform 180ms var(--ease-out),
    color 140ms ease,
    opacity 140ms ease;
}

.nav-item:hover,
.nav-item:focus-visible {
  color: var(--color-text);
}

.nav-item.is-active {
  color: var(--color-primary);
  font-weight: 700;
  letter-spacing: -0.032em;
}

.nav-item:active { transform: scale(0.97) !important; }
.nav-item:focus-visible { outline: 2px solid rgb(21 94 204 / 28%); outline-offset: 3px; }
.no-motion .nav-item { transition: none; }

@media (hover: none), (pointer: coarse) {
  .nav-item { transform: none !important; }
}

@media (prefers-color-scheme: dark) {
  .prototype-nav { color: var(--color-text-dark); }
  .nav-surface { background: rgb(16 23 34 / 62%); }
  .brand, .nav-item.is-active { color: var(--color-primary-light); }
  .nav-item { color: var(--color-text-light-dark); }
  .nav-item:hover, .nav-item:focus-visible { color: var(--color-text-dark); }
}

@media (prefers-reduced-motion: reduce) {
  .nav-item { transform: none !important; transition: color 100ms ease; }
}

@media (max-width: 48rem) {
  .nav-surface { padding-inline: 1.1rem; }
  .brand { display: none; }
  .menu { width: 100%; justify-content: space-between; gap: 0; }
  .nav-item { padding-inline: 0.45rem; font-size: 0.65rem; }
}
</style>
