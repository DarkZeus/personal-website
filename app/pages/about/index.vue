<template>
  <div class="studio-page pt-28 sm:pt-32">
    <div class="studio-circle -right-52 top-24 h-[34rem] w-[34rem]" aria-hidden="true"></div>

    <div class="studio-shell relative">
      <section class="grid items-end gap-10 py-10 lg:grid-cols-[.84fr_1.16fr] lg:gap-24 lg:py-16" aria-labelledby="about-heading">
        <h1 id="about-heading" class="studio-page-title">
          About
          <span class="studio-page-title-accent">me</span>
        </h1>
        <div>
          <p class="studio-lede m-0 text-lg">
            I’m a software engineer based in Chernihiv, Ukraine, with {{ experienceYears }} of experience building web applications across frontend and full-stack systems. I care about responsive interfaces, performance, and maintainable architecture—and I enjoy working across engineering, design, and product to turn complex requirements into dependable software.
          </p>
          <div class="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
            <UiButton as="a" href="/serhii-resnianskyi-cv.pdf" variant="primary">
              Download résumé
              <ArrowDownTrayIcon class="h-4 w-4" aria-hidden="true" />
            </UiButton>
            <UiButton as="NuxtLink" to="/contact" variant="ghost">Get in touch</UiButton>
          </div>
        </div>
      </section>

      <dl class="grid border-y studio-rule sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="fact in facts" :key="fact.label" class="border-b studio-rule py-6 last:border-b-0 sm:nth-[2]:border-l sm:nth-[4]:border-l lg:border-b-0 lg:border-l lg:first:border-l-0 lg:px-7 lg:first:pl-0">
          <dt class="studio-label">{{ fact.label }}</dt>
          <dd class="mt-2 text-lg font-semibold tracking-[-0.02em] text-text dark:text-text-dark">{{ fact.value }}</dd>
        </div>
      </dl>

      <section class="grid gap-8 py-8 lg:grid-cols-[.72fr_1.28fr] lg:gap-20 lg:py-10" aria-labelledby="qualities-heading">
        <h2 id="qualities-heading" class="m-0 text-[29px] font-medium tracking-[-0.03em] text-text dark:text-text-dark">What I bring</h2>
        <div>
          <article v-for="quality in qualities" :key="quality.title" class="grid gap-2 border-b studio-rule py-5 sm:grid-cols-[.72fr_1.28fr] sm:items-baseline sm:gap-8 sm:py-6">
            <h3 class="m-0 text-lg font-semibold tracking-[-0.025em] text-text dark:text-text-dark">{{ quality.title }}</h3>
            <p class="m-0 max-w-[48ch] text-sm leading-relaxed text-text-light dark:text-text-light-dark">{{ quality.description }}</p>
          </article>
        </div>
      </section>

      <div class="mt-20">
        <ExperienceTimeline :items="workExperience" />

        <section class="mt-16" aria-labelledby="skills-heading">
          <h2 id="skills-heading" class="m-0 text-[clamp(2.25rem,4vw,3.5rem)] font-medium tracking-[-0.04em] text-text dark:text-text-dark">Technical range</h2>
          <div class="mt-8 border-t studio-rule">
            <section v-for="group in skillGroups" :key="group.title" class="grid gap-4 border-b studio-rule py-7 sm:grid-cols-[12rem_1fr]">
              <h3 class="m-0 text-sm font-semibold leading-relaxed text-text dark:text-text-dark">{{ group.title }}</h3>
              <ul class="flex flex-wrap gap-x-4 gap-y-2 p-0 text-sm leading-relaxed text-text-light dark:text-text-light-dark" :aria-label="`${group.title} skills`">
                <li v-for="skill in group.skills" :key="skill">{{ skill }}</li>
              </ul>
            </section>
          </div>
        </section>
      </div>

      <section class="education-curated" aria-labelledby="education-heading">
        <h2 id="education-heading">Education &amp; learning</h2>

        <div class="education-degree">
          <span class="studio-label">Degree</span>
          <h3>Bachelor’s Degree in Mathematical Modeling and Cybersecurity</h3>
          <p>Chernihiv Polytechnic National University, Ukraine · 2017–2021</p>
        </div>

        <div class="education-recent">
          <div class="education-recent-heading">
            <span class="studio-label">Recent learning</span>
            <span>Latest {{ recentCourses.length }}</span>
          </div>
          <ul class="education-course-list">
            <li v-for="course in recentCourses" :key="course.title">
              <a class="studio-focus education-course-link" :href="course.certificateUrl" target="_blank" rel="noopener noreferrer">
                <span>
                  <strong>{{ course.title }}</strong>
                  <small>{{ course.author }} · {{ course.date }}</small>
                </span>
                <ArrowUpRightIcon aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>

        <div v-if="archivedCourses.length" class="education-archive">
          <button class="studio-focus" type="button" :aria-expanded="isCourseArchiveOpen" aria-controls="course-archive" @click="isCourseArchiveOpen = !isCourseArchiveOpen">
            <span>
              <span class="studio-label">Course archive</span>
              <strong>{{ isCourseArchiveOpen ? 'Hide full archive' : `View ${archivedCourses.length} more courses` }}</strong>
            </span>
            <ChevronDownIcon :class="isCourseArchiveOpen ? 'is-open' : ''" aria-hidden="true" />
          </button>

          <ul v-if="isCourseArchiveOpen" id="course-archive" class="education-course-list education-archive-list">
            <li v-for="course in archivedCourses" :key="course.title">
              <a class="studio-focus education-course-link" :href="course.certificateUrl" target="_blank" rel="noopener noreferrer">
                <span>
                  <strong>{{ course.title }}</strong>
                  <small>{{ course.author }} · {{ course.date }}</small>
                </span>
                <ArrowUpRightIcon aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowDownTrayIcon, ArrowUpRightIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'
