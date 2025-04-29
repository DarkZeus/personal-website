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
          <!-- Filters -->
          <div class="flex flex-wrap gap-4 mb-12" role="tablist" aria-label="Project categories">
            <button 
              class="group relative px-4 py-2 rounded-md text-white overflow-hidden"
              role="tab"
              aria-selected="true"
              aria-controls="all-projects"
            >
              <span class="relative z-10 text-pretty">All Projects</span>
              <div class="absolute inset-0 bg-primary opacity-100 group-hover:opacity-90 transition-opacity duration-300"></div>
              <div class="absolute inset-0 bg-gradient-to-r from-primary-dark to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <!-- Button decoration -->
              <div class="absolute -right-1 -top-1 w-2 h-2 rounded-full bg-white/20" aria-hidden="true"></div>
              <div class="absolute -left-1 -bottom-1 w-2 h-2 rounded-full bg-white/20" aria-hidden="true"></div>
            </button>
            <button 
              class="group relative px-4 py-2 rounded-md text-text-light overflow-hidden"
              role="tab"
              aria-selected="false"
              aria-controls="web-projects"
            >
              <span class="relative z-10 text-pretty">Web Development</span>
              <div class="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <!-- Button decoration -->
              <div class="absolute -right-1 -top-1 w-2 h-2 rounded-full bg-primary/20" aria-hidden="true"></div>
              <div class="absolute -left-1 -bottom-1 w-2 h-2 rounded-full bg-primary/20" aria-hidden="true"></div>
            </button>
            <button 
              class="group relative px-4 py-2 rounded-md text-text-light overflow-hidden"
              role="tab"
              aria-selected="false"
              aria-controls="mobile-projects"
            >
              <span class="relative z-10 text-pretty">Mobile Apps</span>
              <div class="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <!-- Button decoration -->
              <div class="absolute -right-1 -top-1 w-2 h-2 rounded-full bg-primary/20" aria-hidden="true"></div>
              <div class="absolute -left-1 -bottom-1 w-2 h-2 rounded-full bg-primary/20" aria-hidden="true"></div>
            </button>
            <button 
              class="group relative px-4 py-2 rounded-md text-text-light overflow-hidden"
              role="tab"
              aria-selected="false"
              aria-controls="open-source-projects"
            >
              <span class="relative z-10 text-pretty">Open Source</span>
              <div class="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <!-- Button decoration -->
              <div class="absolute -right-1 -top-1 w-2 h-2 rounded-full bg-primary/20" aria-hidden="true"></div>
              <div class="absolute -left-1 -bottom-1 w-2 h-2 rounded-full bg-primary/20" aria-hidden="true"></div>
            </button>
          </div>

          <!-- Projects Grid -->
          <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3" role="region" aria-label="Projects list">
            <ProjectCard
              title="E-commerce Platform"
              description="A full-featured e-commerce platform with real-time inventory management and payment processing."
              link="#"
              :tags="['Vue.js', 'Node.js', 'MongoDB']"
              class="text-pretty"
            />
            <ProjectCard
              title="Task Management App"
              description="A collaborative task management application with real-time updates and team features."
              link="#"
              :tags="['React', 'Firebase', 'Redux']"
              class="text-pretty"
            />
            <ProjectCard
              title="Weather Dashboard"
              description="A weather dashboard that displays real-time weather data and forecasts."
              link="#"
              :tags="['Vue.js', 'OpenWeather API', 'Chart.js']"
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
</script>