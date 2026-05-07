<template>
  <article v-if="post">
    <header class="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-20">
      <div class="absolute inset-0 bg-grid-pattern opacity-[0.015]" aria-hidden="true"></div>

      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <NuxtLink
          to="/blog"
          class="inline-flex items-center gap-2 text-sm font-medium text-primary dark:text-primary-light hover:opacity-80 transition-opacity"
        >
          <ArrowLeftIcon class="h-4 w-4" />
          Blog
        </NuxtLink>

        <p class="mt-10 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium uppercase tracking-wide text-primary dark:text-primary-light">
          <span>{{ post.category }}</span>
          <span aria-hidden="true" class="text-text-light/40 dark:text-text-light-dark/40">/</span>
          <time :datetime="publishedDateTime">{{ formattedDate }}</time>
        </p>
        <h1 class="mt-4 text-4xl font-display font-semibold text-text dark:text-text-dark sm:text-5xl text-balance">
          {{ post.title }}
        </h1>
        <p class="mt-6 text-lg leading-relaxed text-text-light dark:text-text-light-dark text-pretty">
          {{ post.description }}
        </p>
      </div>
    </header>

    <section class="pb-24 sm:pb-32">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ContentRenderer :value="post" class="blog-content" />
      </div>
    </section>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ArrowLeftIcon } from '@heroicons/vue/24/outline'
import { ContentRenderer } from '#components'

const route = useRoute()
const postPath = computed(() => `/blog/${route.params.slug}`)

const { data: post } = await useAsyncData(postPath.value, () => {
  return queryCollection('blog').path(postPath.value).first()
})

if (!post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Blog post not found',
  })
}

const currentPost = post.value
const postUrl = `https://fuad.work${currentPost.path}`
const publishedDateTime = new Date(currentPost.date).toISOString()

const formattedDate = computed(() => {
  return new Intl.DateTimeFormat('en', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(currentPost.date))
})

useSeoMeta({
  title: `${currentPost.title} - Serhii Resnianskyi`,
  description: currentPost.description,
  ogTitle: currentPost.title,
  ogDescription: currentPost.description,
  ogUrl: postUrl,
  ogType: 'article',
  articlePublishedTime: publishedDateTime,
  twitterTitle: currentPost.title,
  twitterDescription: currentPost.description,
  twitterUrl: postUrl,
})

useHead({
  link: [
    { rel: 'canonical', href: postUrl },
  ],
  meta: [
    { key: 'twitter:title', name: 'twitter:title', content: currentPost.title },
    { key: 'twitter:description', name: 'twitter:description', content: currentPost.description },
    { key: 'twitter:url', name: 'twitter:url', content: postUrl },
  ],
})
</script>