import ExperienceTimeline from '~/components/sections/ExperienceTimeline.vue'
import UiButton from '~/components/ui/UiButton.vue'
import { useDuration } from '~/composables/useDuration'

const { experienceYears } = useAppConfig()

const facts = [
  { label: 'Role', value: 'Software Engineer' },
  { label: 'Experience', value: experienceYears },
  { label: 'Location', value: 'Chernihiv, Ukraine' },
  { label: 'Core focus', value: 'Performance & architecture' },
] as const

const qualities = [
  { title: 'Frontend Expert', description: `${experienceYears} of experience with React and Vue ecosystems.` },
  { title: 'Performance Focus', description: 'Building fast, responsive, and scalable applications.' },
  { title: 'Team Player', description: 'Strong communication and collaboration skills.' },
  { title: 'Problem Solver', description: 'Architecting efficient and maintainable solutions.' },
] as const

const skillGroups = [
  { title: 'Frontend', skills: ['JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3 / SCSS / BEM', 'React', 'Redux (RTK)', 'Vue.js 2/3', 'Pinia', 'Vue Router', 'Zustand', 'TanStack Query / Router / Store'] },
  { title: 'Backend', skills: ['Node.js', 'Hono', 'Express', 'NestJS', 'Bun', 'PHP / Laravel', 'Python', 'FastAPI', 'Django', 'Flask'] },
  { title: 'Full-stack', skills: ['TanStack Start', 'Next.js', 'Nuxt'] },
  { title: 'UI & design', skills: ['Material UI', 'Tailwind CSS', 'Shadcn/UI', 'Chakra UI', 'Nuxt UI'] },
  { title: 'Build & testing', skills: ['Webpack', 'Vite', 'npm / yarn', 'Enzyme', 'Jest'] },
  { title: 'Data', skills: ['PostgreSQL', 'MySQL', 'SQLite', 'IndexedDB', 'Redis'] },
  { title: 'Infrastructure', skills: ['Git', 'Linux', 'Nginx', 'Apache HTTP', 'Docker', 'Vercel', 'Netlify', 'AWS EC2 / S3', 'Cloudflare D1 / R2 / KV / DNS / CDN'] },
  { title: 'Professional tools', skills: ['Figma', 'Adobe Photoshop', 'JetBrains IDEs', 'Jira', 'Confluence', 'Notion', 'Slack', 'Postman', 'Insomnia', 'Yaak', 'TablePlus', 'pgAdmin'] },
  { title: 'AI-assisted work', skills: ['Ollama', 'ChatGPT', 'Claude', 'OpenRouter', 'Stable Diffusion', 'Prompt Engineering', 'AI-powered development workflows'] },
] as const

