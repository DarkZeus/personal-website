<template>
  <section aria-labelledby="experience-heading">
    <div class="flex items-center justify-between gap-6">
      <h2 id="experience-heading" class="m-0 text-[clamp(2.25rem,4vw,3.5rem)] font-medium tracking-[-0.04em] text-text dark:text-text-dark">
        Experience
      </h2>
      <button
        type="button"
        class="studio-focus group inline-flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-semibold text-text-light transition-colors hover:bg-surface-elevated hover:text-text dark:text-text-light-dark dark:hover:bg-surface-elevated-dark dark:hover:text-text-dark"
        :aria-expanded="isExpanded"
        aria-controls="experience-content"
        @click="isExpanded = !isExpanded"
      >
        {{ isExpanded ? 'See less' : 'See more' }}
        <span class="relative h-4 w-4 shrink-0" aria-hidden="true">
          <ChevronDownIcon
            class="experience-toggle-icon absolute inset-0 h-4 w-4"
            :class="isExpanded ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'"
          />
          <ChevronUpIcon
            class="experience-toggle-icon absolute inset-0 h-4 w-4"
            :class="isExpanded ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'"
          />
        </span>
      </button>
    </div>

    <div id="experience-content">
      <Transition name="experience-swap" mode="out-in">
        <ol
          :key="isExpanded ? 'expanded' : 'compact'"
          class="relative m-0 p-0"
          :class="isExpanded ? 'mt-6 border-t studio-rule' : 'experience-timeline mt-8 grid gap-7 lg:grid-cols-4 lg:gap-0'"
          aria-label="Career timeline"
        >
          <li
            v-for="(item, index) in items"
            :key="`${item.company}-${item.title}`"
            class="relative list-none"
            :class="isExpanded ? 'experience-entry border-b studio-rule py-8' : 'grid grid-cols-[auto_1fr] gap-x-4 lg:block lg:pr-8'"
            :style="isExpanded ? { animationDelay: `${index * 50}ms` } : undefined"
            :aria-current="index === highlightedExperience.index ? 'true' : undefined"
          >
            <template v-if="!isExpanded">
              <span
                class="relative z-10 mt-1 block h-3.5 w-3.5 rounded-full border-[3px] border-soft-titanium bg-text-light shadow-[0_0_0_1px_rgb(23_34_52_/_13%)] dark:border-void-black dark:bg-text-light-dark dark:shadow-[0_0_0_1px_rgb(174_185_202_/_16%)] lg:mt-0"
                :class="index === highlightedExperience.index ? '!bg-primary dark:!bg-primary-light' : ''"
                aria-hidden="true"
              ></span>
              <div class="min-w-0 lg:mt-7">
                <div class="flex items-start gap-3">
                  <span
                    class="grid h-10 w-10 shrink-0 place-items-center rounded-xl border studio-rule bg-surface-elevated text-sm font-semibold text-text dark:bg-surface-elevated-dark dark:text-text-dark"
                    :class="index === highlightedExperience.index ? '!border-primary !bg-primary !text-white dark:!border-primary-light dark:!bg-primary-light dark:!text-void-black' : ''"
                    aria-hidden="true"
                  >
                    {{ getCompanyMark(item.company) }}
                  </span>
                  <div class="min-w-0 pt-0.5">
                    <span
                      class="experience-company-name block"
                      :class="index === highlightedExperience.index ? 'text-primary dark:text-primary-light' : 'text-text dark:text-text-dark'"
                    >
                      {{ item.company }}
                    </span>
                    <p class="experience-role-title mb-0 mt-1 text-text-light dark:text-text-light-dark">
                      {{ item.title }}
                    </p>
                  </div>
                </div>
                <div class="mt-3 flex flex-wrap items-center gap-2">
                  <span
                    class="inline-flex rounded-md border studio-rule bg-surface-elevated px-2 py-1 text-[0.6875rem] font-medium uppercase leading-none tracking-[0.08em] text-text-light dark:bg-surface-elevated-dark dark:text-text-light-dark"
                  >
                    {{ item.category }}
                  </span>
                  <span class="experience-date-text text-text-light dark:text-text-light-dark">
                    {{ getCompactDuration(item.duration) }}
                  </span>
                </div>
              </div>
            </template>

            <template v-else>
              <span
                class="experience-mark grid h-11 w-11 place-items-center rounded-xl border studio-rule bg-surface-elevated text-sm font-semibold text-text dark:bg-surface-elevated-dark dark:text-text-dark"
                :class="index === highlightedExperience.index ? '!border-primary !bg-primary !text-white dark:!border-primary-light dark:!bg-primary-light dark:!text-void-black' : ''"
                aria-hidden="true"
              >
                {{ getCompanyMark(item.company) }}
              </span>
              <div class="min-w-0">
                <div class="experience-title-row flex flex-wrap items-center">
                  <h3
                    class="experience-company-name m-0"
                    :class="index === highlightedExperience.index ? 'text-primary dark:text-primary-light' : 'text-text dark:text-text-dark'"
                  >
                    {{ item.company }}
                  </h3>
                  <span
                    class="inline-flex rounded-md border studio-rule bg-surface-elevated px-2 py-1 text-[0.6875rem] font-medium uppercase leading-none tracking-[0.08em] text-text-light dark:bg-surface-elevated-dark dark:text-text-light-dark"
                  >
                    {{ item.category }}
                  </span>
                </div>
                <p class="experience-role-title mb-0 mt-1 text-text-light dark:text-text-light-dark">
                  {{ item.title }}
                </p>
              </div>
              <div class="experience-date">
                <p class="experience-date-text m-0 text-text-light dark:text-text-light-dark">
                  <span>{{ getDurationRange(item.duration) }}</span>
                  <span v-if="getElapsedDuration(item.duration)" class="experience-tenure">
                    <span class="experience-date-separator" aria-hidden="true"> · </span>
                    {{ getElapsedDuration(item.duration) }}
                  </span>
                </p>
              </div>

              <div class="experience-details-layout">
                <div class="min-w-0">
                  <p v-if="item.description" class="experience-prose m-0 max-w-[72ch] text-sm leading-relaxed text-text-light dark:text-text-light-dark">{{ item.description }}</p>
                  <ul v-if="item.achievements.length" class="space-y-3 p-0" :class="item.description ? 'mt-5' : 'm-0'" aria-label="Key achievements">
                    <li v-for="achievement in item.achievements" :key="achievement" class="experience-prose relative pl-5 text-sm leading-relaxed text-text-light dark:text-text-light-dark">
                      <span class="absolute left-0 top-[.65em] h-1.5 w-1.5 rounded-full bg-primary dark:bg-primary-light" aria-hidden="true"></span>
                      {{ achievement }}
                    </li>
                  </ul>
                  <p v-if="item.note" class="mb-0 mt-4 text-xs italic leading-relaxed text-text-light dark:text-text-light-dark">{{ item.note }}</p>
                </div>
                <div class="experience-stack mt-5 lg:mt-0">
                  <span class="studio-label">Stack</span>
                  <ul class="experience-stack-list mt-3 flex flex-wrap gap-x-3 gap-y-2 p-0 text-xs font-semibold leading-relaxed text-primary dark:text-primary-light" aria-label="Technologies used">
                    <li v-for="technology in item.technologies" :key="technology">{{ technology }}</li>
                  </ul>
                </div>
              </div>
            </template>
          </li>
        </ol>
      </Transition>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/24/outline'

