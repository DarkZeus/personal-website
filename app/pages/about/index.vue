<template>
  <div class="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-[0.02] pointer-events-none" aria-hidden="true"></div>
  <div class="absolute top-1/4 right-0 w-64 h-64 rounded-full bg-primary/5 blur-3xl pointer-events-none" aria-hidden="true"></div>

  <div>
    <HeroSection class="py-24" role="banner">
      
      <template #title>About Me</template>
      <template #description>
        A passionate developer with a focus on creating beautiful, functional, and user-friendly applications.
      </template>
    </HeroSection>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <!-- Quick Overview Bento Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <!-- Card 1 -->
        <div class="bg-surface rounded-2xl shadow-card p-8 flex flex-col items-start gap-4">
          <CodeBracketIcon class="w-7 h-7 text-primary" />
          <h3 class="text-2xl font-semibold text-text">Frontend Expert</h3>
          <p class="text-text-light text-base">7+ years of experience with React and Vue ecosystems.</p>
        </div>
        <!-- Card 2 -->
        <div class="bg-surface rounded-2xl shadow-card p-8 flex flex-col items-start gap-4">
          <BoltIcon class="w-7 h-7 text-primary" />
          <h3 class="text-2xl font-semibold text-text">Performance Focus</h3>
          <p class="text-text-light text-base">Building fast, responsive, and scalable applications.</p>
        </div>
        <!-- Card 3 -->
        <div class="bg-surface rounded-2xl shadow-card p-8 flex flex-col items-start gap-4">
          <UsersIcon class="w-7 h-7 text-primary" />
          <h3 class="text-2xl font-semibold text-text">Team Player</h3>
          <p class="text-text-light text-base">Strong communication and collaboration skills.</p>
        </div>
        <!-- Card 4 -->
        <div class="bg-surface rounded-2xl shadow-card p-8 flex flex-col items-start gap-4">
          <PuzzlePieceIcon class="w-7 h-7 text-primary" />
          <h3 class="text-2xl font-semibold text-text">Problem Solver</h3>
          <p class="text-text-light text-base">Architecting efficient and maintainable solutions.</p>
        </div>
      </div>

      <!-- About Content -->
      <section class="py-12 relative overflow-hidden" role="main" aria-label="About content">        
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
                Performance-focused Frontend Developer with 7+ years of expertise across React and Vue ecosystems. Proven track record of building responsive, user-friendly web applications while enhancing developer experience through thoughtful code quality improvements and architectural advancements.
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
                    <SkillTag class="text-pretty" role="listitem">
                      <template #content>JavaScript (ES6+)</template>
                    </SkillTag>
                    <SkillTag class="text-pretty" role="listitem">
                      <template #content>TypeScript</template>
                    </SkillTag>
                    <SkillTag class="text-pretty" role="listitem">
                      <template #content>HTML5</template>
                    </SkillTag>
                    <SkillTag class="text-pretty" role="listitem">
                      <template #content>CSS3/SCSS/BEM</template>
                    </SkillTag>
                  </div>
                </div>
                <div>
                  <h3 class="text-xl font-semibold text-text mb-4 text-balance">Frontend Frameworks</h3>
                  <div class="flex flex-wrap gap-2" role="list" aria-label="Frontend Framework skills">
                    <SkillTag role="listitem">
                      <template #content>React</template>
                    </SkillTag>
                    <SkillTag role="listitem">
                      <template #content>Redux (RTK)</template>
                    </SkillTag>
                    <SkillTag role="listitem">
                      <template #content>Vue.js 2/3</template>
                    </SkillTag>
                    <SkillTag role="listitem">
                      <template #content>Nuxt</template>
                    </SkillTag>
                    <SkillTag role="listitem">
                      <template #content>Pinia</template>
                    </SkillTag>
                    <SkillTag role="listitem">
                      <template #content>Vue Router</template>
                    </SkillTag>
                    <SkillTag role="listitem">
                      <template #content>Zustand</template>
                    </SkillTag>
                    <SkillTag role="listitem">
                      <template #content>TanStack</template>
                    </SkillTag>
                  </div>
                </div>
                <div>
                  <h3 class="text-xl font-semibold text-text mb-4 text-balance">UI Libraries & Design</h3>
                  <div class="flex flex-wrap gap-2" role="list" aria-label="UI Libraries and Design skills">
                    <SkillTag role="listitem">
                      <template #content>Material UI</template>
                    </SkillTag>
                    <SkillTag role="listitem">
                      <template #content>TailwindCSS</template>
                    </SkillTag>
                    <SkillTag role="listitem">
                      <template #content>Shadcn/UI</template>
                    </SkillTag>
                    <SkillTag role="listitem">
                      <template #content>Chakra UI</template>
                    </SkillTag>
                  </div>
                </div>
                <div>
                  <h3 class="text-xl font-semibold text-text mb-4 text-balance">Backend & Databases</h3>
                  <div class="flex flex-wrap gap-2" role="list" aria-label="Backend and Database skills">
                    <SkillTag role="listitem">
                      <template #content>PHP (Laravel)</template>
                    </SkillTag>
                    <SkillTag role="listitem">
                      <template #content>Python</template>
                    </SkillTag>
                    <SkillTag role="listitem">
                      <template #content>PostgreSQL</template>
                    </SkillTag>
                    <SkillTag role="listitem">
                      <template #content>MySQL</template>
                    </SkillTag>
                    <SkillTag role="listitem">
                      <template #content>SQLite</template>
                    </SkillTag>
                    <SkillTag role="listitem">
                      <template #content>IndexedDB</template>
                    </SkillTag>
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
                      <SkillTag role="listitem">React</SkillTag>
                      <SkillTag role="listitem">Redux</SkillTag>
                      <SkillTag role="listitem">SCSS</SkillTag>
                      <SkillTag role="listitem">Material UI</SkillTag>
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
                <div>
                  <h3 class="text-xl font-semibold text-text">National University of Kyiv-Mohyla Academy</h3>
                  <p class="text-text-light">Bachelor's degree, Computer Science</p>
                  <p class="text-sm text-text-light/80">2014 – 2018</p>
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
import { CodeBracketIcon, BoltIcon, UsersIcon, PuzzlePieceIcon } from '@heroicons/vue/24/outline'
</script> 