<template>
  <main>
    <div
      :class="[
        'transition-bg relative flex h-[100dvh] flex-col items-center justify-center bg-zinc-50 text-slate-950 dark:bg-zinc-900',
        className
      ]"
      v-bind="$attrs"
    >
      <div class="absolute inset-0 overflow-hidden">
        <div
          :class="[
            'after:animate-aurora pointer-events-none absolute -inset-[10px] opacity-50 blur-[10px] invert filter will-change-transform',
            showRadialGradient ? '[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]' : ''
          ]"
          :style="auroraStyles"
        ></div>
      </div>
      <slot></slot>
    </div>
  </main>
</template>

<script setup lang="ts">
interface Props {
  className?: string
  showRadialGradient?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  className: '',
  showRadialGradient: true
})

const auroraStyles = {
  '--aurora': 'repeating-linear-gradient(100deg,#3b82f6_10%,#a5b4fc_15%,#93c5fd_20%,#ddd6fe_25%,#60a5fa_30%)',
  '--dark-gradient': 'repeating-linear-gradient(100deg,#000_0%,#000_7%,transparent_10%,transparent_12%,#000_16%)',
  '--white-gradient': 'repeating-linear-gradient(100deg,#fff_0%,#fff_7%,transparent_10%,transparent_12%,#fff_16%)',
  '--blue-300': '#93c5fd',
  '--blue-400': '#60a5fa',
  '--blue-500': '#3b82f6',
  '--indigo-300': '#a5b4fc',
  '--violet-200': '#ddd6fe',
  '--black': '#000',
  '--white': '#fff',
  '--transparent': 'transparent',
  'background-image': 'var(--white-gradient),var(--aurora)',
  'background-size': '300%, 200%',
  'background-position': '50% 50%,50% 50%',
} as const
</script>

<style scoped>
.after\:animate-aurora::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image: var(--white-gradient), var(--aurora);
  background-size: 200%, 100%;
  background-attachment: fixed;
  mix-blend-mode: difference;
}

.dark .after\:animate-aurora {
  background-image: var(--dark-gradient), var(--aurora);
  filter: invert(0);
}

.dark .after\:animate-aurora::after {
  background-image: var(--dark-gradient), var(--aurora);
}

@keyframes aurora {
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  50% {
    transform: translate(10%, 10%) rotate(180deg);
  }
  100% {
    transform: translate(0, 0) rotate(360deg);
  }
}

.after\:animate-aurora {
  animation: aurora 20s linear infinite;
}
</style>
