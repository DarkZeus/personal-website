<template>
  <!--
    THESIS: A digital business card should feel like a physical object worth picking up.
    OWN-WORLD: Quiet studio light, pearl card stock, delayed holographic foil, and crisp black print; no portfolio chrome or sci-fi HUD.
    STORY: Meet Serhii, tilt the credential, choose a direct channel, then scan or save the contact.
    FIRST VIEWPORT: One large holographic credential contains the identity, every contact channel, and a camera-readable QR code.
    FORM: holo-credential-c92870f4 — a motion-sensitive identity card whose print, glare, foil, and edges occupy separate physical layers.
    FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
  -->
  <div class="card-layout">
    <slot />
  </div>
</template>

<style scoped>
.card-layout {
  min-height: 100dvh;
  background: #f2f0e9;
  color: #101114;
  color-scheme: light;
}
</style>