const courses = [
  { title: 'Bare Metal JavaScript: The JavaScript Virtual Machine', author: 'Miško Hevery, Frontend Masters', date: 'Aug 2025', certificateUrl: 'https://static.frontendmasters.com/ud/c/bae1a70cbd/svRMuXHpHA/javascript-cpu-vm.pdf' },
  { title: 'The Last Algorithms Course You’ll Need', author: 'Michael Paulson, Frontend Masters', date: 'Aug 2025', certificateUrl: 'https://static.frontendmasters.com/ud/c/bae1a70cbd/aPVwjxMZsP/algorithms.pdf' },
  { title: 'Animations on the Web', author: 'Emil Kowalski', date: 'Feb 2025', certificateUrl: 'https://animations.dev/certificate/c1c416ee-96cf-4e70-9269-78e3b4404e68' },
] as const

const isCourseArchiveOpen = ref(false)
const recentCourses = courses.slice(0, 3)
const archivedCourses = courses.slice(3)

const workExperience = [
  {
    title: 'Middle Frontend Developer',
    company: 'Paybis',
    category: 'Fintech',
    duration: useDuration('2025-09-01'),
    description: '',
    achievements: [
      'Owned frontend delivery of a cross-product terms and consent framework across the Paybis website and Widget, helping enable MiCA authorisation and strengthen DORA/GDPR readiness.',
      'Improved Paybis Widget performance through architecture, bundle-chunking, and tooling changes, reaching 25 ms median connection latency, improving FCP by 2.5×, and reducing frontend CI pipeline time by 65%.',
      'Independently researched and delivered a minimal-click, redirect-free Apple Pay proof of concept, now shaping cross-product integration architecture after stakeholder validation as a competitive opportunity.',
    ],
    technologies: ['Vue 3', 'Pinia', 'Vue Router', 'Vuex', 'Nuxt', 'SCSS', 'Tailwind CSS'],
    note: '',
  },
  {
    title: 'Middle Software Engineer (Web & Mobile)',
    company: 'LeverX, Kyiv',
    category: 'Outsource',
    duration: 'Oct 2021 — Dec 2024 (3 years, 2 months)',
    description: '',
    achievements: [
      'Researched and delivered proof-of-concept offline-first architecture using IndexedDB, enabling critical functionality during network outages and informing long-term technical strategy.',
      'Led performance optimization for data visualization components, collaborating across design and product teams to deliver 50% rendering improvements.',
      'Drove standardization of core table architecture, removing performance bottlenecks and establishing reusable patterns across product areas.',
      'Led modernization work including Webpack-to-Vite migration with a 60% build-time reduction, framework upgrades, and a Vue 2-to-3 transition.',
      'Designed client-side data processing for advanced filtering and pagination over locally cached data.',
    ],
    technologies: ['React', 'Redux', 'SCSS', 'Material UI', 'Vue 2', 'Vuex', 'Vue 3', 'TypeScript', 'Pinia', 'Nuxt 3', 'REST APIs', 'CI/CD', 'GitHub Actions', 'AWS', 'Azure DevOps'],
    note: 'Client projects completed under confidentiality agreements.',
  },
  {
    title: 'Software Engineer',
    company: 'PJSC Chernihivoblenergo',
    category: 'Energy',
    duration: 'Dec 2018 — Sep 2021 (2 years, 9 months)',
    description: 'Architected and delivered a web platform supporting HR management, asset inventory, and service coordination for a regional electrical distribution company.',
    achievements: [],
    technologies: ['Laravel', 'Vue 2', 'PostgreSQL', 'MySQL'],
    note: '',
  },
  {
    title: 'Web Developer',
    company: 'Freelance',
    category: 'Independent',
    duration: 'Jan 2017 — Aug 2018 (1 year, 8 months)',
    description: 'Delivered frontend solutions across diverse client projects, focusing on user experience optimization and responsive interface design.',
    achievements: [],
    technologies: ['HTML / CSS', 'JavaScript', 'jQuery', 'Vue 2'],
    note: '',
  },
] as const
</script>

<style scoped>
.education-curated {
  display: grid;
  grid-template-columns: 0.7fr 1fr 1fr;
  border-block: 1px solid rgb(23 34 52 / 13%);
}

.education-curated > h2,
.education-degree,
.education-recent {
  min-width: 0;
  padding-block: 2.5rem;
}

.education-curated > h2 {
  margin: 0;
  padding-right: 2rem;
  color: var(--color-text);
  font-size: 1.8125rem;
  font-weight: 500;
  letter-spacing: -0.03em;
}

.education-degree,
.education-recent {
  border-left: 1px solid rgb(23 34 52 / 13%);
}

.education-degree {
  padding-inline: 2rem;
}

