<template>
  <div>
    <!-- Hero Section -->
    <section class="relative py-32 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent -z-10"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-5xl font-display font-semibold text-text sm:text-6xl md:text-7xl">
            About Me
          </h1>
          <p class="mt-6 max-w-2xl mx-auto text-lg text-text-light sm:text-xl">
            A passionate developer with a focus on creating beautiful, functional, and user-friendly applications.
          </p>
        </div>
      </div>
    </section>

    <!-- About Content -->
    <section class="py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid gap-16 lg:grid-cols-2">
          <!-- Left Column -->
          <div class="space-y-8">
            <div class="bg-surface rounded-lg shadow-card p-8">
              <h2 class="text-3xl font-display font-semibold text-text mb-6">Who I Am</h2>
              <p class="text-lg text-text-light leading-relaxed">
                Detail-oriented Frontend Developer with 7+ years of experience across JavaScript frameworks and technologies. 
                Proven expertise in building responsive, user-friendly web applications with React and Vue ecosystems. 
                Skilled in optimizing performance, solving complex technical challenges, and enhancing developer experience 
                through code quality improvements. Combines technical versatility with a commitment to continuous learning 
                and professional growth.
              </p>
            </div>

            <div class="bg-surface rounded-lg shadow-card p-8">
              <h2 class="text-3xl font-display font-semibold text-text mb-6">My Skills</h2>
              <div class="space-y-6">
                <div>
                  <h3 class="text-xl font-semibold text-text mb-4">Frontend Development</h3>
                  <div class="flex flex-wrap gap-2">
                    <span class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary">JavaScript (ES6+)</span>
                    <span class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary">TypeScript</span>
                    <span class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary">HTML5</span>
                    <span class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary">CSS3/SCSS/BEM</span>
                  </div>
                </div>
                <div>
                  <h3 class="text-xl font-semibold text-text mb-4">Frontend Frameworks</h3>
                  <div class="flex flex-wrap gap-2">
                    <span class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary">React</span>
                    <span class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary">Redux (RTK)</span>
                    <span class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary">Vue.js 2/3</span>
                    <span class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary">Nuxt</span>
                    <span class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary">Pinia</span>
                    <span class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary">Vue Router</span>
                    <span class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary">Zustand</span>
                    <span class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary">TanStack</span>
                  </div>
                </div>
                <div>
                  <h3 class="text-xl font-semibold text-text mb-4">UI Libraries & Design</h3>
                  <div class="flex flex-wrap gap-2">
                    <span class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary">Material UI</span>
                    <span class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary">TailwindCSS</span>
                    <span class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary">Shadcn/UI</span>
                    <span class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary">Chakra UI</span>
                  </div>
                </div>
                <div>
                  <h3 class="text-xl font-semibold text-text mb-4">Backend & Databases</h3>
                  <div class="flex flex-wrap gap-2">
                    <span class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary">PHP (Laravel)</span>
                    <span class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary">Python</span>
                    <span class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary">PostgreSQL</span>
                    <span class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary">MySQL</span>
                    <span class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary">SQLite</span>
                    <span class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary">IndexedDB</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column -->
          <div class="space-y-8">
            <div class="bg-surface rounded-lg shadow-card p-8">
              <h2 class="text-3xl font-display font-semibold text-text mb-6">Experience</h2>
              <div class="space-y-8">
                <div class="relative pl-8">
                  <div class="absolute left-0 top-0 w-2 h-2 rounded-sm bg-primary"></div>
                  <div class="absolute left-1 top-2 bottom-0 w-px bg-primary/20"></div>
                  <div>
                    <h3 class="text-xl font-semibold text-text">Middle Software Engineer (Web & Mobile)</h3>
                    <p class="text-text-light">LeverX, Kyiv</p>
                    <p class="text-sm text-text-light/80">Oct 2021 – Dec 2024 (3 years, 2 months)</p>
                    <ul class="mt-4 space-y-2 text-text-light">
                      <li class="flex items-start gap-2">
                        <span class="text-primary">•</span>
                        Implemented client-side filtering and pagination for data visualization components
                      </li>
                      <li class="flex items-start gap-2">
                        <span class="text-primary">•</span>
                        Researched and implemented offline-first architecture using IndexedDB
                      </li>
                      <li class="flex items-start gap-2">
                        <span class="text-primary">•</span>
                        Optimized data visualization components for large datasets
                      </li>
                      <li class="flex items-start gap-2">
                        <span class="text-primary">•</span>
                        Contributed to major architectural improvements and migrations
                      </li>
                    </ul>
                    <div class="mt-4 flex flex-wrap gap-2">
                      <span class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary">React</span>
                      <span class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary">Redux</span>
                      <span class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary">SCSS</span>
                      <span class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary">Material UI</span>
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
                    <div class="mt-4 flex flex-wrap gap-2">
                      <span class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary">Laravel</span>
                      <span class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary">Vue 2</span>
                      <span class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary">PostgreSQL</span>
                      <span class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary">MySQL</span>
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
                    <div class="mt-4 flex flex-wrap gap-2">
                      <span class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary">HTML/CSS</span>
                      <span class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary">JavaScript</span>
                      <span class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary">jQuery</span>
                      <span class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary">Vue 2</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-surface rounded-lg shadow-card p-8">
              <h2 class="text-3xl font-display font-semibold text-text mb-6">Education</h2>
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 min-w-12 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-xl font-semibold text-text">Bachelor's Degree in Mathematical Modeling and Cybersecurity</h3>
                  <p class="text-text-light">Chernihiv Polytechnic National University, Ukraine</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template> 