<template>
  <a :href="link" target="_blank" rel="noopener noreferrer" class="block group">
    <div class="bg-surface dark:bg-surface-dark rounded-xl shadow-card dark:shadow-card-dark hover:shadow-glass dark:hover:shadow-glass-dark transition-all duration-300 overflow-hidden ring-1 ring-text/[0.05] dark:ring-border-dark">
      <div v-if="image" class="aspect-video bg-primary/5 dark:bg-surface-elevated-dark flex items-center justify-center">
        <img :src="image" :alt="title || 'Project image'" class="object-cover w-full h-full" loading="lazy" decoding="async" width="640" height="360" />
      </div>
      <div v-else class="aspect-video bg-primary/5 dark:bg-surface-elevated-dark"></div>
      <div class="p-6">
        <div class="flex items-center justify-between">
          <h3 class="text-xl font-semibold text-text dark:text-text-dark group-hover:text-primary dark:group-hover:text-primary-light transition-colors duration-300">
            {{ title }}
          </h3>
          <div class="text-text-light dark:text-text-light-dark group-hover:text-primary dark:group-hover:text-primary-light transition-colors duration-300">
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
        </div>
        <p class="mt-2 text-text-light dark:text-text-light-dark">{{ description }}</p>
        <div class="mt-4 flex flex-wrap gap-2">
          <span v-for="tag in tags" :key="tag" class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 dark:bg-primary-light/15 text-primary dark:text-primary-light">
            {{ tag }}
          </span>
          <span v-for="badge in badges" v-if="badges" :key="badge.text.toLowerCase()" :class="['px-2 py-0.5 rounded-full text-xs font-medium border', badge.color]">
            {{ badge.text }}
          </span>
        </div>
      </div>
    </div>
  </a>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  tags: {
    type: Array,
    required: true
  },
  image: {
    type: String,
    required: false
  },
  badges: {
    type: Array,
    required: false,
    default: null
  }
})
</script> 