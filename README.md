# Noel — COS Quick Switch

Noel is a tiny client-side web UI for quickly switching between short, reusable "COS" prompts (modes) and copying them to the clipboard. It's intended as a small utility for workflows where you want to swap between predefined prompt variants (condensed/full) and quickly copy the active prompt for pasting into other tools.

This repository contains a single-page UI (web-ui/index.htm) and a test-suite branch that demonstrates accessibility-minded clipboard handling with a fallback for older or insecure browsers.

Key features
- Three built-in modes: Deep Work, Creative Storm, Reset (each has condensed and full variants).
- Copy-to-clipboard functionality that prefers navigator.clipboard and gracefully falls back to a textarea + document.execCommand copy when needed.
- Accessible controls: buttons use explicit types and (on the tests branch) a live region is used to announce copy status.

How to use
- Open web-ui/index.htm in a browser (double-click or serve via a static server) and click one of the mode buttons to load a prompt. Use the "Copy Prompt" button to copy.

Development
- Branch with tests and accessibility improvements: tests/clipboard-fallback
- The branch includes unit tests (Jest + jsdom), accessibility tests (jest-axe), and a Playwright e2e that validates the copy flow.

Run tests locally
1. Checkout the test branch: git fetch origin && git checkout tests/clipboard-fallback
2. Install dev dependencies: npm ci
3. Unit + accessibility: npm run test
4. E2E (Playwright):
   - Install Playwright browsers: npx playwright install --with-deps
   - Serve the repo root (e.g. npx http-server -c-1 -p 3000)
   - npm run test:e2e

Notes about CI
- The branch includes a GitHub Actions workflow at .github/workflows/tests.yml that runs unit + accessibility tests on PRs and can run Playwright e2e on main.

Contributing
- Small PRs welcome. If you add features, please include tests and update the README with any new runtime requirements.

License
- No license file is included by default. Add a LICENSE file if you want to specify open-source terms.
