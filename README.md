# cos-Noel

cos-Noel is both:
1. A reusable COS prompt library.
2. A lightweight web prompt switcher for quickly selecting a mode + variant and copying the prompt.

## Scope and success criteria

### Primary user tasks
- Select a mode (Deep Work, Creative Storm, Reset).
- Select a variant (condensed, full, quick).
- Copy the current prompt quickly, with clear feedback.

### Usage context
- Browser-first utility for daily workflows.
- Works from static hosting (GitHub Pages) and local static serving.

### Release quality bar
- Accessibility: WCAG 2.1 AA checks via automated accessibility tests.
- Browser support: modern evergreen browsers with graceful clipboard fallback.
- Test coverage target: unit + accessibility + e2e coverage for core mode/variant/copy flows.

## Canonical prompt content

Prompt content lives in one place:
- `/home/runner/work/cos-Noel/cos-Noel/prompts/catalog.js`

`web-ui` reads this catalog directly, and prompt docs reference it.

## Repository structure

- `web-ui/` — static UI (`index.htm`, `app.js`)
- `prompts/` — canonical prompt catalog and prompt references
- `tests/unit/` — mode/copy logic tests
- `tests/accessibility/` — axe-based accessibility tests
- `tests/e2e/` — Playwright browser tests
- `.github/workflows/` — CI test workflow + deployment workflow
- `docs/` — governance, acceptance, and process docs

## Local development

### Install
```bash
npm install
```

### Run tests
```bash
npm run test:unit
npm run test:accessibility
npm run test:e2e
```

Or run unit + accessibility together:
```bash
npm test
```

### Run the UI locally
- Open `/home/runner/work/cos-Noel/cos-Noel/web-ui/index.htm` directly, or
- Serve the repo root with a static server:
  ```bash
  npx http-server -p 3000 -c-1 .
  ```
  then visit `http://127.0.0.1:3000/web-ui/index.htm`.

## CI/CD

- **Test workflow** (`.github/workflows/test-web-ui.yml`)
  - Runs on PRs and pushes to `main` for relevant paths.
  - Executes `npm install`, `npm test`, and `npm run test:e2e`.
- **Deploy workflow** (`.github/workflows/deploy-pages.yml`)
  - Triggers after `Test web-ui` completes.
  - Deploys only when tests succeeded for the `main` branch.

## Prompt behavior mapping

- **Condensed**: short checklist / TL;DR style.
- **Full**: structured workflow steps + optional detail.
- **Quick**: short recovery / restart guidance.

These mappings align with `/prompts/master-cos.md` and are encoded in `/prompts/catalog.js`.

## Contributing

See `/home/runner/work/cos-Noel/cos-Noel/CONTRIBUTING.md`.
