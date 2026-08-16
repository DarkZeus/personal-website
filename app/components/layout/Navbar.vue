<template>
  <motion.nav
    aria-label="Primary navigation"
    class="studio-nav fixed top-0 left-1/2 -translate-x-1/2 z-50 w-full will-change-transform transition-shadow"
    :class="isScrolled ? 'ring-1 ring-text/[0.1] dark:ring-border-dark shadow-lg dark:shadow-glass-dark' : 'ring-1 ring-transparent shadow-none'"
    :style="{
      width: navWidth,
      y: navOffset,
      borderRadius: navRadius,
      backdropFilter: navBlur
    }"
  >
    <div class="bg-soft-titanium/50 dark:bg-void-black/55 backdrop-blur-sm px-4 sm:px-6 py-3 will-change-transform rounded-[inherit]">
      <div class="flex items-center justify-between">
        <NuxtLink to="/" class="font-display text-[17px] font-semibold tracking-[-0.03em] text-primary transition-opacity hover:opacity-80 dark:text-primary-light">Serhii Resnianskyi</NuxtLink>
        
        <!-- Mobile menu button -->
        <button
          type="button"
          @click="isMenuOpen = !isMenuOpen"
          class="sm:hidden min-h-11 min-w-11 p-2 rounded-md hover:bg-primary/5 dark:hover:bg-primary/10 active:bg-primary/10 dark:active:bg-primary/20 transition-colors duration-150 will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-primary-light dark:focus-visible:ring-offset-void-black"
          :aria-label="isMenuOpen ? 'Close menu' : 'Open menu'"
          :aria-expanded="isMenuOpen"
          aria-controls="mobile-navigation"
        >
          <span class="relative block h-6 w-6 text-text-light dark:text-text-light-dark" aria-hidden="true">
            <svg
              class="mobile-menu-icon absolute inset-0 h-6 w-6"
              :class="isMenuOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg
              class="mobile-menu-icon absolute inset-0 h-6 w-6"
              :class="isMenuOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </span>
        </button>

        <!-- Desktop menu -->
        <div class="hidden sm:flex items-center space-x-4">
          <NuxtLink 
            v-for="item in menuItems"
            :key="item.path"
            :to="item.path" 
            class="group relative px-4 py-2 text-text-light dark:text-text-light-dark hover:text-primary dark:hover:text-primary-light active:text-primary/80 dark:active:text-primary-light/80 transition-colors duration-150"
            active-class="text-primary dark:text-primary-light [&>div]:opacity-100"
          >
            <span class="relative z-10 text-xs font-bold uppercase tracking-[-0.02em]">{{ item.label }}</span>
            <div class="absolute inset-0 bg-primary/5 dark:bg-primary-light/10 opacity-0 group-hover:opacity-100 group-active:opacity-80 transition-opacity duration-150"></div>
          </NuxtLink>
        </div>
      </div>

      <!-- Mobile menu -->
      <AnimatePresence>
        <motion.div
          id="mobile-navigation"
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
            class="block group relative px-4 py-2 text-text-light dark:text-text-light-dark hover:text-primary dark:hover:text-primary-light active:text-primary/80 dark:active:text-primary-light/80 transition-colors duration-150"
            active-class="text-primary dark:text-primary-light [&>div]:opacity-100"
            @click="isMenuOpen = false"
          >
            <span class="relative z-10 text-sm font-bold uppercase tracking-[-0.02em]">{{ item.label }}</span>
            <div class="absolute inset-0 bg-primary/5 dark:bg-primary-light/10 rounded-md opacity-0 group-hover:opacity-100 group-active:opacity-80 transition-opacity duration-150"></div>
          </NuxtLink>
        </motion.div>
      </AnimatePresence>
    </div>
  </motion.nav>
</template>

<script setup>
import { ref, watch } from 'vue'
import { motion, useScroll, useMotionValueEvent, AnimatePresence, useTransform } from 'motion-v'

const isMenuOpen = ref(false)
const isScrolled = ref(false)
const { scrollY } = useScroll()
const route = useRoute()

watch(() => route.fullPath, () => {
  isMenuOpen.value = false
})

useMotionValueEvent(scrollY, "change", (latest) => isScrolled.value = latest > 10)

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

const navBlur = useTransform(scrollY,
  [0, 100],
  ['none', 'blur(10px)'],
  { clamp: true }
)

const menuItems = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/projects', label: 'Projects' },
  { path: '/blog', label: 'Blog' },
  { path: '/gear', label: 'Gear' },
  { path: '/contact', label: 'Contact' },
]
</script> 

<style scoped>
.mobile-menu-icon {
  transition: opacity 150ms var(--ease-in-out), transform 150ms var(--ease-in-out);
}

@media (prefers-reduced-motion: reduce) {
  .mobile-menu-icon {
    transform: none;
    transition: opacity 100ms var(--ease-out);
  }
}
</style>
