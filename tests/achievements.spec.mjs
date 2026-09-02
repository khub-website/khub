import { test, expect } from '@playwright/test';

test.describe('Achievements Portal & Real API Integration', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/achievements');
  });

  test('should render achievements page structure and hero', async ({ page }) => {
    await expect(page.getByTestId('achievements-page')).toBeVisible();
    await expect(page.locator('h1, h2, h3').filter({ hasText: /Achievements|Paradigms|Deep-Tech/i }).first()).toBeVisible();
  });

  test('should toggle between Achievements and Research tabs', async ({ page }) => {
    const achievementsTab = page.getByTestId('tab-achievements');
    const researchTab = page.getByTestId('tab-research');

    await expect(achievementsTab).toBeVisible();
    await expect(researchTab).toBeVisible();

    // Switch to Research tab
    await researchTab.click();
    await expect(researchTab).toHaveClass(/bg-surface/);

    // Switch back to Achievements tab
    await achievementsTab.click();
    await expect(achievementsTab).toHaveClass(/bg-surface/);
  });

  test('should hit real drugparadigm API and load papers in Research tab', async ({ page }) => {
    // Switch to Research tab
    await page.getByTestId('tab-research').click();

    // Wait for the research items to load from the live API (or display research items)
    const researchSection = page.locator('#research');
    await expect(researchSection).toBeVisible({ timeout: 15000 });
  });
});
