<template>
  <div class="flex items-start gap-4">
    <div class="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
      <slot name="icon"></slot>
    </div>
    <div>
      <h3 class="text-lg font-semibold text-text">{{ title }}</h3>
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  }
})
</script> 