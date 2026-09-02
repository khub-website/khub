import { test, expect } from '@playwright/test';

test.describe('Mobile Viewport & Responsiveness', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('should display mobile menu button and toggle drawer on small screens', async ({ page }) => {
    await page.goto('/');

    const toggleBtn = page.getByTestId('mobile-menu-toggle');
    await expect(toggleBtn).toBeVisible();

    // Mobile menu starts closed or hidden
    await expect(page.getByTestId('mobile-menu')).not.toBeVisible();

    // Open mobile menu
    await toggleBtn.click();
    const mobileMenu = page.getByTestId('mobile-menu');
    await expect(mobileMenu).toBeVisible();
    await expect(page.getByTestId('mobile-nav-link-about')).toBeVisible();

    // Close mobile menu
    await toggleBtn.click();
    await expect(mobileMenu).not.toBeVisible();
  });

  test('should navigate to Contact page via mobile menu', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('mobile-menu-toggle').click();
    await page.getByTestId('mobile-nav-link-contact').click();
    await expect(page).toHaveURL(/\/contact$/);
    await expect(page.getByTestId('contact-form')).toBeVisible();
  });
});
