<template>
  <div>
    <!-- Hero Section -->
    <section class="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-16 sm:pt-24">
      <!-- Grid pattern background -->
      <div class="absolute inset-0 bg-grid-pattern opacity-[0.015]"></div>
      
      <!-- Decorative elements -->
      <div class="absolute -top-1/3 -right-1/3 w-[60rem] h-[60rem] rounded-full bg-primary/3 blur-3xl"></div>
      <div class="absolute -bottom-1/3 -left-1/3 w-[60rem] h-[60rem] rounded-full bg-primary/3 blur-3xl"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[45rem] rounded-full bg-primary/3 blur-3xl opacity-50"></div>
      
      <Motion
        as="div"
        :initial="{ opacity: 0, y: 40, filter: 'blur(10px)' }"
        :in-view="{
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
        }"
        :transition="{
          type: 'spring',
          duration: 1,
          bounce: 0,
        }"
      >
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full">
          <div class="text-center relative">
            <h1 class="text-5xl font-display font-semibold text-text sm:text-6xl md:text-7xl text-balance">
              <span class="block">Hi, I'm</span>
              <span class="block text-primary mt-2 relative">
                Serhii Resnianskyi
              </span>
            </h1>
            <p class="mt-6 max-w-2xl mx-auto text-lg text-text-light sm:text-xl leading-relaxed text-pretty">
              A detail-oriented Frontend Developer with 7+ years of experience, specializing in building responsive, user-friendly web applications with React and Vue ecosystems.
            </p>
            <div class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Motion
                as-child
                :initial="{ scale: 1, }"
                :whileHover="{ scale: 1.05, }"
                :whilePress="{ scale: 0.95, }"
                :transition="{
                  type: 'spring',
                  stiffness: 400,
                  damping: 17,
                }"
              >
                <NuxtLink
                  to="/contact"
                  class="group relative px-8 py-3 text-base font-medium rounded-md text-white overflow-hidden"
                >
                  <span class="relative z-10">Get in touch</span>
                  <div class="absolute inset-0 bg-primary opacity-100 group-hover:opacity-90 transition-opacity duration-300"></div>
                  <div class="absolute inset-0 bg-gradient-to-r from-primary-dark to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <!-- Button decoration -->
                  <div class="absolute -right-1 -top-1 w-2 h-2 rounded-full bg-white/20"></div>
                  <div class="absolute -left-1 -bottom-1 w-2 h-2 rounded-full bg-white/20"></div>
                </NuxtLink>
              </Motion>
              <NuxtLink
                to="/about"
                class="group relative px-8 py-3 text-base font-medium rounded-md text-primary overflow-hidden"
              >
                <span class="relative z-10">Learn more</span>
                <div class="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <!-- Button decoration -->
                <div class="absolute -right-1 -top-1 w-2 h-2 rounded-full bg-primary/20"></div>
                <div class="absolute -left-1 -bottom-1 w-2 h-2 rounded-full bg-primary/20"></div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </Motion>
    </section>

    <!-- What I Do Section -->
    <section class="relative overflow-hidden py-40">
      <!-- Gradient overlay for smooth transition -->
      <div class="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-soft-titanium to-transparent"></div>
      <div class="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-soft-titanium to-transparent"></div>
      
      <!-- Grid pattern background -->
      <div class="absolute inset-0 bg-grid-pattern opacity-[0.015]"></div>
      
      <!-- Decorative elements -->
      <div class="absolute -top-1/3 -right-1/3 w-[60rem] h-[60rem] rounded-full bg-primary/3 blur-3xl"></div>
      <div class="absolute top-1/2 right-0 w-[30rem] h-[30rem] rounded-full bg-primary/3 blur-2xl opacity-50"></div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center">
          <h2 class="text-4xl font-display font-semibold text-text text-balance relative inline-block">
            What I Do
            <!-- Decorative line -->
            <span class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-primary/20"></span>
          </h2>
          <p class="mt-4 text-lg text-text-light text-pretty">Building modern web applications with a focus on performance and user experience</p>
        </div>
        <Motion
          as="div"
          class="mt-16 grid gap-8 md:grid-cols-3"
          :initial="{ opacity: 0 }"
          :in-view="{
            opacity: 1,
          }"
          :transition="{
            type: 'spring',
            duration: 1,
            bounce: 0,
          }"
        >
          <Motion
            v-for="(item, index) in [
              {
                title: 'Frontend Development',
                description: 'Creating responsive and interactive user interfaces using modern JavaScript frameworks and libraries.'
              },
              {
                title: 'Performance Optimization',
                description: 'Ensuring fast and efficient applications through optimized data handling and smooth interactions.'
              },
              {
                title: 'Architecture & Scalability',
                description: 'Designing maintainable and scalable applications with clean code and solid architecture.'
              }
            ]"
            :key="item.title"
            :initial="{ opacity: 0, filter: 'blur(10px)' }"
            :in-view="{
              opacity: 1,
              filter: 'blur(0px)',
            }"
            :transition="{
              type: 'spring',
              duration: 1,
              bounce: 0,
              delay: index * 0.2
            }"
            class="group bg-surface rounded-lg shadow-card hover:shadow-glass transition-all duration-300 p-6 relative overflow-hidden"
          >
            <!-- Decorative corner -->
            <div class="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-bl-full"></div>
            <h3 class="text-xl font-semibold text-text relative">{{ item.title }}</h3>
            <p class="mt-4 text-text-light">{{ item.description }}</p>
          </Motion>
        </Motion>
      </div>
    </section>

    <!-- Let's Work Together -->
    <section class="relative overflow-hidden py-40">
      <!-- Gradient overlay for smooth transition -->
      <div class="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-soft-titanium to-transparent"></div>
      <div class="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-soft-titanium to-transparent"></div>
      
      <!-- Grid pattern background -->
      <div class="absolute inset-0 bg-grid-pattern opacity-[0.015]"></div>
      
      <!-- Decorative elements -->
      <div class="absolute -bottom-1/3 -left-1/3 w-[60rem] h-[60rem] rounded-full bg-primary/3 blur-3xl"></div>
      <div class="absolute top-1/2 left-0 w-[30rem] h-[30rem] rounded-full bg-primary/3 blur-2xl opacity-50"></div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center">
          <h2 class="text-4xl font-display font-semibold text-text text-balance relative inline-block">
            Let's Work Together
            <!-- Decorative line -->
            <span class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-primary/20"></span>
          </h2>
          <p class="mt-4 text-lg text-text-light text-pretty">Have a project in mind? I'd love to hear about it.</p>
          <div class="mt-8">
            <NuxtLink
              to="/contact"
              class="group relative inline-flex px-8 py-3 text-base font-medium rounded-md text-white overflow-hidden"
            >
              <span class="relative z-10">Start a Conversation</span>
              <div class="absolute inset-0 bg-primary opacity-100 group-hover:opacity-90 transition-opacity duration-300"></div>
              <div class="absolute inset-0 bg-gradient-to-r from-primary-dark to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <!-- Button decoration -->
              <div class="absolute -right-1 -top-1 w-2 h-2 rounded-full bg-white/20"></div>
              <div class="absolute -left-1 -bottom-1 w-2 h-2 rounded-full bg-white/20"></div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Motion } from "motion-v";
</script>