# 001 — Add a restrained route crossfade

- **Status**: DONE
- **Commit**: 0db7752
- **Severity**: LOW
- **Category**: Missed opportunities / Cohesion & tokens
- **Estimated scope**: 2 files, approximately 35 lines

## Problem

Route content is replaced immediately while the fixed navigation remains on screen. On this calm portfolio, that makes navigation feel like a hard cut instead of a continuous change of document.

`app/app.vue:1` currently renders `NuxtPage` without a transition:

```vue
<!-- app/app.vue:1 — current -->
<template>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
</template>
```

The global stylesheet has no shared easing tokens. Its root currently contains only the content-width token:

```css
/* app/assets/css/main.css:3 — current */
:root {
  --studio-content-max: 72rem;
}
```

## Target

Introduce the audit playbook’s exact shared easing curves, then apply an `out-in` Nuxt page transition. The outgoing page fades for `120ms`; the incoming page fades and rises `4px` for `180ms`. The two phases total `300ms`, the upper bound for UI motion, and never overlap visually.

```css
/* app/assets/css/main.css — target tokens */
:root {
  --studio-content-max: 72rem;
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
}

.page-enter-active {
  transition: opacity 180ms var(--ease-out), transform 180ms var(--ease-out);
}

.page-leave-active {
  transition: opacity 120ms var(--ease-out);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(4px);
}

.page-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .page-enter-active,
  .page-leave-active {
    transition: opacity 100ms var(--ease-out);
  }

  .page-enter-from {
    transform: none;
  }
}
```

Configure the transition explicitly so Vue waits for the old page to leave before inserting the new page:

```vue
<!-- app/app.vue — target -->
<NuxtPage :transition="{ name: 'page', mode: 'out-in' }" />
```

The persistent navbar and footer must not be animated by the page transition. Only the routed `NuxtPage` subtree changes.

## Repo conventions to follow

- Global visual primitives live in `app/assets/css/main.css`; add both easing tokens to its existing `:root` block.
- `app/components/sections/ExperienceTimeline.vue:106` already uses Vue transition class naming and transform/opacity-only motion. Follow that property discipline, but use the stronger audit easing token instead of bare `ease`.
- The app uses Nuxt’s root `app/app.vue` rather than route-specific wrappers; configure the page transition there.

## Steps

1. In `app/assets/css/main.css`, add `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` and `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)` to the existing `:root` block.
2. In `app/app.vue`, change `<NuxtPage />` to `<NuxtPage :transition="{ name: 'page', mode: 'out-in' }" />`.
3. In `app/assets/css/main.css`, add the four `.page-*` transition selectors exactly as shown in Target. Animate only `opacity` and `transform`.
4. Extend the existing `@media (prefers-reduced-motion: reduce)` block in `app/assets/css/main.css` with the opacity-only `100ms` behavior shown in Target.

## Boundaries

- Do NOT animate `Navbar`, `Footer`, or `NuxtLayout`.
- Do NOT add route direction logic or different transitions per route.
- Do NOT animate height, width, margin, padding, top, or left.
- Do NOT add blur, spring physics, stagger, or a loading indicator.
- Do NOT add a dependency; use Nuxt/Vue’s built-in transition support.
- If the current `app/app.vue` or `app/assets/css/main.css` no longer matches the excerpts above, STOP and report the drift instead of improvising.

## Verification

- **Mechanical**: run `pnpm build`; expect successful static generation and zero build errors. Run `git diff --check`; expect no whitespace errors.
- **Feel check**: run `pnpm dev`, then navigate Home → About → Projects → Blog using the fixed navbar.
  - The navbar must remain perfectly stationary while only the page content fades.
  - Navigation must complete within `300ms`; it must not feel like a loading delay.
  - At normal speed, the `4px` rise should be barely perceptible and must never resemble a slide.
  - In DevTools, set animation playback to 10% and confirm the old and new pages are never visible simultaneously because `mode: 'out-in'` is active.
  - Toggle `prefers-reduced-motion`; confirm page content still crossfades for `100ms` but does not translate.
- **Done when**: all routes crossfade consistently, the navbar/footer never animate, reduced-motion removes translation, and the production build passes.
