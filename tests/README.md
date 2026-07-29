# Tests and guidance

This patch adds unit, accessibility and e2e tests for the clipboard copy feature.

How to run unit tests (Jest + jsdom)
1. Install dev deps (example):
   npm install --save-dev jest jsdom jest-environment-jsdom jest-axe axe-core @testing-library/jest-dom
2. Run: npx jest

How to run accessibility test
- jest-axe test is included with the unit tests above. Ensure axe-core is installed.

How to run Playwright E2E test
1. Serve the repo root on localhost:3000 (e.g. npx http-server -c-1)
2. Install Playwright and run the test:
   npx playwright test tests/e2e/copy.spec.ts

Notes
- The unit tests mock `navigator.clipboard` and assert that `alert('Prompt copied to clipboard')` is called on success. When clipboard is unavailable the button silently does nothing (no alert, no execCommand fallback).
- The unit tests mock navigator.clipboard and document.execCommand for unit coverage.
- The Playwright E2E test clicks `button.copy` and listens for the browser `alert` confirmation dialog when clipboard write succeeds.
