<template>
  <a :href="link" target="_blank" rel="noopener noreferrer" class="block group">
    <div class="bg-surface rounded-lg shadow-card hover:shadow-glass transition-all duration-300 overflow-hidden">
      <div v-if="image" class="aspect-video bg-primary/5 flex items-center justify-center">
        <img :src="image" :alt="title || 'Project image'" class="object-cover w-full h-full" loading="lazy" decoding="async" width="640" height="360" />
      </div>
      <div v-else class="aspect-video bg-primary/5"></div>
      <div class="p-6">
        <div class="flex items-center justify-between">
          <h3 class="text-xl font-semibold text-text group-hover:text-primary transition-colors duration-300">
            {{ title }}
          </h3>
          <div class="text-text-light group-hover:text-primary transition-colors duration-300">
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
        </div>
        <p class="mt-2 text-text-light">{{ description }}</p>
        <div class="mt-4 flex flex-wrap gap-2">
          <span v-for="tag in tags" :key="tag" class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary">
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