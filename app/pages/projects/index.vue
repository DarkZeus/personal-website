<template>
  <div>
    <HeroSection>
      <template #title>My Projects</template>
      <template #description>
        A collection of my recent work and contributions to the tech community.
      </template>
    </HeroSection>

    <!-- Projects Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <section class="py-24 relative overflow-hidden">
        <!-- Decorative elements -->
        <div class="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-[0.02]"></div>
        <div class="absolute top-1/4 right-0 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
        <div class="absolute bottom-1/4 left-0 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
        
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <!-- Projects Grid -->
          <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3" role="region" aria-label="Projects list">
            <ProjectCard
              v-for="project in projects"
              :key="project.title"
              :title="project.title"
              :description="project.description"
              :link="project.link"
              :tags="project.tags"
              class="text-pretty"
            />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import HeroSection from '~/components/sections/hero-section.vue'
import ProjectCard from '~/components/ui/project-card.vue'

const projects = [
  {
    title: "Personal Portfolio",
    description: "A modern, responsive portfolio website showcasing my work and skills, built with Vue.js and Nuxt.",
    link: "#",
    tags: ['Vue.js', 'Nuxt', 'Tailwind CSS', 'TypeScript']
  },
  {
    title: "Psychochauffer Bot WebUI",
    description: "A full-featured dashboard for all-purpose Telegram bot with per-chat real-time monitoring, config edit, and analytics.",
    link: "#",
    tags: ['React', 'TanStack (Router, Query, Table)', 'Shadcn/UI']
  },
  {
    title: "Premium Deluxe Motorsport",
    description: "An in-game automotive dealer website",
    link: "#",
    tags: ['HTML/CSS', 'JavaScript']
  },
  {
    title: "Weather Dashboard",
    description: "A weather dashboard that displays real-time weather data and forecasts.",
    link: "#",
    tags: ['Vue.js', 'OpenWeather API', 'Chart.js']
  }
]
</script> 