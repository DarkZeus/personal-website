<template>
  <div>
    <!-- Hero Section -->
    <section class="relative min-h-[80vh] flex items-center overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent -z-10"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div class="text-center">
          <h1 class="text-5xl font-display font-semibold text-text sm:text-6xl md:text-7xl">
            <span class="block">Hi, I'm</span>
            <span class="block text-primary mt-2">Serhii Resnianskyi</span>
          </h1>
          <p class="mt-6 max-w-2xl mx-auto text-lg text-text-light sm:text-xl">
            A detail-oriented Frontend Developer with 7+ years of experience, specializing in building responsive, user-friendly web applications with React and Vue ecosystems.
          </p>
          <div class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <NuxtLink 
              to="/contact" 
              class="group relative px-8 py-3 text-base font-medium rounded-md text-white overflow-hidden"
            >
              <span class="relative z-10">Get in touch</span>
              <div class="absolute inset-0 bg-primary opacity-100 group-hover:opacity-90 transition-opacity duration-300"></div>
              <div class="absolute inset-0 bg-gradient-to-r from-primary-dark to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </NuxtLink>
            <NuxtLink 
              to="/about" 
              class="group relative px-8 py-3 text-base font-medium rounded-md text-primary overflow-hidden"
            >
              <span class="relative z-10">Learn more</span>
              <div class="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- What I Do Section -->
    <section class="py-24 bg-surface/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-4xl font-display font-semibold text-text">What I Do</h2>
          <p class="mt-4 text-lg text-text-light">Building modern web applications with a focus on performance and user experience</p>
        </div>
        <div class="mt-16 grid gap-8 md:grid-cols-3">
          <div class="group bg-surface rounded-lg shadow-card hover:shadow-glass transition-all duration-300 p-6">
            <h3 class="text-xl font-semibold text-text">Frontend Development</h3>
            <p class="mt-4 text-text-light">Creating responsive and interactive user interfaces using modern JavaScript frameworks and libraries.</p>
          </div>
          <div class="group bg-surface rounded-lg shadow-card hover:shadow-glass transition-all duration-300 p-6">
            <h3 class="text-xl font-semibold text-text">Performance Optimization</h3>
            <p class="mt-4 text-text-light">Ensuring fast and efficient applications through optimized data handling and smooth interactions.</p>
          </div>
          <div class="group bg-surface rounded-lg shadow-card hover:shadow-glass transition-all duration-300 p-6">
            <h3 class="text-xl font-semibold text-text">Architecture & Scalability</h3>
            <p class="mt-4 text-text-light">Designing maintainable and scalable applications with clean code and solid architecture.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Let's Work Together -->
    <section class="py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-4xl font-display font-semibold text-text">Let's Work Together</h2>
          <p class="mt-4 text-lg text-text-light">Have a project in mind? I'd love to hear about it.</p>
          <div class="mt-8">
            <NuxtLink 
              to="/contact" 
              class="group relative inline-flex px-8 py-3 text-base font-medium rounded-md text-white overflow-hidden"
            >
              <span class="relative z-10">Start a Conversation</span>
              <div class="absolute inset-0 bg-primary opacity-100 group-hover:opacity-90 transition-opacity duration-300"></div>
              <div class="absolute inset-0 bg-gradient-to-r from-primary-dark to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template> 