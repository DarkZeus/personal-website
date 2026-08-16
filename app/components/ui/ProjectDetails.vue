<template>
  <div :class="['grid grid-cols-[1fr_auto] gap-5 pt-5', featured ? 'lg:pb-2' : '']">
    <div>
      <h2 :class="['m-0 max-w-[20ch] font-semibold leading-[1.16] tracking-[-0.03em] text-text dark:text-text-dark', featured ? 'text-[clamp(1.75rem,2.5vw,2.25rem)]' : 'text-[22px]']">
        {{ project.title }}
      </h2>
      <p class="mt-3 max-w-[48ch] text-[13px] leading-relaxed text-text-light dark:text-text-light-dark">{{ project.description }}</p>
      <ul class="mt-4 flex flex-wrap gap-x-4 gap-y-2 p-0 text-[11px] font-semibold text-primary dark:text-primary-light" aria-label="Project technologies and status">
        <li v-for="tag in project.tags" :key="tag">{{ tag }}</li>
        <li v-if="project.status">{{ project.status }}</li>
      </ul>
    </div>
    <component :is="project.external ? 'a' : NuxtLink" :href="project.external ? project.link : undefined" :to="project.external ? undefined : project.link" :target="project.external ? '_blank' : undefined" :rel="project.external ? 'noopener noreferrer' : undefined" class="studio-focus grid h-10 w-10 place-items-center rounded-lg border studio-rule text-primary transition-colors hover:bg-primary/[0.06] dark:text-primary-light dark:hover:bg-primary-light/10" :aria-label="`Open ${project.title}`">
      <ArrowUpRightIcon class="h-[18px] w-[18px]" aria-hidden="true" />
    </component>
  </div>
</template>

<script setup lang="ts">
import { ArrowUpRightIcon } from '@heroicons/vue/24/outline'
import { NuxtLink } from '#components'

defineProps<{
  project: {
    title: string
    description: string
    link: string
    tags: readonly string[]
    status: string
    external: boolean
  }
  featured?: boolean
}>()
</script>
