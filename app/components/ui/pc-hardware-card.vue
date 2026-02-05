<template>
  <div class="pc-card">
    <!-- Image area (optional) -->
    <div v-if="image" class="pc-card__image-area">
      <img
        :src="image"
        :alt="name"
        class="pc-card__image"
        loading="lazy"
        decoding="async"
      />
    </div>

    <!-- Header with component type indicator -->
    <div class="pc-card__header">
      <div class="pc-card__type-badge">
        <span class="pc-card__type-dot" />
        <span class="pc-card__type-label">{{ category }}</span>
      </div>
    </div>

    <!-- Main content -->
    <div class="pc-card__body">
      <h3 class="pc-card__name">{{ name }}</h3>

      <!-- Specs grid -->
      <div v-if="specs && specs.length" class="pc-card__specs">
        <div
          v-for="(spec, index) in specs"
          :key="index"
          class="pc-card__spec"
        >
          <span class="pc-card__spec-label">{{ spec.label }}</span>
          <span class="pc-card__spec-value">{{ spec.value }}</span>
        </div>
      </div>
    </div>
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
  image: {
    type: String,
    default: ''
  },
  specs: {
    type: Array,
    default: () => []
    // Each spec: { label: string, value: string }
  }
})
</script>

<style scoped>
.pc-card {
  position: relative;
  background: var(--color-surface);
  border: 1px solid oklch(0.88 0.01 250);
  border-radius: 0.5rem;
  overflow: hidden;
}

@media (prefers-color-scheme: dark) {
  .pc-card {
    background: var(--color-surface-dark);
    border-color: var(--color-border-dark);
  }
}

/* Image */
.pc-card__image-area {
  aspect-ratio: 4 / 3;
  background: oklch(0.96 0.005 250);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

@media (prefers-color-scheme: dark) {
  .pc-card__image-area {
    background: oklch(0.20 0.015 265);
  }
}

.pc-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Header */
.pc-card__header {
  padding: 0.75rem 1rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.pc-card__type-badge {
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

.pc-card__type-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-primary);
}

@media (prefers-color-scheme: dark) {
  .pc-card__type-dot {
    background: var(--color-primary-light);
    box-shadow: 0 0 8px var(--color-primary-light);
  }
}

.pc-card__type-label {
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-text-light);
}

@media (prefers-color-scheme: dark) {
  .pc-card__type-label {
    color: var(--color-text-light-dark);
  }
}

/* Body */
.pc-card__body {
  padding: 0.5rem 1rem 1rem;
}

.pc-card__name {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text);
  letter-spacing: -0.01em;
  line-height: 1.3;
  margin-bottom: 0.75rem;
}

@media (prefers-color-scheme: dark) {
  .pc-card__name {
    color: var(--color-text-dark);
  }
}

/* Specs */
.pc-card__specs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
}

.pc-card__spec {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  min-width: 0;
}

.pc-card__spec-label {
  font-size: 0.625rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-text-light);
  opacity: 0.7;
}

@media (prefers-color-scheme: dark) {
  .pc-card__spec-label {
    color: var(--color-text-muted-dark);
  }
}

.pc-card__spec-value {
  font-family: var(--font-display);
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--color-text);
  letter-spacing: -0.01em;
}

@media (prefers-color-scheme: dark) {
  .pc-card__spec-value {
    color: var(--color-text-dark);
  }
}
</style>
