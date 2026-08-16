<template>
  <div class="studio-page pt-28 sm:pt-32">
    <div class="studio-circle -bottom-64 -left-72 h-[39rem] w-[39rem]" aria-hidden="true"></div>

    <div class="studio-shell relative">
      <header class="grid items-end gap-10 py-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-24 lg:py-16">
        <h1 class="studio-page-title">
          The desk
          <span class="studio-page-title-accent">in layers</span>
        </h1>
        <p class="studio-lede m-0 max-w-[39ch] lg:pb-1">A working setup makes more sense as a system: each layer has a job, from raw compute to the tools that keep the work moving.</p>
      </header>

      <section class="mt-12 sm:mt-16" aria-label="Workstation layers">
        <article v-for="layer in layers" :key="layer.role" class="grid gap-5 border-b studio-rule py-8 last:border-b-0 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-8 lg:grid-cols-[7.5rem_minmax(15rem,.72fr)_minmax(0,1.28fr)] lg:py-10">
          <div class="flex items-center justify-between gap-3 self-start text-[11px] font-semibold uppercase tracking-[.09em] text-primary dark:text-primary-light">
            <span>{{ layer.role }}</span>
            <span class="h-1.5 w-1.5 shrink-0 rounded-full bg-primary dark:bg-primary-light" aria-hidden="true"></span>
          </div>

          <div>
            <h2 class="m-0 text-[clamp(1.35rem,1.75vw,1.75rem)] font-semibold leading-[1.12] tracking-[-0.025em] text-text dark:text-text-dark">{{ layer.primary.name }}</h2>
            <p class="mt-2 text-[13px] leading-relaxed text-text-light dark:text-text-light-dark">{{ layer.primary.description }}</p>
          </div>

          <div class="border-t studio-rule-soft pt-5 sm:col-start-2 lg:col-start-auto lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <h3 class="m-0 text-[15px] font-semibold leading-snug text-text dark:text-text-dark">{{ layer.support.title }}</h3>
            <dl class="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
              <div v-for="item in layer.support.items" :key="`${item.label}-${item.value}`" class="text-xs leading-relaxed text-text-light dark:text-text-light-dark">
                <dt class="inline font-semibold text-text dark:text-text-dark">{{ item.label }}</dt>
                <dd class="ml-1 inline">{{ item.value }}</dd>
              </div>
            </dl>
          </div>
        </article>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
const layers = [
  {
    role: 'Platform',
    primary: { name: 'MacBook Air M4 13″', description: 'Main development machine · M4 · 24GB RAM' },
    support: {
      title: 'NCASE M2 workstation',
      items: [
        { label: 'CPU', value: 'AMD Ryzen 9700X' },
        { label: 'GPU', value: 'Inno3D RTX 3090' },
        { label: 'Memory', value: 'Corsair DDR5 64GB' },
        { label: 'Board', value: 'ASUS TUF B650M-Plus' },
        { label: 'Cooling', value: 'Noctua NH-D12L + NF-A12x25' },
        { label: 'Power', value: 'CoolerMaster V SFX 1300W' },
        { label: 'Storage', value: 'Lexar NM790 4TB' },
        { label: 'Storage', value: 'Crucial P3 Plus 1TB' },
      ],
    },
  },
  {
    role: 'Visual field',
    primary: { name: 'Samsung Odyssey OLED G6', description: 'Primary 27″ OLED display · 360Hz' },
    support: { title: 'Asus TUF Gaming VG27AQ', items: [{ label: 'Panel', value: '27″ IPS' }, { label: 'Refresh', value: '165Hz' }] },
  },
  {
    role: 'Control',
    primary: { name: 'Keychron K1', description: 'Low-profile mechanical keyboard · Gateron Brown' },
    support: { title: 'Other controls', items: [{ label: 'Keyboard', value: 'Leopold FC750RBT' }, { label: 'Mouse', value: 'Keychron M6 · 8K polling' }] },
  },
  {
    role: 'Audio path',
    primary: { name: 'Steinberg UR22C', description: 'USB-C recording interface · 32-bit/192kHz' },
    support: {
      title: 'Listening and capture',
      items: [
        { label: 'Headphones', value: 'AKG K240 Mk.II' },
        { label: 'Microphone', value: 'Rode NT1' },
        { label: 'Earbuds', value: 'Apple AirPods 4' },
        { label: 'IEMs', value: 'KZ ZS10 Pro' },
      ],
    },
  },
  {
    role: 'Work surface',
    primary: { name: 'Ultradesk UPLIFT Black', description: 'Electric sit/stand desk' },
    support: { title: 'Physical base', items: [{ label: 'Finish', value: 'Black' }, { label: 'Adjustment', value: 'Electric' }] },
  },
  {
    role: 'Workflow',
    primary: { name: 'WebStorm + Ghostty', description: 'Primary IDE and terminal' },
    support: {
      title: 'Daily software',
      items: [
        { label: 'Editor', value: 'VS Code' },
        { label: 'AI coding', value: 'Claude Code' },
        { label: 'Browser', value: 'Brave' },
        { label: 'Testing', value: 'Chrome' },
        { label: 'Productivity', value: 'Raycast' },
        { label: 'Notes', value: 'Obsidian' },
      ],
    },
  },
] as const
</script>
