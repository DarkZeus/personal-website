<template>
  <div class="software-card-wrapper">
    <component
      :is="link ? 'a' : 'div'"
      :href="link"
      :target="link ? '_blank' : undefined"
      :rel="link ? 'noopener noreferrer' : undefined"
      class="software-card group"
    >

      <!-- Icon container -->
      <div class="software-card__icon">
        <img
          v-if="icon"
          :src="icon"
          :alt="name"
          class="w-full h-full object-contain"
          loading="lazy"
          decoding="async"
        />
        <div v-else class="software-card__icon-placeholder">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
          </svg>
        </div>
      </div>

      <!-- Content -->
      <div class="software-card__content">
        <div class="software-card__header">
          <h3 class="software-card__name">{{ name }}</h3>
          <span class="software-card__category">{{ category }}</span>
        </div>
        <p class="software-card__description">{{ description }}</p>
      </div>

      <!-- Arrow indicator -->
      <div v-if="link" class="software-card__arrow">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
        </svg>
      </div>
    </component>
  </div>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: ''
  },
  link: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.software-card-wrapper {
  container-type: inline-size;
}

.software-card {
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.875rem 1rem;
  background: var(--color-surface);
  border-radius: 0.75rem;
  border: 1px solid oklch(0.9 0.01 250);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

/* Dark mode base */
@media (prefers-color-scheme: dark) {
  .software-card {
    background: var(--color-surface-dark);
    border-color: var(--color-border-dark);
  }
}

/* Hover state */
.software-card:hover {
  border-color: oklch(0.75 0.12 250 / 0.4);
  box-shadow:
    0 4px 16px -4px oklch(0.5 0.2 250 / 0.08),
    0 0 0 1px oklch(0.8 0.1 250 / 0.1);
}

@media (prefers-color-scheme: dark) {
  .software-card:hover {
    border-color: oklch(0.5 0.15 250 / 0.5);
    background: var(--color-surface-elevated-dark);
    box-shadow:
      inset 0 1px 0 0 rgba(255, 255, 255, 0.04),
      0 4px 24px -4px oklch(0.5 0.2 250 / 0.2),
      0 0 40px -12px oklch(0.6 0.2 250 / 0.15);
  }
}

/* Icon */
.software-card__icon {
  flex-shrink: 0;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.625rem;
  background: linear-gradient(
    145deg,
    oklch(0.97 0.015 250),
    oklch(0.94 0.02 250)
  );
  padding: 0.375rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 1px 3px oklch(0.5 0.1 250 / 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
}

@media (prefers-color-scheme: dark) {
  .software-card__icon {
    background: linear-gradient(
      145deg,
      oklch(0.32 0.02 265),
      oklch(0.26 0.018 265)
    );
    box-shadow:
      0 2px 8px oklch(0 0 0 / 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.06);
  }
}


.software-card__icon-placeholder {
  width: 100%;
  height: 100%;
  color: var(--color-primary);
  opacity: 0.5;
}

@media (prefers-color-scheme: dark) {
  .software-card__icon-placeholder {
    color: var(--color-primary-light);
    opacity: 0.6;
  }
}

/* Content */
.software-card__content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.software-card__header {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.software-card__name {
  font-family: var(--font-display);
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-text);
  letter-spacing: -0.01em;
  transition: color 0.2s ease;
  line-height: 1.3;
}

@media (prefers-color-scheme: dark) {
  .software-card__name {
    color: var(--color-text-dark);
  }
}

.software-card:hover .software-card__name {
  color: var(--color-primary);
}

@media (prefers-color-scheme: dark) {
  .software-card:hover .software-card__name {
    color: var(--color-primary-light);
  }
}

.software-card__category {
  font-size: 0.6875rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-light);
  opacity: 0.7;
  padding: 0.125rem 0.375rem;
  background: oklch(0.5 0.15 250 / 0.08);
  border-radius: 0.25rem;
  line-height: 1.4;
}

@media (prefers-color-scheme: dark) {
  .software-card__category {
    color: var(--color-text-light-dark);
    background: oklch(0.6 0.15 250 / 0.12);
  }
}

.software-card__description {
  font-size: 0.8125rem;
  color: var(--color-text-light);
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (prefers-color-scheme: dark) {
  .software-card__description {
    color: var(--color-text-light-dark);
  }
}

/* Arrow */
.software-card__arrow {
  flex-shrink: 0;
  width: 1rem;
  height: 1rem;
  color: var(--color-text-light);
  opacity: 0.5;
}

@media (prefers-color-scheme: dark) {
  .software-card__arrow {
    color: var(--color-text-light-dark);
  }
}

/* Responsive adjustments for very small containers */
@container (max-width: 280px) {
  .software-card {
    padding: 0.75rem;
    gap: 0.75rem;
  }

  .software-card__icon {
    width: 2rem;
    height: 2rem;
  }

  .software-card__name {
    font-size: 0.875rem;
  }

  .software-card__description {
    display: none;
  }
}
</style>
