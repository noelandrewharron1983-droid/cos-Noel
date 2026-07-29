import { test, expect } from '@playwright/test';

// Note: run a static server at http://localhost:3000 serving the repo root (e.g. npx http-server -c-1)
// Playwright file:// clipboard behavior is restricted, so serve over http for reliable clipboard support.

test('copy button triggers copy or fallback and updates live region', async ({ page }) => {
  await page.goto('http://localhost:3000/web-ui/index.htm');

  // Click deep to populate
  await page.click('button.deep');

  await page.click('#copyBtn');

  // Wait for the live region to be updated with either success or failure message
  const statusText = await page.waitForFunction(() => {
    const el = document.getElementById('copyStatus');
    return el && (el.textContent.includes('Prompt copied to clipboard') || el.textContent.includes('Copy failed')) ? el.textContent : null;
  }, null, { timeout: 2000 });

  const text = await statusText.jsonValue();
  expect(text).toMatch(/Prompt copied to clipboard|Copy failed/);
});
