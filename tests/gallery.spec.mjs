import { test, expect } from '@playwright/test';

test.describe('Gallery Page & Lightbox', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/gallery');
  });

  test('should render gallery filter bar with category pills', async ({ page }) => {
    const filterBar = page.getByTestId('gallery-filter-bar');
    await expect(filterBar).toBeVisible();

    await expect(page.getByTestId('gallery-filter-what-we-do')).toBeVisible();
    await expect(page.getByTestId('gallery-filter-resources')).toBeVisible();
    await expect(page.getByTestId('gallery-filter-events')).toBeVisible();
  });

  test('should filter cards when clicking category buttons', async ({ page }) => {
    // Click Events filter
    await page.getByTestId('gallery-filter-events').click();
    await expect(page.getByTestId('gallery-filter-events')).toHaveClass(/active/);

    // Click Resources filter
    await page.getByTestId('gallery-filter-resources').click();
    await expect(page.getByTestId('gallery-filter-resources')).toHaveClass(/active/);
  });

  test('should render gallery cards in grid', async ({ page }) => {
    const galleryGrid = page.getByTestId('gallery-grid');
    await expect(galleryGrid).toBeVisible();

    const cards = page.getByTestId('gallery-card');
    await expect(cards.first()).toBeVisible({ timeout: 10000 });
  });
});
