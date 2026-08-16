<template>
  <div class="studio-page pt-28 sm:pt-32">
    <div class="studio-circle -right-48 top-24 h-[34rem] w-[34rem]" aria-hidden="true"></div>

    <div class="studio-shell relative">
      <section aria-labelledby="home-heading" class="grid min-h-[31rem] items-center gap-12 py-10 lg:grid-cols-[1.28fr_.72fr] lg:gap-24 lg:py-16">
        <h1 id="home-heading" class="studio-page-title text-[clamp(4.25rem,6.45vw,6.45rem)]">
          Serhii
          <span class="studio-page-title-accent">Resnianskyi</span>
        </h1>

        <div class="relative lg:pb-2">
          <h2 class="m-0 max-w-[18ch] text-[clamp(1.75rem,2.2vw,2.125rem)] font-medium leading-[1.08] tracking-[-0.035em] text-text dark:text-text-dark">
            I build fast, scalable web products
          </h2>
          <p class="studio-lede mt-7">
            Experienced Software Engineer with {{ experienceYears }} architecting scalable web solutions and leading technical decision-making in complex environments. Expert in
            <strong class="mx-0.5 inline-flex items-center gap-1 rounded-full border border-[#61dafb]/55 bg-[#61dafb]/10 px-2 py-1 align-middle text-sm font-semibold leading-none text-[#08789d] dark:text-[#61dafb]">
              <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="1.45" fill="currentColor" />
                <ellipse cx="12" cy="12" rx="9.25" ry="3.6" stroke="currentColor" stroke-width="1.4" />
                <ellipse cx="12" cy="12" rx="9.25" ry="3.6" stroke="currentColor" stroke-width="1.4" transform="rotate(60 12 12)" />
                <ellipse cx="12" cy="12" rx="9.25" ry="3.6" stroke="currentColor" stroke-width="1.4" transform="rotate(120 12 12)" />
              </svg>
              React
            </strong>
            and
            <strong class="mx-0.5 inline-flex items-center gap-1 rounded-full border border-[#41b883]/55 bg-[#41b883]/10 px-2 py-1 align-middle text-sm font-semibold leading-none text-[#237a57] dark:text-[#42d392]">
              <svg class="h-3.5 w-3.5" viewBox="0 0 24 21" aria-hidden="true">
                <path fill="currentColor" d="M0 0h4.7L12 12.6 19.3 0H24L12 20.8 0 0Z" />
                <path fill="currentColor" fill-opacity=".62" d="M4.7 0h4.1L12 5.5 15.2 0h4.1L12 12.6 4.7 0Z" />
              </svg>
              Vue
            </strong>
            ecosystems.
          </p>

          <div class="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
            <UiButton as="NuxtLink" to="/contact" variant="primary">
              Get in touch
              <ArrowRightIcon class="h-4 w-4" aria-hidden="true" />
            </UiButton>
            <UiButton as="NuxtLink" to="/about" variant="ghost">About me</UiButton>
          </div>
        </div>
      </section>

      <section aria-labelledby="capabilities-heading" class="border-y studio-rule">
        <div class="grid lg:grid-cols-[.78fr_repeat(3,1fr)]">
          <h2 id="capabilities-heading" class="studio-label m-0 py-8 lg:pr-7">What I do</h2>
          <article
            v-for="capability in capabilities"
            :key="capability.title"
            class="border-t studio-rule py-8 lg:border-l lg:border-t-0 lg:px-7"
          >
            <h3 class="m-0 max-w-[14ch] text-xl font-semibold leading-[1.22] tracking-[-0.025em] text-text dark:text-text-dark">
              {{ capability.title }}
            </h3>
            <p class="mt-4 max-w-[34ch] text-[13px] leading-[1.58] text-text-light dark:text-text-light-dark">
              {{ capability.description }}
            </p>
          </article>
        </div>
      </section>

      <section aria-labelledby="home-contact-heading" class="flex flex-col gap-7 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 id="home-contact-heading" class="m-0 text-[29px] font-medium tracking-[-0.03em] text-text dark:text-text-dark">Let’s work together</h2>
          <p class="mt-1.5 text-text-light dark:text-text-light-dark">Have a project in mind? I’d love to hear about it.</p>
        </div>
        <UiButton as="NuxtLink" to="/contact" variant="primary">
          Start a conversation
          <ArrowRightIcon class="h-4 w-4" aria-hidden="true" />
        </UiButton>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowRightIcon } from '@heroicons/vue/24/outline'
import UiButton from '~/components/ui/UiButton.vue'

const { experienceYears } = useAppConfig()

const capabilities = [
  {
    title: 'Frontend Development',
    description: 'Creating responsive and interactive user interfaces using modern JavaScript frameworks and libraries.',
  },
  {
    title: 'Performance Optimization',
    description: 'Ensuring fast and efficient applications through optimized data handling and smooth interactions.',
  },
  {
    title: 'Architecture & Scalability',
    description: 'Designing maintainable and scalable applications with clean code and solid architecture.',
  },
] as const
</script>
