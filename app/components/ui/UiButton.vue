<template>
  <component
    :is="componentType"
    :to="as === 'NuxtLink' ? to : undefined"
    :href="as === 'a' ? href : undefined"
    :type="as === 'button' ? type : undefined"
    :class="[
      'group relative inline-flex min-h-12 items-center justify-center rounded-lg px-7 py-3 text-[15px] font-semibold transition-colors duration-150 active:scale-[0.98] motion-reduce:transition-none',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
      'dark:focus-visible:ring-offset-void-black',
      variantClasses
    ]"
    v-bind="$attrs"
  >
    <span class="inline-flex items-center gap-3 whitespace-nowrap">
      <slot />
    </span>
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
      return 'bg-primary text-white hover:bg-primary-dark dark:bg-primary-light dark:text-void-black dark:hover:bg-primary'
    case 'ghost':
      return 'text-primary hover:bg-primary/[0.06] dark:text-primary-light dark:hover:bg-primary-light/10'
    default:
      return ''
  }
})
</script>
