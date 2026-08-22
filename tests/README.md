# Tests and guidance

The suite validates mode switching, variant rendering, copy behavior, and accessibility checks.

## Run unit tests
```bash
npm run test:unit
```

## Run accessibility tests
```bash
npm run test:accessibility
```

## Run Playwright e2e tests
```bash
npm run test:e2e
```

`playwright.config.js` starts a local static server automatically.

## Coverage focus
- Unit: mode/variant state and copy fallback behavior.
- Accessibility: baseline axe checks plus status-live-region assertions.
- E2E: interactive mode switching, quick variant flow, and non-blocking copy feedback.
