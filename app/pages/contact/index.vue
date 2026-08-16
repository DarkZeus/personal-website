<template>
  <div class="studio-page pb-20 pt-28 sm:pb-28 sm:pt-32">
    <div class="studio-circle -bottom-60 -left-72 h-[40rem] w-[40rem]" aria-hidden="true"></div>

    <div class="studio-shell relative">
      <section class="grid items-end gap-10 py-10 lg:grid-cols-[.82fr_1.18fr] lg:gap-24 lg:py-16" aria-labelledby="contact-heading">
        <h1 id="contact-heading" class="studio-page-title">
          Let’s
          <span class="studio-page-title-accent">talk</span>
        </h1>

        <div>
          <div class="mb-5 inline-flex items-center gap-2 rounded-full border border-[#15804c]/25 bg-[#22c55e]/[0.08] px-3 py-1.5 text-xs font-semibold text-[#12663d] dark:border-[#58d68d]/30 dark:bg-[#22c55e]/10 dark:text-[#7ee2a8]" role="status" aria-label="Availability status: Available for work">
            <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-[#169653] motion-reduce:animate-none dark:bg-[#66d898]" aria-hidden="true"></span>
            Available for work
          </div>
          <p class="studio-lede m-0 text-lg">Have a question or want to work together? I’d love to hear from you.</p>

          <a href="mailto:serhii.resnyanskyi@gmail.com" class="studio-focus studio-press-row group mt-7 grid grid-cols-[4.75rem_minmax(0,1fr)_1.25rem] items-center gap-4 border-y studio-rule py-5">
            <span class="studio-label">Email</span>
            <span class="min-w-0 break-words text-[clamp(1rem,1.5vw,1.25rem)] font-semibold tracking-[-0.02em] text-primary dark:text-primary-light">serhii.resnyanskyi@gmail.com</span>
            <ArrowRightIcon class="h-4 w-4 text-primary transition-transform duration-150 group-hover:translate-x-1 motion-reduce:transition-none dark:text-primary-light" aria-hidden="true" />
          </a>

          <div class="grid sm:grid-cols-3">
            <a class="studio-focus studio-press-row group block pt-5 sm:pr-5" href="https://t.me/fuad_first" target="_blank" rel="noopener noreferrer">
              <span class="studio-label block">Telegram</span>
              <span class="mt-2 block text-[15px] font-semibold text-text transition-colors duration-150 group-hover:text-primary dark:text-text-dark dark:group-hover:text-primary-light">@fuad_first</span>
            </a>
            <a class="studio-focus studio-press-row group block pt-5 sm:border-l sm:px-5 studio-rule" href="https://linkedin.com/in/serhii-resnianskyi" target="_blank" rel="noopener noreferrer">
              <span class="studio-label block">LinkedIn</span>
              <span class="mt-2 block text-[15px] font-semibold text-text transition-colors duration-150 group-hover:text-primary dark:text-text-dark dark:group-hover:text-primary-light">Serhii Resnianskyi</span>
            </a>
            <div class="pt-5 sm:border-l sm:pl-5 studio-rule">
              <span class="studio-label block">Location</span>
              <span class="mt-2 block text-[15px] font-semibold text-text dark:text-text-dark">Chernihiv, Ukraine</span>
            </div>
          </div>
        </div>
      </section>

      <section class="mt-24 border-y studio-rule" aria-labelledby="contact-work-heading">
        <div class="grid lg:grid-cols-[.7fr_1fr_1fr]">
          <h2 id="contact-work-heading" class="m-0 py-10 text-[29px] font-medium tracking-[-0.03em] text-text dark:text-text-dark lg:pr-8">Work worth discussing</h2>
          <div v-for="column in workColumns" :key="column.title" class="border-t studio-rule py-10 lg:border-l lg:border-t-0 lg:px-8">
            <h3 class="m-0 text-lg font-semibold text-text dark:text-text-dark">{{ column.title }}</h3>
            <ul class="mt-5 space-y-3 p-0">
              <li v-for="item in column.items" :key="item" class="relative pl-5 text-sm leading-relaxed text-text-light dark:text-text-light-dark">
                <span class="absolute left-0 top-[.65em] h-1.5 w-1.5 rounded-full bg-primary dark:bg-primary-light" aria-hidden="true"></span>
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </section>

      <div class="flex flex-col gap-7 pt-16 sm:flex-row sm:items-center sm:justify-between">
        <p class="m-0 text-text-light dark:text-text-light-dark">I usually respond by email or Telegram.</p>
        <UiButton as="a" href="mailto:serhii.resnyanskyi@gmail.com" variant="primary">
          Start a conversation
          <ArrowRightIcon class="h-4 w-4" aria-hidden="true" />
        </UiButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowRightIcon } from '@heroicons/vue/24/outline'
import UiButton from '~/components/ui/UiButton.vue'

const workColumns = [
  {
    title: 'What I do',
    items: [
      'Full-stack web development with modern technologies',
      'Performance optimization and scalable architecture design',
      'Cross-functional collaboration and technical mentorship',
    ],
  },
  {
    title: 'What I’m looking for',
    items: [
      'Full-time remote or hybrid positions',
      'Opportunities for growth and learning',
      'Collaborative and innovative team environments',
    ],
  },
] as const
</script>
