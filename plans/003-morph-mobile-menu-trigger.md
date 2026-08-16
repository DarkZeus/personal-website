# 003 — Morph the mobile menu trigger

- **Status**: DONE
- **Commit**: 0db7752
- **Severity**: LOW
- **Category**: Missed opportunities / State indication
- **Estimated scope**: 1 file, approximately 30 lines

## Problem

The mobile menu panel already enters and exits with Motion, but the trigger swaps its hamburger and close paths instantly. The SVG receives a `rotate-90` class without a transform transition, so the state indicator snaps while the connected panel moves.

```vue
<!-- app/components/layout/Navbar.vue:18 — current -->
<button
  type="button"
  @click="isMenuOpen = !isMenuOpen"
  class="sm:hidden min-h-11 min-w-11 p-2 rounded-md hover:bg-primary/5 dark:hover:bg-primary/10 active:bg-primary/10 dark:active:bg-primary/20 transition-colors duration-150 will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-primary-light dark:focus-visible:ring-offset-void-black"
  :aria-label="isMenuOpen ? 'Close menu' : 'Open menu'"
  :aria-expanded="isMenuOpen"
  aria-controls="mobile-navigation"
>
  <svg
    class="w-6 h-6 text-text-light dark:text-text-light-dark will-change-transform"
    :class="{ 'rotate-90': isMenuOpen }"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      v-if="!isMenuOpen"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M4 6h16M4 12h16M4 18h16"
    />
    <path
      v-else
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
</button>
```

## Target

Keep both SVG states mounted in the same `24px × 24px` wrapper. Crossfade and rotate them over `150ms` with the audit playbook’s exact on-screen movement curve. Do not change the existing menu-panel spring.

```vue
<!-- target icon wrapper inside the existing button -->
<span class="relative block h-6 w-6 text-text-light dark:text-text-light-dark" aria-hidden="true">
  <svg
    class="mobile-menu-icon absolute inset-0 h-6 w-6"
    :class="isMenuOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
  <svg
    class="mobile-menu-icon absolute inset-0 h-6 w-6"
    :class="isMenuOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
  </svg>
</span>
```

Add a scoped style block to `Navbar.vue` if it does not already have one:

```css
<style scoped>
.mobile-menu-icon {
  transition: opacity 150ms var(--ease-in-out), transform 150ms var(--ease-in-out);
}

@media (prefers-reduced-motion: reduce) {
  .mobile-menu-icon {
    transform: none;
    transition: opacity 100ms var(--ease-out);
  }
}
</style>
```

This plan requires the shared tokens introduced by `plans/001-add-route-crossfade.md`.

## Repo conventions to follow

- Preserve the current `isMenuOpen` state, accessible label, `aria-expanded`, and `aria-controls` attributes.
- Keep the menu panel’s existing `AnimatePresence` and Motion spring `{ type: 'spring', stiffness: 300, damping: 20 }` unchanged.
- Use shared global easing tokens rather than hand-typing cubic-beziers in the component.
- Animate only `opacity` and `transform`; both SVGs must occupy the same absolute position so layout never changes.

## Steps

1. Confirm `app/assets/css/main.css` contains `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` and `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)`. If not, execute plan 001 first.
2. In `app/components/layout/Navbar.vue`, keep the existing button and replace only its current conditional SVG with the exact two-SVG wrapper shown in Target.
3. Remove `will-change-transform` and the `:class="{ 'rotate-90': isMenuOpen }"` binding from the old single SVG because that SVG no longer exists.
4. Add the scoped `.mobile-menu-icon` styles shown in Target at the end of `Navbar.vue`.
5. Keep the button’s color transition and the menu panel’s Motion animation untouched.

## Boundaries

- Do NOT change the navbar’s scroll-linked width, offset, radius, blur, or shadow behavior.
- Do NOT change the mobile menu panel’s spring values or `AnimatePresence` structure.
- Do NOT animate SVG path data.
- Do NOT change button dimensions or touch-target size.
- Do NOT add dependencies.
- If `Navbar.vue` no longer matches the excerpt above, STOP and report the drift instead of improvising.

## Verification

- **Mechanical**: run `pnpm build`; expect successful static generation. Run `git diff --check`; expect no whitespace errors.
- **Feel check**: run `pnpm dev`, use a viewport below the `sm` breakpoint, and toggle the menu with mouse, touch simulation, and keyboard.
  - Hamburger and close icons must remain centered in exactly the same `24px × 24px` box.
  - At 10% playback speed, one icon must rotate out as the other rotates in; no frame may show a path jumping position.
  - Repeated rapid clicks must smoothly retarget rather than restart from an unrelated angle.
  - The menu panel’s existing spring must remain unchanged and should feel connected to the `150ms` trigger response.
  - Toggle `prefers-reduced-motion`; confirm the glyphs crossfade for `100ms` without rotation while the accessible label still changes.
- **Done when**: the icon state change is legible and interruptible, reduced motion is opacity-only, accessibility is unchanged, and the production build passes.
