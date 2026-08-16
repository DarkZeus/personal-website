<template>
  <motion.nav
    aria-label="Weight transfer navigation prototype"
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
          <span class="label-active" aria-hidden="true">{{ item }}</span>
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
  position: relative;
  padding: 0.55rem 1rem;
  color: var(--color-text-light);
  font-size: 0.75rem;
  font-weight: 650;
  letter-spacing: -0.018em;
  text-transform: uppercase;
  transition: transform 120ms var(--ease-out);
}

.label-base,
.label-active {
  display: block;
  white-space: nowrap;
}

.label-base {
  transition: color 140ms ease, opacity 140ms ease;
}

.label-active {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
  font-weight: 700;
  letter-spacing: -0.032em;
  clip-path: inset(0 100% 0 0);
  opacity: 0;
  transition:
    clip-path 220ms var(--ease-out),
    opacity 120ms ease;
}

.nav-item:hover .label-base,
.nav-item:focus-visible .label-base {
  color: var(--color-text);
}

.nav-item.is-active .label-base { opacity: 0.16; }
.nav-item.is-active .label-active { clip-path: inset(0 0 0 0); opacity: 1; }
.nav-item:active { transform: scale(0.97); }
.nav-item:focus-visible { outline: 2px solid rgb(21 94 204 / 28%); outline-offset: 3px; }

.no-motion .label-base,
.no-motion .label-active,
.no-motion .nav-item { transition: none; }

@media (prefers-color-scheme: dark) {
  .prototype-nav { color: var(--color-text-dark); }
  .nav-surface { background: rgb(16 23 34 / 62%); }
  .brand, .label-active { color: var(--color-primary-light); }
  .nav-item { color: var(--color-text-light-dark); }
  .nav-item:hover .label-base, .nav-item:focus-visible .label-base { color: var(--color-text-dark); }
}

@media (prefers-reduced-motion: reduce) {
  .label-active { transition: opacity 100ms ease; clip-path: none; }
  .nav-item { transition: none; }
}

@media (max-width: 48rem) {
  .nav-surface { padding-inline: 1.1rem; }
  .brand { display: none; }
  .menu { width: 100%; justify-content: space-between; gap: 0; }
  .nav-item { padding-inline: 0.45rem; font-size: 0.65rem; }
}
</style>
