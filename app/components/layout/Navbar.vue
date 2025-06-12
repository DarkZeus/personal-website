<template>
  <motion.nav 
    class="fixed top-0 left-1/2 -translate-x-1/2 z-50 w-full will-change-transform"
    :style="{
      width: navWidth,
      y: navOffset,
      borderRadius: navRadius,
      boxShadow: navShadow,
      backdropFilter: navBlur
    }"
  >
    <!-- SVG Filter for liquid glass effect -->
    <svg class="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="liquid-glass" color-interpolation-filters="sRGB">
          <feImage
            :href="displacementMap"
            x="0"
            y="0"
            width="100%"
            height="100%"
            result="map"
          />
          <feDisplacementMap in2="map" in="SourceGraphic" scale="-180" xChannelSelector="R" yChannelSelector="B" />
        </filter>
      </defs>
    </svg>

    <div class="bg-soft-titanium/50 backdrop-blur-[3px] px-4 sm:px-6 py-3 will-change-transform rounded-[inherit]">
      <div class="flex items-center justify-between">
        <NuxtLink to="/" class="text-primary font-display font-medium text-xl tracking-tight hover:opacity-80 transition-opacity will-change-opacity">Serhii Resnianskyi</NuxtLink>
        
        <!-- Mobile menu button -->
        <button 
          @click="isMenuOpen = !isMenuOpen"
          class="sm:hidden p-2 rounded-md hover:bg-primary/5 active:bg-primary/10 transition-colors duration-150 will-change-transform"
          aria-label="Toggle menu"
        >
          <svg 
            class="w-6 h-6 text-text-light will-change-transform" 
            :class="{ 'rotate-90': isMenuOpen }"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              v-if="!isMenuOpen"
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path 
              v-else
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <!-- Desktop menu -->
        <div class="hidden sm:flex items-center space-x-4">
          <NuxtLink 
            v-for="item in menuItems"
            :key="item.path"
            :to="item.path" 
            class="group relative px-4 py-2 text-text-light hover:text-primary active:text-primary/80 transition-colors duration-150"
            active-class="text-primary [&>div]:opacity-100"
          >
            <span class="relative z-10">{{ item.label }}</span>
            <div class="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 group-active:opacity-80 transition-opacity duration-150"></div>
          </NuxtLink>
        </div>
      </div>

      <!-- Mobile menu -->
      <AnimatePresence>
        <motion.div 
          v-if="isMenuOpen"
          class="sm:hidden mt-4 space-y-2 will-change-transform origin-top"
          :initial="{ opacity: 0, y: -20, scale: 0.95 }"
          :animate="{ opacity: 1, y: 0, scale: 1 }"
          :exit="{ opacity: 0, y: -20, scale: 0.95 }"
          :transition="{
            type: 'spring',
            stiffness: 300,
            damping: 20
          }"
        >
          <NuxtLink 
            v-for="item in menuItems"
            :key="item.path"
            :to="item.path" 
            class="block group relative px-4 py-2 text-text-light hover:text-primary active:text-primary/80 transition-colors duration-150"
            active-class="text-primary [&>div]:opacity-100"
            @click="isMenuOpen = false"
          >
            <span class="relative z-10">{{ item.label }}</span>
            <div class="absolute inset-0 bg-primary/5 rounded-md opacity-0 group-hover:opacity-100 group-active:opacity-80 transition-opacity duration-150"></div>
          </NuxtLink>
        </motion.div>
      </AnimatePresence>
    </div>
  </motion.nav>
</template>

<script setup>
import { ref, computed } from 'vue'
import { motion, useScroll, useMotionValueEvent, AnimatePresence, useTransform } from 'motion-v'

const isMenuOpen = ref(false)
const { scrollY } = useScroll()

// Create displacement map for liquid glass effect
const displacementMap = computed(() => {
  const svg = `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="red" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stop-color="#0000"/>
          <stop offset="100%" stop-color="red"/>
        </linearGradient>
        <linearGradient id="blue" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#0000"/>
          <stop offset="100%" stop-color="blue"/>
        </linearGradient>
      </defs>
      <rect width="100" height="100" fill="black"/>
      <rect width="100" height="100" rx="8" fill="url(#red)"/>
      <rect width="100" height="100" rx="8" fill="url(#blue)" style="mix-blend-mode: difference"/>
      <rect x="3.5" y="3.5" width="93" height="93" rx="8" fill="hsl(0 0% 50% / 0.93)" style="filter:blur(11px)"/>
    </svg>
  `
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
})

// Create smooth interpolated values for each animated property
const navWidth = useTransform(scrollY, 
  [0, 100], 
  ['100%', '85%'], 
  { clamp: true }
)

const navOffset = useTransform(scrollY,
  [0, 100],
  [0, 20],
  { clamp: true }
)

const navRadius = useTransform(scrollY,
  [0, 100],
  ['0rem', '0.5rem'],
  { clamp: true }
)

const navShadow = useTransform(scrollY,
  [0, 100],
  ['none', '0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset'],
  { clamp: true }
)

const navBlur = useTransform(scrollY,
  [0, 100],
  ['none', 'url(#liquid-glass) blur(3px)'],
  { clamp: true }
)

const menuItems = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/projects', label: 'Projects' },
  { path: '/contact', label: 'Contact' },
]
</script> 