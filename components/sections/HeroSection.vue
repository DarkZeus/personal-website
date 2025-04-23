<template>
  <section class="relative py-32 overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent -z-10"></div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h1 class="text-5xl font-display font-semibold text-text sm:text-6xl md:text-7xl">
          <slot name="title"></slot>
        </h1>
        <p class="mt-6 max-w-2xl mx-auto text-lg text-text-light sm:text-xl">
          <slot name="description"></slot>
        </p>
      </div>
    </div>
  </section>
</template> 