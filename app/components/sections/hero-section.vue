<template>
  <section class="relative overflow-hidden pb-16 pt-32 sm:pb-20 sm:pt-40">
    <div class="studio-circle -right-48 top-16 h-[28rem] w-[28rem]" aria-hidden="true"></div>

    <div class="studio-shell relative">
      <div class="grid items-end gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-24">
        <h1 class="studio-page-title">
          <slot name="title" />
        </h1>
        <p class="studio-lede m-0 lg:pb-1">
          <slot name="description" />
        </p>
      </div>
    </div>

    <!-- Scroll indicator slot -->
    <slot name="scroll-indicator" />
  </section>
</template>
