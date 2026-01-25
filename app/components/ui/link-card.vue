<template>
  <motion.a
    :href="url"
    target="_blank"
    rel="noopener noreferrer"
    class="block group"
    :whileHover="{ scale: 1.02 }"
    :transition="{ type: 'spring', stiffness: 400, damping: 17 }"
  >
    <div class="bg-surface dark:bg-surface-dark rounded-xl shadow-card dark:shadow-card-dark hover:shadow-glass dark:hover:shadow-glass-dark transition-all duration-300 p-6 relative overflow-hidden ring-1 ring-text/[0.05] dark:ring-border-dark">
      <!-- Decorative corner element -->
      <div class="absolute top-0 right-0 w-16 h-16 bg-primary/5 dark:bg-primary-light/10 rounded-bl-full" />

      <div class="relative flex items-start gap-4">
        <!-- Icon -->
        <div class="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 dark:bg-primary-light/15 flex items-center justify-center text-primary dark:text-primary-light group-hover:bg-primary dark:group-hover:bg-primary-light group-hover:text-white dark:group-hover:text-void-black transition-colors duration-300">
          <component :is="icon" class="w-6 h-6" />
        </div>

        <!-- Content -->
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between gap-2">
            <h3 class="text-lg font-semibold text-text dark:text-text-dark group-hover:text-primary dark:group-hover:text-primary-light transition-colors duration-300 truncate">
              {{ title }}
            </h3>
            <svg class="w-5 h-5 text-text-light dark:text-text-light-dark group-hover:text-primary dark:group-hover:text-primary-light transition-colors duration-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
          <p class="mt-1 text-sm text-text-light dark:text-text-light-dark">{{ description }}</p>
        </div>
      </div>
    </div>
  </motion.a>
</template>

<script setup>
import { motion } from 'motion-v'

defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  icon: {
    type: [Object, Function],
    required: true
  }
})
</script>
