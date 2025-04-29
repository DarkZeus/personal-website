<template>
    <motion.nav 
      class="fixed top-0 left-1/2 -translate-x-1/2 z-50 w-full will-change-transform overflow-hidden"
      :animate="{
        width: isScrolled ? '70%' : '100%',
        y: isScrolled ? 20 : 0,
        borderRadius: isScrolled ? '0.75rem' : '0',
        boxShadow: isScrolled ? '0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset' : 'none',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
      }"
      :transition="{
        type: 'spring',
        stiffness: 200,
        damping: 50
      }"
    >
      <div class="bg-soft-titanium/50 backdrop-blur-sm px-4 sm:px-6 py-3 will-change-transform">
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
              <div class="absolute inset-0 bg-primary/5 rounded-md opacity-0 group-hover:opacity-100 group-active:opacity-80 transition-opacity duration-150"></div>
            </NuxtLink>
          </div>
        </div>
  
        <!-- Mobile menu -->
        <Transition
          enter-active-class="transition duration-150 ease-out"
          enter-from-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95"
        >
          <div 
            v-if="isMenuOpen"
            class="sm:hidden mt-4 space-y-2 will-change-transform"
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
          </div>
        </Transition>
      </div>
    </motion.nav>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  import { motion } from 'motion-v'
  
  const isMenuOpen = ref(false)
  const isScrolled = ref(false)
  
  const handleScroll = () => {
    isScrolled.value = window.scrollY > 100
  }
  
  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
    // Initial check
    handleScroll()
  })
  
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
  
  const menuItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' }
  ]
  </script> 