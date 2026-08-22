import { test, expect } from '@playwright/test';

test('mode activation and variant switch update prompt text', async ({ page }) => {
  await page.goto('/web-ui/index.htm');

  await page.click('button.deep');
  await expect(page.locator('#promptArea')).toContainText('Deep Work Mode');

  await page.selectOption('#variant', 'full');
  await page.click('button.deep');
  await expect(page.locator('#promptArea')).toContainText('Workflow');
});

test('copy button shows non-blocking status update', async ({ page }) => {
  await page.goto('/web-ui/index.htm');
  await page.click('button.deep');
  await page.click('button.copy');

  await expect(page.locator('#copyStatus')).toContainText(/Prompt copied to clipboard|fallback copy|Copy failed/);
});

test('reset quick is available as first-class variant', async ({ page }) => {
  await page.goto('/web-ui/index.htm');
  await page.selectOption('#variant', 'quick');
  await page.click('button.reset');

  await expect(page.locator('#promptArea')).toContainText('Reset Mode — Quick');
});
