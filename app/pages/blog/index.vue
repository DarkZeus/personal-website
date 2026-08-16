<template>
  <div class="studio-page pt-28 sm:pt-32">
    <div class="studio-circle -bottom-48 -right-52 h-[32rem] w-[32rem]" aria-hidden="true"></div>

    <div class="studio-shell relative">
      <header class="grid items-end gap-10 py-10 lg:grid-cols-[1.04fr_.96fr] lg:gap-24 lg:py-16">
        <h1 class="studio-page-title">
          From the
          <span class="studio-page-title-accent">Blog</span>
        </h1>
        <p class="studio-lede m-0 lg:pb-1">Notes from building software, shaping interfaces, and keeping systems understandable.</p>
      </header>

      <section class="mt-12 sm:mt-16" aria-label="Blog posts">
        <template v-if="posts?.length">
          <NuxtLink
            v-for="(post, index) in posts"
            :key="post.path"
            :to="post.path"
            class="studio-focus studio-press-row group grid gap-5 border-b studio-rule py-10 last:border-b-0 sm:py-12 lg:grid-cols-[11rem_minmax(0,1fr)_2.5rem] lg:gap-10"
          >
            <div>
              <time :datetime="formatDateTime(post.date)" class="text-xs text-text-light dark:text-text-light-dark">{{ formatDate(post.date) }}</time>
              <span class="mt-2 block text-xs font-semibold text-primary dark:text-primary-light">{{ post.category }}</span>
            </div>
            <div>
              <h2 :class="['m-0 max-w-[32ch] font-semibold leading-[1.14] tracking-[-0.03em] text-text transition-colors group-hover:text-primary dark:text-text-dark dark:group-hover:text-primary-light', index === 0 ? 'text-[clamp(1.75rem,2.5vw,2.25rem)]' : 'text-[29px]']">
                {{ post.title }}
              </h2>
              <p class="mt-3 max-w-[72ch] text-sm leading-relaxed text-text-light dark:text-text-light-dark">{{ post.description }}</p>
            </div>
            <span class="grid h-10 w-10 place-items-center text-primary transition-transform duration-150 group-hover:translate-x-1 motion-reduce:transition-none dark:text-primary-light" aria-hidden="true">
              <ArrowRightIcon class="h-5 w-5" />
            </span>
          </NuxtLink>
        </template>

        <div v-else class="py-16">
          <h2 class="m-0 text-2xl font-semibold text-text dark:text-text-dark">No posts yet</h2>
          <p class="mt-3 text-text-light dark:text-text-light-dark">New Blog Posts will appear here once they are published.</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowRightIcon } from '@heroicons/vue/24/outline'

const blogUrl = 'https://fuad.work/blog'

const { data: posts } = await useAsyncData('blog-posts', () => {
  return queryCollection('blog').order('date', 'DESC').all()
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

useHead({ link: [{ rel: 'canonical', href: blogUrl }] })

const formatDate = (date: string | Date) => new Intl.DateTimeFormat('en', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
}).format(new Date(date))

const formatDateTime = (date: string | Date) => new Date(date).toISOString()
</script>
