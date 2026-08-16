<template>
  <div class="studio-page pb-24 pt-28 sm:pb-32 sm:pt-32">
    <div class="studio-circle -right-52 top-24 h-[32rem] w-[32rem]" aria-hidden="true"></div>
    <div class="studio-shell relative">
      <header class="grid items-end gap-10 py-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-24 lg:py-16">
        <h1 class="studio-page-title"><span class="studio-page-title-accent">Links</span></h1>
        <p class="studio-lede m-0 lg:pb-1">The direct routes to my work, professional profiles, email, and résumé.</p>
      </header>

      <section class="mt-12 border-t studio-rule sm:mt-16" aria-label="Featured links">
        <a v-for="link in featuredLinks" :key="link.title" :href="link.url" :target="link.url.startsWith('http') ? '_blank' : undefined" :rel="link.url.startsWith('http') ? 'noopener noreferrer' : undefined" class="studio-focus studio-press-row group grid items-center gap-5 border-b studio-rule py-7 sm:grid-cols-[3rem_10rem_minmax(0,1fr)_2.5rem]">
          <span class="grid h-12 w-12 place-items-center text-primary dark:text-primary-light" aria-hidden="true"><component :is="link.icon" class="h-6 w-6" /></span>
          <h2 class="m-0 text-xl font-semibold text-text transition-colors group-hover:text-primary dark:text-text-dark dark:group-hover:text-primary-light">{{ link.title }}</h2>
          <p class="m-0 text-sm leading-relaxed text-text-light dark:text-text-light-dark">{{ link.description }}</p>
          <ArrowUpRightIcon class="h-5 w-5 text-primary transition-transform duration-150 group-hover:translate-x-1 group-hover:-translate-y-1 motion-reduce:transition-none dark:text-primary-light" aria-hidden="true" />
        </a>
      </section>
    </div>
  </div>
</template>

<script setup>
import { h } from 'vue'
import { ArrowUpRightIcon } from '@heroicons/vue/24/outline'

// Custom icon components using render functions
const GithubIcon = {
  render: () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
    h('path', { d: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' })
  ])
}

const LinkedInIcon = {
  render: () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
    h('path', { d: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' })
  ])
}

const TwitterIcon = {
  render: () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
    h('path', { d: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' })
  ])
}

const EnvelopeIcon = {
  render: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
    h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75' })
  ])
}

const DocumentIcon = {
  render: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
    h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z' })
  ])
}

const featuredLinks = [
  {
    title: 'GitHub',
    description: 'Open source projects and contributions',
    url: 'https://github.com/DarkZeus',
    icon: GithubIcon
  },
  {
    title: 'LinkedIn',
    description: 'Professional network and experience',
    url: 'https://www.linkedin.com/in/serhii-resnianskyi/',
    icon: LinkedInIcon
  },
  {
    title: 'Twitter / X',
    description: 'Thoughts and updates',
    url: 'https://twitter.com/first_fuad',
    icon: TwitterIcon
  },
  {
    title: 'Email',
    description: 'Get in touch directly',
    url: 'mailto:serhii.resnyanskyi@gmail.com',
    icon: EnvelopeIcon
  },
  {
    title: 'Resume / CV',
    description: 'Download my resume',
    url: '/serhii-resnianskyi-cv.pdf',
    icon: DocumentIcon
  },
]
</script>
