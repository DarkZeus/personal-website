<template>
  <section class="py-12">
    <div class="flex items-center gap-3 mb-8">
      <div v-if="icon" class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
        <component :is="icon" class="w-5 h-5" />
      </div>
      <h2 class="text-2xl font-display font-semibold text-text">{{ title }}</h2>
    </div>
    <slot />
  </section>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: [Object, Function],
    default: null
  }
})
</script>
