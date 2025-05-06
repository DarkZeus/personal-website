<template>
  <div class="min-h-screen bg-soft-titanium dark:bg-void-black flex flex-col">
    <Navbar />

    <div class="flex-1 flex flex-col">
      <main class="flex-1">
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