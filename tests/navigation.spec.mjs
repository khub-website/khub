import { test, expect } from '@playwright/test';

test.describe('Navigation & Routing', () => {
  test('should render navbar and logo', async ({ page }) => {
    await page.goto('/');
    const navbar = page.getByTestId('navbar');
    await expect(navbar).toBeVisible();

    const logo = page.getByTestId('nav-logo');
    await expect(logo).toBeVisible();
    await expect(logo).toContainText('K-HUB');
  });

  test('should navigate to About page', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('nav-link-about').click();
    await expect(page).toHaveURL(/\/about$/);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should navigate to Gallery page', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('nav-link-gallery').click();
    await expect(page).toHaveURL(/\/gallery$/);
    await expect(page.getByTestId('gallery-filter-bar')).toBeVisible();
  });

  test('should navigate to Achievements page', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('nav-link-achievements').click();
    await expect(page).toHaveURL(/\/achievements$/);
    await expect(page.getByTestId('achievements-page')).toBeVisible();
  });

  test('should navigate to Contact page', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('nav-link-contact').click();
    await expect(page).toHaveURL(/\/contact$/);
    await expect(page.getByTestId('contact-form')).toBeVisible();
  });

  test('should render 404 page for unknown routes', async ({ page }) => {
    const response = await page.goto('/non-existent-page-route-12345');
    expect(response?.status()).toBe(404);
    await expect(page.locator('body')).toContainText(/404|not found|page not found/i);
  });
});
