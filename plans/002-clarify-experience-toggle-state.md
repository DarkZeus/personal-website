# 002 — Clarify the experience toggle state

- **Status**: DONE
- **Commit**: 0db7752
- **Severity**: LOW
- **Category**: Missed opportunities / State indication
- **Estimated scope**: 1 file, approximately 25 lines

## Problem

The Experience control changes its label between “See more” and “See less,” but its symmetric up/down icon does not communicate which state is active. The only icon motion is a hover scale, which describes hover rather than expansion.

```vue
<!-- app/components/sections/ExperienceTimeline.vue:7 — current -->
<button
  type="button"
  class="studio-focus group inline-flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-semibold text-text-light transition-colors hover:bg-surface-elevated hover:text-text dark:text-text-light-dark dark:hover:bg-surface-elevated-dark dark:hover:text-text-dark"
  :aria-expanded="isExpanded"
  aria-controls="experience-content"
  @click="isExpanded = !isExpanded"
>
  {{ isExpanded ? 'See less' : 'See more' }}
  <ChevronUpDownIcon class="h-4 w-4 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
</button>
```

```ts
// app/components/sections/ExperienceTimeline.vue:71 — current
import { ChevronUpDownIcon } from '@heroicons/vue/24/outline'
```

## Target

Replace the symmetric glyph with overlapping directional chevrons. Crossfade and rotate them over `180ms` using the audit playbook’s exact on-screen movement curve. The collapsed state shows a downward chevron; the expanded state shows an upward chevron.

```vue
<!-- target icon markup inside the existing button -->
<span class="relative h-4 w-4 shrink-0" aria-hidden="true">
  <ChevronDownIcon
    class="experience-toggle-icon absolute inset-0 h-4 w-4"
    :class="isExpanded ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'"
  />
  <ChevronUpIcon
    class="experience-toggle-icon absolute inset-0 h-4 w-4"
    :class="isExpanded ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'"
  />
</span>
```

```ts
// target import
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/24/outline'
```

```css
/* target scoped styles */
.experience-toggle-icon {
  transition: opacity 180ms var(--ease-in-out), transform 180ms var(--ease-in-out);
}

@media (prefers-reduced-motion: reduce) {
  .experience-toggle-icon {
    transform: none;
    transition: opacity 100ms var(--ease-out);
  }
}
```

This plan requires the `--ease-out` and `--ease-in-out` tokens introduced by `plans/001-add-route-crossfade.md`.

## Repo conventions to follow

- Keep Heroicons from `@heroicons/vue/24/outline`, already used throughout the app.
- Keep `aria-expanded`, `aria-controls`, the button label, and the content transition unchanged.
- Use the shared motion tokens from `app/assets/css/main.css`; do not add component-local cubic-bezier values.
- The component’s existing scoped style block is the correct home for `.experience-toggle-icon`.

## Steps

1. Confirm `app/assets/css/main.css` defines `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` and `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)`. If not, execute plan 001 first.
2. In `app/components/sections/ExperienceTimeline.vue`, replace the `ChevronUpDownIcon` import with `ChevronDownIcon` and `ChevronUpIcon`.
3. Replace the current single icon with the exact overlapping-icon markup shown in Target.
4. Remove the current `duration-300 group-hover:scale-110` icon behavior; it competes with the semantic state transform.
5. Add `.experience-toggle-icon` to the existing scoped style block with the exact `180ms` opacity/transform transition.
6. Extend the component’s existing reduced-motion media query with the exact `100ms` opacity-only rule shown in Target. Do not remove the existing reduced-motion handling for `.experience-swap-*`.

## Boundaries

- Do NOT change the Experience content swap, timing, or open/closed data.
- Do NOT animate the button label or button dimensions.
- Do NOT change the button’s accessible name, `aria-expanded`, or `aria-controls` behavior.
- Do NOT add spring motion, bounce, or hover scale.
- Do NOT add dependencies.
- If the current component no longer matches the excerpts above, STOP and report the drift instead of improvising.

## Verification

- **Mechanical**: run `pnpm build`; expect successful static generation. Run `git diff --check`; expect no whitespace errors.
- **Feel check**: run `pnpm dev`, open `/about`, scroll to Experience, and toggle the control repeatedly.
  - Collapsed must show only the downward chevron; expanded must show only the upward chevron.
  - At 10% playback speed, the outgoing icon should rotate `90deg` while fading out as the incoming icon rotates from `-90deg` while fading in.
  - Rapid repeated clicks must retarget smoothly because CSS transitions—not keyframes—drive both states.
  - Toggle `prefers-reduced-motion`; confirm the icons crossfade for `100ms` without rotating.
  - Confirm the existing Experience content transition still works and focus remains on the button.
- **Done when**: icon direction always matches `aria-expanded`, normal motion is `180ms`, reduced motion is opacity-only, and no hover-only transform remains.
