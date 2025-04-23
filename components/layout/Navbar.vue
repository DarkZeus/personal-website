<template>
    <nav class="fixed top-0 sm:top-4 left-1/2 -translate-x-1/2 z-50 w-full sm:w-[70%] md:w-[65%] lg:w-[60%]">
      <div class="bg-white/80 backdrop-blur-sm rounded-none sm:rounded-lg shadow-glass px-4 sm:px-6 py-3">
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
            <NuxtLink 
              to="/" 
              class="group relative px-4 py-2 text-text-light hover:text-primary transition-colors duration-300"
              active-class="text-primary"
            >
              <span class="relative z-10">Home</span>
              <div class="absolute inset-0 bg-primary/5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </NuxtLink>
            <NuxtLink 
              to="/about" 
              class="group relative px-4 py-2 text-text-light hover:text-primary transition-colors duration-300"
              active-class="text-primary"
            >
              <span class="relative z-10">About</span>
              <div class="absolute inset-0 bg-primary/5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </NuxtLink>
            <!-- <NuxtLink 
              to="/projects" 
              class="group relative px-4 py-2 text-text-light hover:text-primary transition-colors duration-300"
              active-class="text-primary"
            >
              <span class="relative z-10">Projects</span>
              <div class="absolute inset-0 bg-primary/5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </NuxtLink> -->
            <NuxtLink 
              to="/contact" 
              class="group relative px-4 py-2 text-text-light hover:text-primary transition-colors duration-300"
              active-class="text-primary"
            >
              <span class="relative z-10">Contact</span>
              <div class="absolute inset-0 bg-primary/5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </NuxtLink>
          </div>
        </div>
  
        <!-- Mobile menu -->
        <div 
          v-show="isMenuOpen"
          class="sm:hidden mt-4 space-y-2"
        >
          <NuxtLink 
            to="/" 
            class="block group relative px-4 py-2 text-text-light hover:text-primary transition-colors duration-300"
            active-class="text-primary"
            @click="isMenuOpen = false"
          >
            <span class="relative z-10">Home</span>
            <div class="absolute inset-0 bg-primary/5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </NuxtLink>
          <NuxtLink 
            to="/about" 
            class="block group relative px-4 py-2 text-text-light hover:text-primary transition-colors duration-300"
            active-class="text-primary"
            @click="isMenuOpen = false"
          >
            <span class="relative z-10">About</span>
            <div class="absolute inset-0 bg-primary/5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </NuxtLink>
          <NuxtLink 
            to="/projects" 
            class="block group relative px-4 py-2 text-text-light hover:text-primary transition-colors duration-300"
            active-class="text-primary"
            @click="isMenuOpen = false"
          >
            <span class="relative z-10">Projects</span>
            <div class="absolute inset-0 bg-primary/5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </NuxtLink>
          <NuxtLink 
            to="/contact" 
            class="block group relative px-4 py-2 text-text-light hover:text-primary transition-colors duration-300"
            active-class="text-primary"
            @click="isMenuOpen = false"
          >
            <span class="relative z-10">Contact</span>
            <div class="absolute inset-0 bg-primary/5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </NuxtLink>
        </div>
      </div>
    </nav>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const isMenuOpen = ref(false)
  </script> 