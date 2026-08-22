# Contributing to cos-Noel

## Prompt change workflow

1. Update canonical content in `prompts/catalog.js`.
2. Update any related reference docs in `prompts/` and `docs/`.
3. Run tests:
   - `npm run test:unit`
   - `npm run test:accessibility`
   - `npm run test:e2e`
4. Include a release note entry using `docs/release-notes-template.md`.

## Prompt governance rules

- Canonical source of truth: `prompts/catalog.js`.
- Keep mode IDs stable (`deep`, `storm`, `reset`).
- Keep variant IDs stable (`condensed`, `full`, `quick`).
- Use `variantAliases` when a mode does not have first-class content for a requested variant.
- Bump `version` in the catalog when prompt content changes.

## PR checklist

- [ ] Prompt/content update is made in canonical source.
- [ ] UI behavior remains correct for mode + variant switching.
- [ ] Copy status behavior is accessible and non-blocking.
- [ ] Unit tests pass.
- [ ] Accessibility tests pass.
- [ ] E2E tests pass.
- [ ] README/docs updated if behavior or process changed.
