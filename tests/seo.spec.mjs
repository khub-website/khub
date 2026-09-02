import { test, expect } from '@playwright/test';

test.describe('SEO & Accessibility Smoke Checks', () => {
  test('should have html lang attribute set', async ({ page }) => {
    await page.goto('/');
    const html = page.locator('html');
    await expect(html).toHaveAttribute('lang', 'en');
  });

  test('should have valid title on key routes', async ({ page }) => {
    const routes = ['/', '/about', '/achievements', '/contact', '/gallery'];

    for (const route of routes) {
      await page.goto(route);
      const title = await page.title();
      expect(title.length).toBeGreaterThan(0);
    }
  });

  test('should have meta description tag', async ({ page }) => {
    await page.goto('/');
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /.+/);
  });
});
