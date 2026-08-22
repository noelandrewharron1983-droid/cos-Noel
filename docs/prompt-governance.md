# COS prompt governance

## Canonical source

All mode and variant content is owned by:
- `prompts/catalog.js`

Do not introduce duplicate inline prompt strings in UI code.

## Structured content model

Each mode in the catalog defines:
- `id`
- `label`
- `defaultVariant`
- `variantAliases` (optional)
- `variants` map where each variant has:
  - `name`
  - `text`

## Mapping from master COS behavior to UI variants

- `condensed` → short checklist / TL;DR style.
- `full` → complete, structured workflow.
- `quick` → short reset/resume guidance.

## Versioning

- Increment `catalog.version` for prompt content changes.
- Keep IDs backward-compatible where possible.
- Prefer aliases for compatibility instead of deleting variants.

## Acceptance checks for prompt changes

1. Mode activation renders expected prompt text.
2. Variant changes re-render current mode content correctly.
3. Alias behavior works for missing mode-specific variants.
4. Copy action succeeds via clipboard API or fallback with user-visible status.
5. Tests remain green in unit, accessibility, and e2e suites.
