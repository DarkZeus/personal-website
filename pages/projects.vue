<template>
  <div>
    <HeroSection>
      <template #title>My Projects</template>
      <template #description>
        A collection of my recent work and contributions to the tech community.
      </template>
    </HeroSection>

    <!-- Projects Grid -->
    <section class="py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Filters -->
        <div class="flex flex-wrap gap-4 mb-12">
          <button class="group relative px-4 py-2 rounded-md text-white overflow-hidden">
            <span class="relative z-10">All Projects</span>
            <div class="absolute inset-0 bg-primary opacity-100 group-hover:opacity-90 transition-opacity duration-300"></div>
            <div class="absolute inset-0 bg-gradient-to-r from-primary-dark to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          <button class="group relative px-4 py-2 rounded-md text-text-light overflow-hidden">
            <span class="relative z-10">Web Development</span>
            <div class="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          <button class="group relative px-4 py-2 rounded-md text-text-light overflow-hidden">
            <span class="relative z-10">Mobile Apps</span>
            <div class="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          <button class="group relative px-4 py-2 rounded-md text-text-light overflow-hidden">
            <span class="relative z-10">Open Source</span>
            <div class="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>

        <!-- Projects Grid -->
        <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <ProjectCard
            title="E-commerce Platform"
            description="A full-featured e-commerce platform with real-time inventory management and payment processing."
            link="#"
            :tags="['Vue.js', 'Node.js', 'MongoDB']"
          />
          <ProjectCard
            title="Task Management App"
            description="A collaborative task management application with real-time updates and team features."
            link="#"
            :tags="['React', 'Firebase', 'Redux']"
          />
          <ProjectCard
            title="Weather Dashboard"
            description="A weather dashboard that displays real-time weather data and forecasts."
            link="#"
            :tags="['Vue.js', 'OpenWeather API', 'Chart.js']"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import HeroSection from '~/components/sections/HeroSection.vue'
import ProjectCard from '~/components/ui/ProjectCard.vue'
</script>