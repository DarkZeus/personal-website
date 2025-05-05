<template>
  <section class="relative py-24 flex items-center justify-center overflow-hidden">
    <!-- Grid pattern background -->
    <div class="absolute inset-0 bg-grid-pattern opacity-[0.015]"></div>
    
    <!-- Decorative elements -->
    <div class="absolute -top-1/3 -right-1/3 w-[60rem] h-[60rem] rounded-full bg-primary/3 blur-3xl"></div>
    <div class="absolute -bottom-1/3 -left-1/3 w-[60rem] h-[60rem] rounded-full bg-primary/3 blur-3xl"></div>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[45rem] rounded-full bg-primary/3 blur-3xl opacity-50"></div>
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full">
      <div class="text-center">
        <h1 class="text-4xl font-display font-semibold text-text sm:text-5xl md:text-6xl text-balance">
          <slot name="title" />
        </h1>
        <p class="mt-6 max-w-2xl mx-auto text-lg text-text-light sm:text-xl leading-relaxed text-pretty">
          <slot name="description" />
        </p>
      </div>
    </div>

    <!-- Scroll indicator slot -->
    <slot name="scroll-indicator" />
  </section>
</template> 