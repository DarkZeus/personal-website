---
name: Serhii Resnianskyi Portfolio
description: A quiet systems studio that presents engineering evidence with calm precision.
colors:
  signal-cobalt: "#155ecc"
  signal-cobalt-deep: "#104fae"
  signal-cobalt-light: "#73a7f5"
  cool-paper: "#f4f7fb"
  frosted-surface: "#fbfcfe"
  surface-elevated: "#edf2f8"
  midnight-slate: "#172234"
  muted-slate: "#5d6b80"
  warm-void: "#101722"
  dark-surface: "#172131"
  dark-surface-elevated: "#1d2a3d"
  warm-white: "#f0f4fa"
  dark-muted-slate: "#aeb9ca"
  dark-border: "#2b394c"
typography:
  display:
    fontFamily: "Archivo, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "clamp(3.625rem, 7.4vw, 6rem)"
    fontWeight: 500
    lineHeight: 0.92
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Archivo, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "clamp(2.25rem, 4vw, 3.5rem)"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Archivo, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "1.8125rem"
    fontWeight: 500
    lineHeight: 1.14
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Archivo, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.72
    letterSpacing: "normal"
  label:
    fontFamily: "Archivo, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.1em"
  navigation-link:
    fontFamily: "Archivo, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "-0.02em"
    textTransform: "uppercase"
  navigation-brand:
    fontFamily: "Archivo, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "-0.03em"
rounded:
  compact: "0.375rem"
  control: "0.5rem"
  full: "9999px"
spacing:
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
  section: "4rem"
components:
  button-primary:
    backgroundColor: "{colors.signal-cobalt}"
    textColor: "#ffffff"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "0.75rem 1.75rem"
    height: "3rem"
  button-primary-hover:
    backgroundColor: "{colors.signal-cobalt-deep}"
    textColor: "#ffffff"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.signal-cobalt}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "0.75rem 1.75rem"
    height: "3rem"
  navigation:
    backgroundColor: "color-mix(in srgb, {colors.cool-paper} 50%, transparent)"
    textColor: "{colors.muted-slate}"
    rounded: "{rounded.control}"
    padding: "0.75rem 1.5rem"
---

# Design System: Quiet Systems Studio

## Overview

**Creative North Star: "Quiet Systems Studio"**

Quiet Systems Studio presents engineering evidence through calm, open compositions instead of card-heavy templates. It feels like a precise working studio: Cool Paper carries the page, fine rules reveal structure, oversized editorial titles establish identity, and Signal Cobalt marks the few places that deserve action or attention.

The system is restrained but not anonymous. Archivo supplies one consistent voice from monumental names to technical metadata; clipped cobalt circles create atmosphere without competing with content; and the fixed frosted navigation gives the otherwise flat world a single controlled layer of depth. Light and dark themes preserve the same semantic hierarchy.

**Key Characteristics:**

- Cool Paper and warm slate foundations with Signal Cobalt as the interaction signal
- Oversized, tightly tracked Archivo titles balanced by compact evidence copy
- Wide centered shells, asymmetric introductions, and deliberate open space
- Fine structural rules and line-based collections instead of repeated card chrome
- Clipped circular fields and frosted navigation as the recurring signatures
- Short functional motion with reduced-motion fallbacks

## Colors

The palette is cool, quiet, and role-driven: cobalt signals interaction, while paper and slate values carry structure and reading.

### Primary

- **Signal Cobalt:** Links, primary actions, active navigation, bullets, title accents, and keyboard focus.
- **Signal Cobalt Deep:** Stronger hover state for primary controls in light mode.
- **Signal Cobalt Light:** The luminous counterpart for interaction and emphasis on dark surfaces.

### Neutral

- **Cool Paper:** Default light page field.
- **Frosted Surface:** Quiet light surface for translucent or gently separated planes.
- **Surface Elevated:** Image placeholders and other light tonal wells.
- **Midnight Slate:** Primary light-theme text.
- **Muted Slate:** Supporting copy, dates, labels, and metadata.
- **Warm Void:** Dark page field; it replaces pure black.
- **Dark Surface / Dark Surface Elevated:** Parallel dark tonal wells.
- **Warm White:** Primary dark-theme text.
- **Dark Muted Slate:** Secondary dark-theme copy.
- **Dark Border:** Structural separation on elevated dark surfaces.

**The One Signal Rule.** Signal Cobalt is the only decorative and interactive accent. Green is permitted only when it communicates real availability or status.

**The Parallel Theme Rule.** Preserve page, surface, text, border, and signal roles across themes; do not treat dark mode as a simple inversion.

## Typography

**Display Font:** Archivo (with system sans-serif fallbacks)<br>
**Body Font:** Archivo (with system sans-serif fallbacks)<br>
**Label Font:** Archivo (with system sans-serif fallbacks)

**Character:** A single type family keeps the studio coherent. Expression comes from scale, weight, tracking, and line length rather than a contrasting display face.

### Hierarchy

- **Display:** Medium weight, very tight tracking, and compact line-height for names and page titles; the second line may carry the cobalt accent.
- **Headline:** Medium-weight section statements and major evidence headings.
- **Title:** Compact editorial headings for rows, calls to action, and section introductions.
- **Body:** Regular-weight reading copy; leades stay near 65 characters and use a relaxed line-height.
- **Label:** Small, medium-weight, widely tracked uppercase text for categories, roles, dates, and technical metadata only.

**The Scale Before Ornament Rule.** Build hierarchy with size, weight, alignment, and whitespace before adding decoration.

**The Reserved Uppercase Rule.** Uppercase belongs to compact navigation, technical labels, and status metadata; ordinary actions remain in title case.

## Layout

