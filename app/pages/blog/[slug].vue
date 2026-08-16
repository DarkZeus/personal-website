<template>
  <article v-if="post" class="studio-page pb-24 pt-28 sm:pb-32 sm:pt-32">
    <div class="studio-circle -right-52 top-20 h-[32rem] w-[32rem]" aria-hidden="true"></div>

    <header class="relative pb-14 pt-10 sm:pb-20 sm:pt-16">
      <div class="relative mx-auto w-[min(calc(100%_-_2.25rem),48rem)]">
        <NuxtLink
          to="/blog"
          class="studio-focus inline-flex items-center gap-2 text-sm font-medium text-primary transition-opacity hover:opacity-75 dark:text-primary-light"
        >
          <ArrowLeftIcon class="h-4 w-4" aria-hidden="true" />
          Blog
        </NuxtLink>

        <p class="mt-10 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-primary dark:text-primary-light">
          <span>{{ post.category }}</span>
          <span aria-hidden="true" class="text-text-light/40 dark:text-text-light-dark/40">/</span>
          <time :datetime="publishedDateTime">{{ formattedDate }}</time>
        </p>
        <h1 class="mt-5 text-[clamp(2.75rem,6vw,4.75rem)] font-medium leading-[.98] tracking-[-0.04em] text-text dark:text-text-dark text-balance">
          {{ post.title }}
        </h1>
        <p class="mt-7 max-w-[65ch] text-lg leading-relaxed text-text-light dark:text-text-light-dark text-pretty">
          {{ post.description }}
        </p>
      </div>
    </header>

    <section class="relative">
      <div class="mx-auto w-[min(calc(100%_-_2.25rem),48rem)] border-t studio-rule pt-12 sm:pt-16">
        <ContentRenderer
          :value="post"
          :components="contentComponents"
          class="blog-content"
        />
      </div>
    </section>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ArrowLeftIcon } from '@heroicons/vue/24/outline'
import { ContentRenderer, NuxtPicture } from '#components'
import ThemePicture from '~/components/content/ThemePicture.vue'

const contentComponents = {
  'nuxt-picture': NuxtPicture,
  'theme-picture': ThemePicture,
}

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
