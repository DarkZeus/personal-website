<template>
    <nav class="fixed top-0 sm:top-4 left-1/2 -translate-x-1/2 z-50 w-full sm:w-[70%] md:w-[65%] lg:w-[60%]">
      <div class="bg-soft-titanium/50 backdrop-blur-sm rounded-none sm:rounded-lg shadow-glass px-4 sm:px-6 py-3">
        <div class="flex items-center justify-between">
          <NuxtLink to="/" class="text-primary font-display font-semibold text-xl hover:opacity-80 transition-opacity">Serhii Resnianskyi</NuxtLink>
          
          <!-- Mobile menu button -->
          <button 
            @click="isMenuOpen = !isMenuOpen"
            class="sm:hidden p-2 rounded-md hover:bg-primary/5 transition-colors duration-300"
            aria-label="Toggle menu"
          >
            <svg 
              class="w-6 h-6 text-text-light" 
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
            <template v-for="link in navigationLinks" :key="link.path">
              <NuxtLink 
                v-if="!link.disabled"
                :to="link.path" 
                class="group relative px-4 py-2 text-text-light hover:text-primary transition-colors duration-300"
                active-class="text-primary"
              >
                <span class="relative z-10">{{ link.label }}</span>
                <div class="absolute inset-0 bg-primary/5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </NuxtLink>
            </template>
          </div>
        </div>
  
        <!-- Mobile menu -->
        <AnimatePresence>
          <Motion 
            v-if="isMenuOpen"
            as="div"
            :initial="{ opacity: 0, y: -20 }"
            :animate="{ opacity: 1, y: 0 }"
            :exit="{ opacity: 0, y: -20 }"
            :transition="{ 
              type: 'spring',
              stiffness: 300,
              damping: 30
            }"
            class="mt-4 space-y-2"
          >
            <template v-for="(link, index) in navigationLinks" :key="link.path">
              <Motion
                v-if="!link.disabled"
                :initial="{ opacity: 0, x: -20 }"
                :animate="{ opacity: 1, x: 0 }"
                :exit="{ opacity: 0, x: -20 }"
                :transition="{ 
                  type: 'spring',
                  stiffness: 300,
                  damping: 30,
                  delay: index * 0.1
                }"
              >
                <NuxtLink 
                  :to="link.path" 
                  class="block group relative px-4 py-2 text-text-light hover:text-primary transition-colors duration-300"
                  active-class="text-primary"
                  @click="isMenuOpen = false"
                >
                  <span class="relative z-10">{{ link.label }}</span>
                  <div class="absolute inset-0 bg-primary/5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </NuxtLink>
              </Motion>
            </template>
          </Motion>
        </AnimatePresence>
      </div>
    </nav>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { Motion, AnimatePresence } from 'motion-v'
  const isMenuOpen = ref(false)
  
  const navigationLinks = [
    {
      path: '/',
      label: 'Home',
      disabled: false
    },
    {
      path: '/about',
      label: 'About',
      disabled: false
    },
    {
      path: '/projects',
      label: 'Projects',
      disabled: true
    },
    {
      path: '/contact',
      label: 'Contact',
      disabled: false
    }
  ]
  </script> 