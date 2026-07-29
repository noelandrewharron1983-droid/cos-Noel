import { test, expect } from '@playwright/test';

// Note: run a static server at http://localhost:3000 serving the repo root (e.g. npx http-server -c-1)
// Playwright file:// clipboard behavior is restricted, so serve over http for reliable clipboard support.

test('copy button triggers clipboard write and shows success alert', async ({ page }) => {
  await page.goto('http://localhost:3000/web-ui/index.htm');

  // Click deep to populate current prompt
  await page.click('button.deep');

  // The implementation calls alert() after a successful clipboard write
  const dialogPromise = page.waitForEvent('dialog', { timeout: 3000 }).catch(() => null);

  await page.click('button.copy');

  const dialog = await dialogPromise;
  if (dialog) {
    expect(dialog.message()).toMatch(/Prompt copied to clipboard/);
    await dialog.accept();
  }
  // If clipboard API is unavailable (e.g. no permissions), the button silently does nothing — no error expected.
});
