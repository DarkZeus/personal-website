<template>
  <div>
    <!-- Hero Section -->
    <section class="relative py-32 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent -z-10"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-5xl font-display font-semibold text-text sm:text-6xl md:text-7xl">
            My Projects
          </h1>
          <p class="mt-6 max-w-2xl mx-auto text-lg text-text-light sm:text-xl">
            A collection of my recent work and contributions to the tech community.
          </p>
        </div>
      </div>
    </section>

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
          <!-- Project 1 -->
          <div class="group bg-surface rounded-lg shadow-card hover:shadow-glass transition-all duration-300 overflow-hidden">
            <div class="aspect-video bg-primary/5"></div>
            <div class="p-6">
              <div class="flex items-center justify-between">
                <h3 class="text-xl font-semibold text-text group-hover:text-primary transition-colors duration-300">E-commerce Platform</h3>
                <a href="#" class="text-text-light hover:text-primary transition-colors duration-300">
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
              <p class="mt-2 text-text-light">A full-featured e-commerce platform with real-time inventory management and payment processing.</p>
              <div class="mt-4 flex flex-wrap gap-2">
                <span class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary">Vue.js</span>
                <span class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary">Node.js</span>
                <span class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary">MongoDB</span>
              </div>
            </div>
          </div>

          <!-- Project 2 -->
          <div class="group bg-surface rounded-lg shadow-card hover:shadow-glass transition-all duration-300 overflow-hidden">
            <div class="aspect-video bg-primary/5"></div>
            <div class="p-6">
              <div class="flex items-center justify-between">
                <h3 class="text-xl font-semibold text-text group-hover:text-primary transition-colors duration-300">Task Management App</h3>
                <a href="#" class="text-text-light hover:text-primary transition-colors duration-300">
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
              <p class="mt-2 text-text-light">A collaborative task management application with real-time updates and team features.</p>
              <div class="mt-4 flex flex-wrap gap-2">
                <span class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary">React</span>
                <span class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary">Firebase</span>
                <span class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary">Redux</span>
              </div>
            </div>
          </div>

          <!-- Project 3 -->
          <div class="group bg-surface rounded-lg shadow-card hover:shadow-glass transition-all duration-300 overflow-hidden">
            <div class="aspect-video bg-primary/5"></div>
            <div class="p-6">
              <div class="flex items-center justify-between">
                <h3 class="text-xl font-semibold text-text group-hover:text-primary transition-colors duration-300">Weather Dashboard</h3>
                <a href="#" class="text-text-light hover:text-primary transition-colors duration-300">
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
              <p class="mt-2 text-text-light">A weather dashboard that displays real-time weather data and forecasts.</p>
              <div class="mt-4 flex flex-wrap gap-2">
                <span class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary">Nuxt</span>
                <span class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary">TailwindCSS</span>
                <span class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary">API</span>
              </div>
            </div>
          </div>

          <!-- Project 4 -->
          <div class="group bg-surface rounded-lg shadow-card hover:shadow-glass transition-all duration-300 overflow-hidden">
            <div class="aspect-video bg-primary/5"></div>
            <div class="p-6">
              <div class="flex items-center justify-between">
                <h3 class="text-xl font-semibold text-text group-hover:text-primary transition-colors duration-300">Social Media Analytics</h3>
                <a href="#" class="text-text-light hover:text-primary transition-colors duration-300">
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
              <p class="mt-2 text-text-light">A dashboard for analyzing social media metrics and engagement.</p>
              <div class="mt-4 flex flex-wrap gap-2">
                <span class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary">Python</span>
                <span class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary">Django</span>
                <span class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary">Chart.js</span>
              </div>
            </div>
          </div>

          <!-- Project 5 -->
          <div class="group bg-surface rounded-lg shadow-card hover:shadow-glass transition-all duration-300 overflow-hidden">
            <div class="aspect-video bg-primary/5"></div>
            <div class="p-6">
              <div class="flex items-center justify-between">
                <h3 class="text-xl font-semibold text-text group-hover:text-primary transition-colors duration-300">Fitness Tracker</h3>
                <a href="#" class="text-text-light hover:text-primary transition-colors duration-300">
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
              <p class="mt-2 text-text-light">A mobile app for tracking workouts and nutrition.</p>
              <div class="mt-4 flex flex-wrap gap-2">
                <span class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary">React Native</span>
                <span class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary">Firebase</span>
                <span class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary">Redux</span>
              </div>
            </div>
          </div>

          <!-- Project 6 -->
          <div class="group bg-surface rounded-lg shadow-card hover:shadow-glass transition-all duration-300 overflow-hidden">
            <div class="aspect-video bg-primary/5"></div>
            <div class="p-6">
              <div class="flex items-center justify-between">
                <h3 class="text-xl font-semibold text-text group-hover:text-primary transition-colors duration-300">AI Image Generator</h3>
                <a href="#" class="text-text-light hover:text-primary transition-colors duration-300">
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
              <p class="mt-2 text-text-light">A web application that generates images using AI models.</p>
              <div class="mt-4 flex flex-wrap gap-2">
                <span class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary">Next.js</span>
                <span class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary">Python</span>
                <span class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary">TensorFlow</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const tags = ['All', 'Vue.js', 'React', 'Node.js', 'Nuxt', 'API', 'Full Stack', 'Frontend', 'Backend']
const selectedTags = ref(['All'])

const toggleTag = (tag) => {
  if (tag === 'All') {
    selectedTags.value = ['All']
  } else {
    const index = selectedTags.value.indexOf(tag)
    if (index === -1) {
      selectedTags.value = selectedTags.value.filter(t => t !== 'All')
      selectedTags.value.push(tag)
    } else {
      selectedTags.value.splice(index, 1)
      if (selectedTags.value.length === 0) {
        selectedTags.value.push('All')
      }
    }
  }
}
</script> 