Pages sit in a centered shell capped at 90rem with 2rem side gutters. Below 56.25rem, the shell narrows to 1.125rem gutters and a 45rem cap. The first viewport places a compact glass navigation above an asymmetric title-and-evidence composition; desktop introductions typically divide into unequal columns with 6rem gaps, while mobile collapses into a single natural flow.

Page height follows its content. Do not impose a full-viewport minimum or push the footer away from the final section; short pages should end cleanly and long pages should scroll naturally.

Collections use horizontal rules, selective vertical dividers, and generous vertical padding. Project imagery may form an asymmetric two-column gallery, but descriptive evidence remains attached directly beneath or beside it rather than floating in cards. Long-form Blog Posts narrow to a 48rem reading column.

Rules separate evidence from evidence; they are not decorative section openers. The first collection after a page introduction begins without a top rule, and the footer supplies the final page boundary so terminal sections do not duplicate it.

**The Wide Frame, Narrow Reading Rule.** Use the 90rem shell for composition and evidence scanning, but constrain prose to readable 65–72 character measures or the 48rem article column.

**The Collapse Before Compress Rule.** Stack columns and actions before shrinking type, hit targets, or internal spacing below the established scale.

## Elevation & Depth

The system is flat by default. Fine low-contrast rules and tonal surface changes establish hierarchy; persistent card shadows are not part of the main page language. Depth concentrates in the fixed navigation after scroll, where a subtle ring, shadow, and 10px backdrop blur create a frosted floating plane. Dark mode adds a restrained inner highlight and ambient cobalt light to that same state.

### Shadow Vocabulary

- **Navigation glass:** `0 8px 32px 0 rgba(0, 0, 0, 0.06)` for light frosted separation.
- **Navigation glass dark:** `inset 0 1px 0 0 rgba(255, 255, 255, 0.06), 0 0 0 1px rgba(255, 255, 255, 0.04), 0 8px 40px -8px rgba(0, 0, 0, 0.5), 0 0 80px -20px rgba(99, 155, 255, 0.12)` for the dark scrolled state.

**The Flat Evidence Rule.** Evidence remains on the page plane; use rules, alignment, and tonal wells before shadow.

**The Earned Frost Rule.** Frosted depth belongs to navigation and meaningful state changes, not every container.

## Shapes

Controls and navigation use modest 0.5rem corners. The mobile menu control may use the more compact 0.375rem radius, while availability status and decorative circles use the full pill/circle radius. Project image fields, evidence rows, and section boundaries stay square so the composition reads as editorial structure rather than a stack of soft cards.

Clipped circles are large, faint cobalt fields positioned partly outside the shell or viewport. They remain non-interactive, carry no meaning, and never interrupt reading contrast.

**The Square Evidence Rule.** Keep evidence rows, gallery fields, and ruled sections square; reserve rounding for controls, navigation, status, and literal circles.

## Components

### Buttons

- **Shape:** Modestly rounded rectangle with a 3rem minimum height and generous horizontal padding.
- **Primary:** Solid Signal Cobalt with white text; dark mode reverses to Signal Cobalt Light on Warm Void.
- **Ghost:** Transparent cobalt text with a pale cobalt hover field.
- **Hover / Focus:** Color transitions last 150ms; press scales to 0.98; keyboard focus uses a two-pixel cobalt ring with a two-pixel offset. Reduced-motion removes the transition.

### Cards / Containers

- **Corner Style:** Evidence containers remain square.
- **Background:** Most content sits directly on the page field; project media uses the elevated tonal surface only as an image well.
- **Shadow Strategy:** None at rest.
- **Border:** Fine shared rules define rows and column seams.
- **Internal Padding:** Vertical rhythm typically ranges from 1.75rem to 3rem depending on density.

### Navigation

The fixed identity bar spans the viewport at the top. Across the first 100px of scroll it interpolates to 85% width, shifts down 20px, rounds to 0.5rem, and adds 10px blur plus a subtle ring and shadow. The brand is 17px semibold cobalt; desktop links are 12px bold uppercase with -0.02em tracking and pale cobalt hover and active fields. Mobile exposes a 44px menu control and a spring-driven stacked menu using the same frosted material, with the same bold uppercase label treatment at 14px.

### Evidence Rows

Capability, experience, gear, link, Blog, and contact collections share a ruled row grammar. A row combines compact metadata, one strong title, concise support copy, and an optional cobalt directional icon. Hover may shift the title to cobalt or translate the icon by 0.25rem; the row itself does not lift.

### Availability Status

Availability is a compact full pill with a green semantic dot and faint green field. Its pulse is subtle and stops under reduced motion. It is the intentional exception to the one-signal-color rule.

## Do's and Don'ts

### Do:

- **Do** use Signal Cobalt for actions, links, active states, bullets, and visible keyboard focus.
- **Do** structure evidence with open space, fine rules, asymmetric columns, and clear reading measures.
- **Do** keep the first viewport focused on identity, concrete capability evidence, and a direct contact route.
- **Do** preserve semantic light/dark role mapping and WCAG 2.2 AA contrast.
- **Do** keep motion short, functional, and removable under reduced-motion preferences.
- **Do** keep decorative circles clipped, faint, and subordinate to content.

### Don't:

- **Don't** convert ruled evidence collections into repeated floating cards.
- **Don't** introduce gradients, ornamental corner flourishes, or decorative accent hues that compete with Signal Cobalt.
- **Don't** use persistent shadows on ordinary content surfaces.
- **Don't** round project media, evidence rows, or section boundaries.
- **Don't** use pure black for the dark page or pure white for primary dark-theme text.
- **Don't** make meaning depend on color, hover, motion, or pointer input alone.
