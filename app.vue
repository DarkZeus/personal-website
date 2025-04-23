<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Cal+Sans:wght@600&display=swap');

html {
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

body {
  background-color: oklch(0.97 0.01 250);
  color: oklch(0.2 0.01 250);
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Cal Sans', 'Inter', sans-serif;
  font-weight: 600;
  letter-spacing: -0.025em;
}

::selection {
  background-color: oklch(0.45 0.2 250);
  color: white;
}

/* Modern scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: oklch(0.95 0.01 250);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: oklch(0.8 0.01 250);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: oklch(0.7 0.01 250);
}
</style>