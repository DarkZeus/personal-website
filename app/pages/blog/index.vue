<template>
  <div>
    <HeroSection>
      <template #title>Blog</template>
      <template #description>
        Notes from building software, shaping interfaces, and keeping systems understandable.
      </template>
    </HeroSection>

    <section class="relative overflow-hidden py-16 sm:py-20">
      <div class="absolute inset-0 bg-grid-pattern opacity-[0.015]" aria-hidden="true"></div>

      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div v-if="posts?.length" class="space-y-5" role="list" aria-label="Blog posts">
          <NuxtLink
            v-for="post in posts"
            :key="post.path"
            :to="post.path"
            class="group block rounded-lg bg-surface dark:bg-surface-dark p-6 sm:p-8 ring-1 ring-text/[0.05] dark:ring-border-dark shadow-card dark:shadow-card-dark hover:shadow-glass dark:hover:shadow-glass-dark transition-all duration-300"
            role="listitem"
          >
            <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div class="max-w-3xl">
                <p class="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium uppercase tracking-wide text-primary dark:text-primary-light">
                  <span>{{ post.category }}</span>
                  <span aria-hidden="true" class="text-text-light/40 dark:text-text-light-dark/40">/</span>
                  <time :datetime="formatDateTime(post.date)">{{ formatDate(post.date) }}</time>
                </p>
                <h2 class="mt-3 text-2xl font-display font-semibold text-text dark:text-text-dark text-balance group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                  {{ post.title }}
                </h2>
                <p class="mt-3 text-text-light dark:text-text-light-dark leading-relaxed text-pretty">
                  {{ post.description }}
                </p>
              </div>

              <span class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary dark:bg-primary-light/10 dark:text-primary-light transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                <ArrowRightIcon class="h-5 w-5" />
              </span>
            </div>
          </NuxtLink>
        </div>

        <div v-else class="rounded-lg bg-surface dark:bg-surface-dark p-8 ring-1 ring-text/[0.05] dark:ring-border-dark shadow-card dark:shadow-card-dark text-center">
          <h2 class="text-2xl font-display font-semibold text-text dark:text-text-dark">No posts yet</h2>
          <p class="mt-3 text-text-light dark:text-text-light-dark">New posts will appear here once they are published.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ArrowRightIcon } from '@heroicons/vue/24/outline'
import HeroSection from '~/components/sections/hero-section.vue'

const blogUrl = 'https://fuad.work/blog'

const { data: posts } = await useAsyncData('blog-posts', () => {
  return queryCollection('blog')
    .order('date', 'DESC')
    .all()
})

useSeoMeta({
  title: 'Blog - Serhii Resnianskyi',
  description: 'Notes from Serhii Resnianskyi on software engineering, interfaces, and web architecture.',
  ogTitle: 'Blog - Serhii Resnianskyi',
  ogDescription: 'Notes from Serhii Resnianskyi on software engineering, interfaces, and web architecture.',
  ogUrl: blogUrl,
  twitterTitle: 'Blog - Serhii Resnianskyi',
  twitterDescription: 'Notes from Serhii Resnianskyi on software engineering, interfaces, and web architecture.',
  twitterUrl: blogUrl,
})

useHead({
  link: [
    { rel: 'canonical', href: blogUrl },
  ],
  meta: [
    { name: 'twitter:title', content: 'Blog - Serhii Resnianskyi' },
    { name: 'twitter:description', content: 'Notes from Serhii Resnianskyi on software engineering, interfaces, and web architecture.' },
    { name: 'twitter:url', content: blogUrl },
  ],
})

const formatDate = (date: string | Date) => {
  return new Intl.DateTimeFormat('en', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(date))
}

const formatDateTime = (date: string | Date) => {
  return new Date(date).toISOString()
}
</script>
