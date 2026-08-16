# Animation improvement plans

These plans cover the four animation opportunities selected from the portfolio motion sweep. They are intentionally restrained: one global continuity improvement and three small state/feedback improvements.

All plans were written against commit `0db7752`. The working tree contained ongoing portfolio redesign changes when the plans were authored; executors must compare the cited excerpts with the current files and stop on material drift.

| # | Plan | Severity | Status | Dependencies |
|---|---|---|---|---|
| 001 | [Add a restrained route crossfade](001-add-route-crossfade.md) | LOW | DONE | None |
| 002 | [Clarify the experience toggle state](002-clarify-experience-toggle-state.md) | LOW | DONE | 001 |
| 003 | [Morph the mobile menu trigger](003-morph-mobile-menu-trigger.md) | LOW | DONE | 001 |
| 004 | [Add press feedback to large link rows](004-add-link-row-press-feedback.md) | LOW | DONE | 001 |

## Recommended execution order

1. Execute **001** first. It establishes the exact shared `--ease-out` and `--ease-in-out` tokens used by every later plan.
2. Execute **002** next. It is the clearest state-indication improvement and exercises both shared easing tokens.
3. Execute **003** after 002. It reuses the same crossfade/rotation vocabulary for the mobile menu trigger without changing the menu spring.
4. Execute **004** last. It applies the shared ease-out curve to a tightly scoped set of large link rows.

Plans 002, 003, and 004 are otherwise independent and may be implemented in parallel after plan 001 is complete.

## Product motion constraints

- Preserve the “Quiet Systems Studio” personality: precise, calm, and restrained.
- UI motion stays at or below `300ms`.
- Animate only `transform` and `opacity`.
- Use CSS transitions for reversible state; do not introduce keyframes for toggles or presses.
- Reduced motion keeps short opacity feedback while removing positional movement.
- Do not animate the persistent navbar during route changes.
