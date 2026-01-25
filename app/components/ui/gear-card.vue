<template>
  <motion.div
    :whileHover="link ? { scale: 1.02 } : undefined"
    :transition="{ type: 'spring', stiffness: 400, damping: 17 }"
  >
    <component
      :is="link ? 'a' : 'div'"
      :href="link"
      :target="link ? '_blank' : undefined"
      :rel="link ? 'noopener noreferrer' : undefined"
      class="block group"
    >
      <div class="bg-surface dark:bg-surface-dark rounded-xl shadow-card dark:shadow-card-dark hover:shadow-glass dark:hover:shadow-glass-dark transition-all duration-300 overflow-hidden ring-1 ring-text/[0.05] dark:ring-border-dark">
        <!-- Image -->
        <div class="aspect-square bg-primary/5 dark:bg-surface-elevated-dark flex items-center justify-center overflow-hidden">
          <img
            v-if="image"
            :src="image"
            :alt="name"
            class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            decoding="async"
          />
          <div v-else class="w-16 h-16 text-primary/30 dark:text-primary-light/30">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
        </div>

        <!-- Content -->
        <div class="p-4">
          <div class="flex items-start justify-between gap-2">
            <div class="min-w-0">
              <p class="text-xs font-medium text-primary dark:text-primary-light uppercase tracking-wide">{{ category }}</p>
              <h3 class="mt-1 text-base font-semibold text-text dark:text-text-dark group-hover:text-primary dark:group-hover:text-primary-light transition-colors duration-300 truncate">
                {{ name }}
              </h3>
            </div>
            <svg v-if="link" class="w-4 h-4 text-text-light dark:text-text-light-dark group-hover:text-primary dark:group-hover:text-primary-light transition-colors duration-300 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>

          <p class="mt-2 text-sm text-text-light dark:text-text-light-dark line-clamp-2">{{ description }}</p>

          <!-- Specs -->
          <div v-if="specs && specs.length" class="mt-3 flex flex-wrap gap-1.5">
            <span
              v-for="spec in specs"
              :key="spec"
              class="px-2 py-0.5 rounded text-xs font-medium bg-primary/10 dark:bg-primary-light/15 text-primary dark:text-primary-light"
            >
              {{ spec }}
            </span>
          </div>
        </div>
      </div>
    </component>
  </motion.div>
</template>

<script setup>
import { motion } from 'motion-v'

defineProps({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: ''
  },
  link: {
    type: String,
    default: ''
  },
  specs: {
    type: Array,
    default: () => []
  }
})
</script>
