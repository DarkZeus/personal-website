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
              :image="project.image"
              :badges="project.badges"
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
    title: "YAFFW - Yet Another FFmpeg Wrapper",
    description: "A simple, browser-based video editor built with React and FFmpeg. Trim, convert (TBD), and concatenate (TBD) videos with an intuitive interface and keyboard shortcuts.",
    link: "https://github.com/DarkZeus/yaffw",
    tags: ['React', 'TanStack', 'Hono', 'FFmpeg', 'Tailwind CSS', 'TypeScript', 'Shadcn/UI',],
    image: "https://raw.githubusercontent.com/DarkZeus/yaffw/refs/heads/master/public/image.png",
    badges: [
      {
        text: "Personal Project",
        color: "bg-green-500/10 text-green-500 border-green-500"
      },
      {
        text: "In progress",
        color: "bg-blue-500/10 text-blue-500 border-blue-500"
      }
    ]
  },
  {
    title: "Playstation 5 Web Dashboard",
    description: "A web-based recreation of the PlayStation 5's user interface dashboard design. Built with modern web technologies to deliver a smooth, interactive experience.",
    link: "https://playstation-dashboard.pages.dev/",
    tags: ['Vue.js', 'Nuxt', 'Tailwind CSS', 'TypeScript', 'Motion',],
    image: "/images/playstation-dashboard.jpg",
    badges: [
      {
        text: "Research Pet Project",
        color: "bg-purple-500/10 text-purple-500 border-purple-500"
      },
      {
        text: "In progress",
        color: "bg-blue-500/10 text-blue-500 border-blue-500"
      }
    ]
  },
  {
    title: "Personal Portfolio",
    description: "A modern, responsive portfolio website showcasing my work and skills, built with Vue.js and Nuxt.",
    link: "https://fuad.work/",
    tags: ['Vue.js', 'Nuxt', 'Tailwind CSS', 'TypeScript', 'Motion'],
    image: "/images/personal-website.png"
  },
  // {
  //   title: "Psychochauffer Bot WebUI",
  //   description: "A full-featured dashboard for all-purpose Telegram bot with per-chat real-time monitoring, config edit, and analytics.",
  //   link: "#",
  //   tags: ['React', 'TanStack (Router, Query, Table)', 'Shadcn/UI']
  // },
]
</script> 