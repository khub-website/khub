import { test, expect } from '@playwright/test';

test.describe('Homepage Sections & Content', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should render the Hero section with dynamic word switcher', async ({ page }) => {
    const hero = page.getByTestId('hero-section');
    await expect(hero).toBeVisible();

    const exploreBtn = page.getByTestId('hero-cta-explore');
    await expect(exploreBtn).toBeVisible();
    await expect(exploreBtn).toHaveText('Explore Our Work');

    const learnBtn = page.getByTestId('hero-cta-learn');
    await expect(learnBtn).toBeVisible();
    await expect(learnBtn).toHaveText('Learn More');
  });

  test('should have page title and core headings', async ({ page }) => {
    await expect(page).toHaveTitle(/K-Hub/i);
    const mainHeading = page.locator('h1');
    await expect(mainHeading).toContainText('Building the Future');
  });

  test('should render footer with quick links and copyright', async ({ page }) => {
    const footer = page.getByTestId('footer');
    await expect(footer).toBeVisible();
    await expect(footer).toContainText('K-Hub');
    await expect(footer).toContainText('All rights reserved');
  });
});
