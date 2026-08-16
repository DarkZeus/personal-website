<template>
  <div class="bg-soft-titanium dark:bg-void-black">
    <!--
      THESIS: Quiet Systems Studio presents engineering evidence through calm, open compositions instead of card-heavy portfolio templates.
      OWN-WORLD: Cool Paper, Signal Cobalt, Archivo, fine structural rules, oversized editorial titles, clipped circles, and frosted navigation.
      STORY: Visitors identify Serhii, inspect concrete work and experience, then reach a direct contact route.
      FIRST VIEWPORT: A compact glass navigation floats above an asymmetric title-and-evidence composition with Cobalt carrying action and active state.
      FORM: User-pinned Quiet Systems Studio page family, adapted from the approved visual prototypes; seed key: user-pinned.
      FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
    -->
    <Navbar />

    <div>
      <main>
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