.education-degree h3 {
  margin: 1rem 0 0;
  color: var(--color-text);
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: -0.018em;
  text-wrap: balance;
}

.education-degree p {
  margin: 1rem 0 0;
  color: var(--color-text-light);
  font-size: 0.8125rem;
  line-height: 1.65;
}

.education-recent {
  padding-left: 2rem;
}

.education-recent-heading {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.education-recent-heading > span:last-child {
  color: var(--color-text-light);
  font-size: 0.6875rem;
  font-variant-numeric: tabular-nums;
}

.education-course-list {
  margin: 1.1rem 0 0;
  padding: 0;
  border-top: 1px solid rgb(23 34 52 / 8%);
  list-style: none;
}

.education-course-list li {
  border-bottom: 1px solid rgb(23 34 52 / 8%);
}

.education-course-link {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding-block: 1rem;
  color: var(--color-text);
  text-decoration: none;
}

.education-course-link > span {
  display: grid;
  gap: 0.35rem;
}

.education-course-link strong {
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: -0.012em;
  text-wrap: pretty;
}

.education-course-link small {
  color: var(--color-text-light);
  font-size: 0.6875rem;
  line-height: 1.45;
}

.education-course-link svg {
  width: 0.9rem;
  height: 0.9rem;
  flex: none;
  transition: color 160ms var(--ease-out), transform 160ms var(--ease-out);
}

.education-archive {
  grid-column: 2 / -1;
  padding: 0 0 2rem 2rem;
  border-top: 1px solid rgb(23 34 52 / 13%);
  border-left: 1px solid rgb(23 34 52 / 13%);
}

.education-archive > button {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.25rem 0;
  border: 0;
  background: transparent;
  color: var(--color-text);
  text-align: left;
  cursor: pointer;
}

.education-archive > button > span {
  display: flex;
  align-items: baseline;
  gap: 1rem;
}

.education-archive > button strong {
  font-size: 0.875rem;
  font-weight: 600;
}

.education-archive > button svg {
  width: 1rem;
  height: 1rem;
  transition: transform 180ms var(--ease-out);
}

.education-archive > button svg.is-open {
  transform: rotate(180deg);
}

.education-archive-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-top: 0;
}

.education-archive-list li:nth-child(odd) {
  padding-right: 1.5rem;
}

.education-archive-list li:nth-child(even) {
  padding-left: 1.5rem;
  border-left: 1px solid rgb(23 34 52 / 8%);
}

@media (hover: hover) and (pointer: fine) {
  .education-course-link:hover,
  .education-archive > button:hover {
    color: var(--color-primary);
  }

  .education-course-link:hover svg {
    transform: translate(0.15rem, -0.15rem);
  }
}

@media (max-width: 56.25rem) {
  .education-curated {
    grid-template-columns: 1fr;
  }

  .education-curated > h2 {
    padding-right: 0;
  }

  .education-degree,
  .education-recent,
  .education-archive {
    grid-column: auto;
    padding-inline: 0;
    border-top: 1px solid rgb(23 34 52 / 13%);
    border-left: 0;
  }

  .education-archive {
    padding-bottom: 2rem;
  }
}

@media (max-width: 40rem) {
  .education-archive > button > span {
    display: grid;
    gap: 0.4rem;
  }

  .education-archive-list {
    grid-template-columns: 1fr;
  }

  .education-archive-list li:nth-child(odd),
  .education-archive-list li:nth-child(even) {
    padding-inline: 0;
    border-left: 0;
  }
}

@media (prefers-color-scheme: dark) {
  .education-curated,
  .education-degree,
  .education-recent,
  .education-archive {
    border-color: rgb(174 185 202 / 16%);
  }

  .education-course-list,
  .education-course-list li {
    border-color: rgb(174 185 202 / 10%);
  }

  .education-curated > h2,
  .education-degree h3,
  .education-course-link,
  .education-archive > button {
    color: var(--color-text-dark);
  }

  .education-degree p,
  .education-recent-heading > span:last-child,
  .education-course-link small {
    color: var(--color-text-light-dark);
  }

  .education-course-link:hover,
  .education-archive > button:hover {
    color: var(--color-primary-light);
  }
}

@media (prefers-reduced-motion: reduce) {
  .education-course-link svg,
  .education-archive > button svg {
    transition: color 100ms var(--ease-out);
  }

  .education-course-link:hover svg,
  .education-archive > button svg.is-open {
    transform: none;
  }
}
</style>