type ExperienceItem = {
  readonly title: string
  readonly company: string
  readonly category: string
  readonly duration: string
  readonly description: string
  readonly achievements: readonly string[]
  readonly technologies: readonly string[]
  readonly note: string
}

const props = defineProps<{
  items: readonly ExperienceItem[]
}>()

const isExpanded = ref(false)

const getCompanyMark = (company: string) => company.match(/[A-Z0-9]/i)?.[0]?.toUpperCase() ?? '•'
const getDurationRange = (duration: string) => duration.replace(/\s*\([^)]*\)\s*$/, '')
const getElapsedDuration = (duration: string) => duration.match(/\(([^)]*)\)\s*$/)?.[1] ?? ''
const getCompactDuration = (duration: string) => getDurationRange(duration).replace('Current', 'Now')
const highlightedExperience = computed(() => {
  const currentIndex = props.items.findIndex(item => getDurationRange(item.duration).includes('Current'))

  return {
    index: currentIndex >= 0 ? currentIndex : props.items.length ? 0 : -1,
  }
})
</script>

<style scoped>
.experience-title-row {
  column-gap: 0.5rem;
  row-gap: 0.5rem;
}

.experience-swap-enter-active,
.experience-swap-leave-active {
  transition: opacity 180ms ease, transform 180ms ease;
}

