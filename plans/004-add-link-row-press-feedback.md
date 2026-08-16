# 004 — Add press feedback to large link rows

- **Status**: DONE
- **Commit**: 0db7752
- **Severity**: LOW
- **Category**: Missed opportunities / Feedback
- **Estimated scope**: 4 files, approximately 30 lines

## Problem

The large Blog, Links, and Contact email rows react to hover through text or arrow movement but have no physical press response. These are large click targets, so the lack of down-state feedback makes activation feel less immediate than the site’s `UiButton` controls.

```vue
<!-- app/pages/blog/index.vue:16 — current -->
<NuxtLink
  v-for="(post, index) in posts"
  :key="post.path"
  :to="post.path"
  class="studio-focus group grid gap-5 border-b studio-rule py-10 last:border-b-0 sm:py-12 lg:grid-cols-[11rem_minmax(0,1fr)_2.5rem] lg:gap-10"
>
```

```vue
<!-- app/pages/links/index.vue:11 — current -->
<a v-for="link in featuredLinks" :key="link.title" :href="link.url" :target="link.url.startsWith('http') ? '_blank' : undefined" :rel="link.url.startsWith('http') ? 'noopener noreferrer' : undefined" class="studio-focus group grid items-center gap-5 border-b studio-rule py-7 sm:grid-cols-[3rem_10rem_minmax(0,1fr)_2.5rem]">
```

```vue
<!-- app/pages/contact/index.vue:19 — current -->
<a href="mailto:serhii.resnyanskyi@gmail.com" class="studio-focus group mt-7 grid grid-cols-[4.75rem_minmax(0,1fr)_1.25rem] items-center gap-4 border-y studio-rule py-5">
```

## Target

Create one shared `.studio-press-row` primitive. On fine pointers only, pressing scales a row to `0.98` and lowers opacity to `0.92`. Both properties recover through an interruptible `160ms` CSS transition using the audit playbook’s exact ease-out curve. Reduced motion keeps `100ms` opacity feedback but removes scaling.

```css
/* app/assets/css/main.css — target */
.studio-press-row {
  transition: opacity 160ms var(--ease-out), transform 160ms var(--ease-out);
}

@media (hover: hover) and (pointer: fine) {
  .studio-press-row:active {
    opacity: 0.92;
    transform: scale(0.98);
  }
}

@media (prefers-reduced-motion: reduce) {
  .studio-press-row {
    transition: opacity 100ms var(--ease-out);
  }

  .studio-press-row:active {
    opacity: 0.92;
    transform: none;
  }
}
```

Add `studio-press-row` to the existing class list of each of the three rows. Do not remove or retime their existing hover text/arrow transitions.

This plan requires `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` from `plans/001-add-route-crossfade.md`.

## Repo conventions to follow

- Shared studio primitives such as `.studio-focus`, `.studio-rule`, and `.studio-shell` live in `app/assets/css/main.css`; place `.studio-press-row` beside those primitives.
- `app/components/ui/UiButton.vue:8` already uses `active:scale-[0.98]`; match that amplitude for visual consistency.
- Existing arrow hover movement is `150ms` and already uses `motion-reduce:transition-none`; leave it unchanged.
- Keep focus styles supplied by `.studio-focus` unchanged.

## Steps

1. Confirm `app/assets/css/main.css` defines `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`. If not, execute plan 001 first.
2. Add the base `.studio-press-row` transition beside the other `.studio-*` primitives in `app/assets/css/main.css`.
3. Add the fine-pointer media query exactly as shown so touch taps do not trigger false hover/press transforms.
4. Extend the existing reduced-motion media query with the exact opacity-only `100ms` behavior shown in Target.
5. Add `studio-press-row` to the Blog post `NuxtLink` in `app/pages/blog/index.vue`.
6. Add `studio-press-row` to each featured link anchor in `app/pages/links/index.vue`.
7. Add `studio-press-row` to the primary email anchor in `app/pages/contact/index.vue`.

## Boundaries

- Do NOT apply the class to navbar links, footer icons, course links, project image links, or `UiButton`.
- Do NOT change existing hover colors or arrow translations.
- Do NOT animate box-shadow, border, background, width, height, padding, or margin.
- Do NOT add JavaScript event handlers or Motion components; CSS `:active` is sufficient and interruptible.
- Do NOT add dependencies.
- If any target row no longer matches the excerpts above, STOP and report the drift instead of improvising.

## Verification

- **Mechanical**: run `pnpm build`; expect successful static generation. Run `git diff --check`; expect no whitespace errors.
- **Feel check**: run `pnpm dev` and test a Blog row, a Links row, and the Contact email row.
  - Hold the pointer down without releasing; the surface should settle at `scale(0.98)` and `opacity: 0.92` within `160ms`.
  - Release outside the target and confirm the row recovers smoothly from its current state without a keyframe restart.
  - At 10% playback speed, confirm the transform origin remains centered and surrounding layout never reflows.
  - Test touch emulation; no scaling should occur because the fine-pointer media query does not match.
  - Toggle `prefers-reduced-motion`; confirm press feedback remains as a `100ms` opacity change with no transform.
  - Confirm keyboard focus rings and navigation behavior remain unchanged.
- **Done when**: all three row types share identical press feedback, touch and reduced-motion behavior are correct, and the production build passes.
