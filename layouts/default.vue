<template>
  <div class="min-h-screen bg-soft-titanium flex flex-col">
    <Navbar />

    <div class="flex-1 flex flex-col">
      <main class="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 pt-16 sm:pt-24 pb-20 sm:pb-8">
        <slot />
      </main>

      <Footer />
    </div>
  </div>
</template>

<script setup>
import Navbar from '~/components/layout/Navbar.vue'
import Footer from '~/components/layout/Footer.vue'
</script> 