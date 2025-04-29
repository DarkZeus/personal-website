<template>
  <div>
    <HeroSection class="min-h-screen flex flex-1 items-center justify-center relative" role="banner">
      <template #title>About Me</template>
      <template #description>
        A passionate developer with a focus on creating beautiful, functional, and user-friendly applications.
      </template>
      
      <template #scroll-indicator>
        <div class="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce" aria-label="Scroll down indicator" role="presentation">
          <span class="text-text-light text-sm">Scroll to explore</span>
          <svg class="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </template>
    </HeroSection>

    <!-- About Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <section class="py-24 relative overflow-hidden" role="main" aria-label="About content">
        <!-- Decorative elements -->
        <div class="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-[0.02]" aria-hidden="true"></div>
        <div class="absolute top-1/4 right-0 w-64 h-64 rounded-full bg-primary/5 blur-3xl" aria-hidden="true"></div>
        
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div class="grid gap-16 lg:grid-cols-2">
            <!-- Left Column -->
            <div class="space-y-8" role="complementary" aria-label="Personal information">
              <div class="bg-surface rounded-lg shadow-card p-8 relative overflow-hidden">
                <!-- Decorative corner -->
                <div class="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-bl-full" aria-hidden="true"></div>
                <h2 class="text-3xl font-display font-semibold text-text mb-6 text-balance relative inline-block" id="about-me">
                  Who I Am
                  <span class="absolute -bottom-2 left-0 w-16 h-0.5 bg-primary/20" aria-hidden="true"></span>
                </h2>
                <p class="text-lg text-text-light leading-relaxed text-pretty" aria-labelledby="about-me">
                  Detail-oriented Frontend Developer with 7+ years of experience across JavaScript frameworks and technologies.
                  Proven expertise in building responsive, user-friendly web applications with React and Vue ecosystems.
                  Skilled in optimizing performance, solving complex technical challenges, and enhancing developer experience
                  through code quality improvements. Combines technical versatility with a commitment to continuous learning
                  and professional growth.
                </p>
              </div>

              <div class="bg-surface rounded-lg shadow-card p-8 relative overflow-hidden">
                <!-- Decorative corner -->
                <div class="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-bl-full"></div>
                <h2 class="text-3xl font-display font-semibold text-text mb-6 text-balance relative inline-block">
                  My Skills
                  <span class="absolute -bottom-2 left-0 w-16 h-0.5 bg-primary/20"></span>
                </h2>
                <div class="space-y-6">
                  <div>
                    <h3 class="text-xl font-semibold text-text mb-4 text-balance">Frontend Development</h3>
                    <div class="flex flex-wrap gap-2" role="list" aria-label="Frontend Development skills">
                      <skill-tag class="text-pretty" role="listitem">JavaScript (ES6+)</skill-tag>
                      <skill-tag class="text-pretty" role="listitem">TypeScript</skill-tag>
                      <skill-tag class="text-pretty" role="listitem">HTML5</skill-tag>
                      <skill-tag class="text-pretty" role="listitem">CSS3/SCSS/BEM</skill-tag>
                    </div>
                  </div>
                  <div>
                    <h3 class="text-xl font-semibold text-text mb-4 text-balance">Frontend Frameworks</h3>
                    <div class="flex flex-wrap gap-2" role="list" aria-label="Frontend Framework skills">
                      <skill-tag role="listitem">React</skill-tag>
                      <skill-tag role="listitem">Redux (RTK)</skill-tag>
                      <skill-tag role="listitem">Vue.js 2/3</skill-tag>
                      <skill-tag role="listitem">Nuxt</skill-tag>
                      <skill-tag role="listitem">Pinia</skill-tag>
                      <skill-tag role="listitem">Vue Router</skill-tag>
                      <skill-tag role="listitem">Zustand</skill-tag>
                      <skill-tag role="listitem">TanStack</skill-tag>
                    </div>
                  </div>
                  <div>
                    <h3 class="text-xl font-semibold text-text mb-4 text-balance">UI Libraries & Design</h3>
                    <div class="flex flex-wrap gap-2" role="list" aria-label="UI Libraries and Design skills">
                      <skill-tag role="listitem">Material UI</skill-tag>
                      <skill-tag role="listitem">TailwindCSS</skill-tag>
                      <skill-tag role="listitem">Shadcn/UI</skill-tag>
                      <skill-tag role="listitem">Chakra UI</skill-tag>
                    </div>
                  </div>
                  <div>
                    <h3 class="text-xl font-semibold text-text mb-4 text-balance">Backend & Databases</h3>
                    <div class="flex flex-wrap gap-2" role="list" aria-label="Backend and Database skills">
                      <skill-tag role="listitem">PHP (Laravel)</skill-tag>
                      <skill-tag role="listitem">Python</skill-tag>
                      <skill-tag role="listitem">PostgreSQL</skill-tag>
                      <skill-tag role="listitem">MySQL</skill-tag>
                      <skill-tag role="listitem">SQLite</skill-tag>
                      <skill-tag role="listitem">IndexedDB</skill-tag>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Column -->
            <div class="space-y-8" role="complementary" aria-label="Professional experience">
              <div class="bg-surface rounded-lg shadow-card p-8 relative overflow-hidden">
                <!-- Decorative corner -->
                <div class="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-bl-full" aria-hidden="true"></div>
                <h2 class="text-3xl font-display font-semibold text-text mb-6 text-balance relative inline-block" id="experience">
                  Experience
                  <span class="absolute -bottom-2 left-0 w-16 h-0.5 bg-primary/20" aria-hidden="true"></span>
                </h2>
                <div class="space-y-8" role="list" aria-labelledby="experience">
                  <div class="relative pl-8" role="listitem">
                    <div class="absolute left-0 top-0 w-2 h-2 rounded-sm bg-primary" aria-hidden="true"></div>
                    <div class="absolute left-1 top-2 bottom-0 w-px bg-primary/20" aria-hidden="true"></div>
                    <div>
                      <h3 class="text-xl font-semibold text-text text-balance">Middle Software Engineer (Web & Mobile)</h3>
                      <p class="text-text-light text-pretty">LeverX, Kyiv</p>
                      <p class="text-sm text-text-light/80 text-pretty">Oct 2021 – Dec 2024 (3 years, 2 months)</p>
                      <ul class="mt-4 space-y-2 text-text-light" role="list" aria-label="Key responsibilities and achievements">
                        <li class="flex items-start gap-2 text-pretty">
                          <span class="text-primary">•</span>
                          Implemented client-side filtering and pagination for data visualization components
                        </li>
                        <li class="flex items-start gap-2 text-pretty">
                          <span class="text-primary">•</span>
                          Researched and implemented offline-first architecture using IndexedDB
                        </li>
                        <li class="flex items-start gap-2 text-pretty">
                          <span class="text-primary">•</span>
                          Optimized data visualization components for large datasets
                        </li>
                        <li class="flex items-start gap-2 text-pretty">
                          <span class="text-primary">•</span>
                          Contributed to major architectural improvements and migrations
                        </li>
                      </ul>
                      <div class="mt-4 flex flex-wrap gap-2" role="list" aria-label="Technologies used">
                        <skill-tag role="listitem">React</skill-tag>
                        <skill-tag role="listitem">Redux</skill-tag>
                        <skill-tag role="listitem">SCSS</skill-tag>
                        <skill-tag role="listitem">Material UI</skill-tag>
                      </div>
                    </div>
                  </div>

                  <div class="relative pl-8">
                    <div class="absolute left-0 top-0 w-2 h-2 rounded-sm bg-primary"></div>
                    <div class="absolute left-1 top-2 bottom-0 w-px bg-primary/20"></div>
                    <div>
                      <h3 class="text-xl font-semibold text-text">Web Developer</h3>
                      <p class="text-text-light">PJSC Chernihivoblenergo</p>
                      <p class="text-sm text-text-light/80">Dec 2018 – Sep 2021 (2 years, 9 months)</p>
                      <p class="mt-4 text-text-light">Played a pivotal role in developing a suite of corporate web services, streamlining HR operations, inventory management, and event coordination.</p>
                      <div class="mt-4 flex flex-wrap gap-2" role="list" aria-label="Technologies used">
                        <span class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary" role="listitem">Laravel</span>
                        <span class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary" role="listitem">Vue 2</span>
                        <span class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary" role="listitem">PostgreSQL</span>
                        <span class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary" role="listitem">MySQL</span>
                      </div>
                    </div>
                  </div>

                  <div class="relative pl-8">
                    <div class="absolute left-0 top-0 w-2 h-2 rounded-sm bg-primary"></div>
                    <div>
                      <h3 class="text-xl font-semibold text-text">Web Developer</h3>
                      <p class="text-text-light">Freelance</p>
                      <p class="text-sm text-text-light/80">Jan 2017 – Aug 2018 (1 year, 8 months)</p>
                      <p class="mt-4 text-text-light">Handled frontend development across diverse projects, focusing on user engagement and interface aesthetics.</p>
                      <div class="mt-4 flex flex-wrap gap-2" role="list" aria-label="Technologies used">
                        <span class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary" role="listitem">HTML/CSS</span>
                        <span class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary" role="listitem">JavaScript</span>
                        <span class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary" role="listitem">jQuery</span>
                        <span class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary" role="listitem">Vue 2</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="bg-surface rounded-lg shadow-card p-8 relative overflow-hidden">
                <!-- Decorative corner -->
                <div class="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-bl-full"></div>
                <h2 class="text-3xl font-display font-semibold text-text mb-6 text-balance relative inline-block">
                  Education
                  <span class="absolute -bottom-2 left-0 w-16 h-0.5 bg-primary/20"></span>
                </h2>
                <div class="flex items-start gap-4" role="list" aria-label="Education details">
                  <div class="w-12 h-12 min-w-12 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                    <svg class="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    </svg>
                  </div>
                  <div role="listitem">
                    <h3 class="text-xl font-semibold text-text text-balance">Bachelor's Degree in Mathematical Modeling and Cybersecurity</h3>
                    <p class="text-text-light text-pretty">Chernihiv Polytechnic National University, Ukraine</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import HeroSection from '~/components/sections/hero-section.vue'
import SkillTag from '~/components/ui/skill-tag.vue'
</script>