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
      <div class="bg-soft-titanium/50 backdrop-blur-sm px-4 sm:px-6 py-3 will-change-transform rounded-[inherit]">
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
              active-class="text-primary"
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
              active-class="text-primary"
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
  import { ref } from 'vue'
  import { motion, useScroll, useMotionValueEvent, AnimatePresence, useTransform } from 'motion-v'
  
  const isMenuOpen = ref(false)
  const { scrollY } = useScroll()
  
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
    ['none', 'blur(10px)'],
    { clamp: true }
  )
  
  const menuItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' }
  ]
  </script> 