.experience-swap-enter-from,
.experience-swap-leave-to {
  opacity: 0;
  transform: translateY(0.5rem);
}

.experience-company-name {
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: -0.025em;
  text-wrap: balance;
}

.experience-date-text {
  font-size: 0.875rem;
  line-height: 1.625;
  font-variant-numeric: tabular-nums;
}

.experience-entry {
  display: grid;
  grid-template-columns: 2.75rem minmax(0, 1fr);
  column-gap: 1rem;
  row-gap: 0;
  animation: experience-entry-fade 300ms var(--ease-out) both;
}

@keyframes experience-entry-fade {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.experience-mark {
  grid-row: 1 / 3;
  align-self: center;
}

.experience-date {
  grid-column: 2;
  justify-self: start;
  margin-top: 0.5rem;
}

.experience-details-layout {
  grid-column: 1 / -1;
  margin-top: 2rem;
}

.experience-role-title {
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.625;
  text-wrap: balance;
}

.experience-prose {
  text-wrap: pretty;
}

.experience-timeline::before {
  position: absolute;
  top: 0.75rem;
  bottom: 0.75rem;
  left: 0.40625rem;
  border-left: 1px solid rgb(23 34 52 / 13%);
  content: '';
}

.experience-toggle-icon {
  transition: opacity 180ms var(--ease-in-out), transform 180ms var(--ease-in-out);
}

@media (min-width: 48rem) {
  .experience-entry {
    grid-template-columns: 3rem minmax(0, 1fr) auto;
    column-gap: 1.25rem;
    row-gap: 1.25rem;
  }

  .experience-mark {
    grid-row: auto;
    align-self: start;
  }

  .experience-date {
    grid-column: 3;
    justify-self: end;
    margin-top: 0;
    text-align: right;
  }

  .experience-tenure {
    display: block;
    margin-top: 0.25rem;
  }

  .experience-date-separator {
    display: none;
  }

  .experience-details-layout {
    grid-column: 2 / 4;
    margin-top: 0;
  }
}

@media (min-width: 64rem) {
  .experience-details-layout {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 13rem;
    column-gap: 3rem;
  }

  .experience-stack {
    text-align: right;
  }

  .experience-stack-list {
    justify-content: flex-end;
  }

  .experience-timeline::before {
    top: 0.4375rem;
    right: 0;
    bottom: auto;
    left: 0;
    border-top: 1px solid rgb(23 34 52 / 13%);
    border-left: 0;
  }
}

@media (prefers-color-scheme: dark) {
  .experience-timeline::before {
    border-color: rgb(174 185 202 / 16%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .experience-swap-enter-active,
  .experience-swap-leave-active {
    transition: none;
  }

  .experience-entry {
    animation-delay: 0ms !important;
    animation-duration: 100ms;
  }

  .experience-toggle-icon {
    transform: none;
    transition: opacity 100ms var(--ease-out);
  }
}
</style>
