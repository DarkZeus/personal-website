<template>
  <div class="studio-page pb-24 pt-28 sm:pb-32 sm:pt-32">
    <div class="studio-circle -bottom-52 -left-64 h-[34rem] w-[34rem]" aria-hidden="true"></div>

    <div class="studio-shell relative">
      <header class="grid items-end gap-10 py-10 lg:grid-cols-[1.2fr_.8fr] lg:gap-24 lg:py-16">
        <h1 class="studio-page-title">
          Selected
          <span class="studio-page-title-accent">work</span>
        </h1>
        <p class="studio-lede m-0 lg:pb-1">A collection of my recent work and contributions to the tech community—products, interface studies, and systems built to answer a specific need.</p>
      </header>

      <section class="mt-12 grid gap-x-6 gap-y-20 sm:mt-16 lg:grid-cols-2" aria-label="Selected projects">
        <article class="group lg:col-span-2 lg:grid lg:grid-cols-[minmax(0,1.38fr)_minmax(17.5rem,.62fr)] lg:items-end lg:gap-10">
          <component :is="projects[0].external ? 'a' : NuxtLink" :href="projects[0].external ? projects[0].link : undefined" :to="projects[0].external ? undefined : projects[0].link" :target="projects[0].external ? '_blank' : undefined" :rel="projects[0].external ? 'noopener noreferrer' : undefined" class="studio-focus block overflow-hidden bg-surface-elevated dark:bg-surface-elevated-dark" :aria-label="`Open ${projects[0].title}`">
            <picture class="block">
              <source media="(prefers-color-scheme: dark)" :srcset="projects[0].imageDark" />
              <img :src="projects[0].image" :alt="projects[0].imageAlt" width="2858" height="1754" class="h-[19rem] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transition-none sm:h-[28rem] lg:h-[32rem]" />
            </picture>
          </component>
          <ProjectDetails :project="projects[0]" featured />
        </article>

        <article v-for="project in projects.slice(1)" :key="project.title" class="group min-w-0">
          <component :is="project.external ? 'a' : NuxtLink" :href="project.external ? project.link : undefined" :to="project.external ? undefined : project.link" :target="project.external ? '_blank' : undefined" :rel="project.external ? 'noopener noreferrer' : undefined" class="studio-focus block overflow-hidden bg-surface-elevated dark:bg-surface-elevated-dark" :aria-label="`Open ${project.title}`">
            <img :src="project.image" :alt="project.imageAlt" class="h-[18rem] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transition-none sm:h-[22rem]" />
          </component>
          <ProjectDetails :project="project" />
        </article>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NuxtLink } from '#components'
import ProjectDetails from '~/components/ui/ProjectDetails.vue'

const projects = [
  {
    title: 'Yata — AI Translation App',
    description: 'A focused, keyboard-first translation app with fast and thoughtful AI modes, resilient request handling, and privacy-conscious Cloudflare infrastructure.',
    link: 'https://yata.to/',
    tags: ['SvelteKit', 'Cloudflare Workers', 'Workers AI', 'Gemini', 'TypeScript'],
    status: 'Closed beta',
    external: true,
    image: '/images/blog/yata-light.png',
    imageDark: '/images/blog/yata-dark.png',
    imageAlt: 'Yata translating English text into Ukrainian',
  },
  {
    title: 'YAFFW — Browser-Native Video Editor',
    description: 'A video editing workbench that processes media directly in the browser, combining precise trimming, audio visualization, and export workflows without server-side processing.',
    link: 'https://github.com/DarkZeus/yaffw',
    tags: ['React', 'TanStack', 'Hono', 'FFmpeg', 'TypeScript'],
    status: 'In progress',
    external: true,
    image: '/images/yaffw-browser-video-editor.png',
    imageAlt: 'YAFFW browser-native video editor with a media preview and editing timeline',
  },
  {
    title: 'Personal Portfolio',
    description: 'A responsive portfolio built with Vue.js and Nuxt to present engineering evidence and technical writing.',
    link: '/',
    tags: ['Nuxt', 'Tailwind CSS', 'TypeScript', 'Motion'],
    status: '',
    external: false,
    image: '/images/personal-website.png',
    imageAlt: 'Serhii Resnianskyi personal portfolio',
  },
] as const
</script>
