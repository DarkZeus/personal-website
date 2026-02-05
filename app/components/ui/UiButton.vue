<template>
  <component
    :is="componentType"
    :to="as === 'NuxtLink' ? to : undefined"
    :href="as === 'a' ? href : undefined"
    :type="as === 'button' ? type : undefined"
    :class="[
      'group relative inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-md overflow-hidden transition-all duration-300',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
      'dark:focus-visible:ring-offset-void-black',
      variantClasses
    ]"
    v-bind="$attrs"
  >
    <span class="relative z-10 inline-flex items-center gap-2 whitespace-nowrap">
      <slot />
    </span>

    <!-- Primary variant backgrounds -->
    <template v-if="variant === 'primary'">
      <div class="absolute inset-0 bg-primary dark:bg-primary-light opacity-100 group-hover:opacity-90 transition-opacity duration-300"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-primary-dark to-primary dark:from-primary dark:to-primary-light opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <!-- Button decoration -->
      <div class="absolute -right-1 -top-1 w-2 h-2 rounded-full bg-white/20"></div>
      <div class="absolute -left-1 -bottom-1 w-2 h-2 rounded-full bg-white/20"></div>
    </template>

    <!-- Ghost variant backgrounds -->
    <template v-else-if="variant === 'ghost'">
      <div class="absolute inset-0 bg-primary/5 dark:bg-primary-light/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <!-- Button decoration -->
      <div class="absolute -right-1 -top-1 w-2 h-2 rounded-full bg-primary/20 dark:bg-primary-light/30"></div>
      <div class="absolute -left-1 -bottom-1 w-2 h-2 rounded-full bg-primary/20 dark:bg-primary-light/30"></div>
    </template>
  </component>
</template>

<script setup>
import { computed } from 'vue'
import { NuxtLink } from '#components'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'ghost'].includes(value)
  },
  as: {
    type: String,
    default: 'button',
    validator: (value) => ['button', 'a', 'NuxtLink'].includes(value)
  },
  to: {
    type: String,
    default: ''
  },
  href: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'button'
  }
})

const componentType = computed(() => {
  if (props.as === 'NuxtLink') return NuxtLink
  return props.as
})

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'text-white dark:text-void-black'
    case 'ghost':
      return 'text-primary dark:text-primary-light'
    default:
      return ''
  }
})
</script>
