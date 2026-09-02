import { test, expect } from '@playwright/test';

test.describe('Contact Form Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('should render all contact form fields and submit button', async ({ page }) => {
    await expect(page.getByTestId('contact-form')).toBeVisible();
    await expect(page.getByTestId('contact-firstname')).toBeVisible();
    await expect(page.getByTestId('contact-lastname')).toBeVisible();
    await expect(page.getByTestId('contact-email')).toBeVisible();
    await expect(page.getByTestId('contact-phone')).toBeVisible();
    await expect(page.getByTestId('contact-inquiry')).toBeVisible();
    await expect(page.getByTestId('contact-message')).toBeVisible();
    await expect(page.getByTestId('contact-submit')).toBeVisible();
  });

  test('should allow entering text in all inputs', async ({ page }) => {
    await page.getByTestId('contact-firstname').fill('TestFirst');
    await expect(page.getByTestId('contact-firstname')).toHaveValue('TestFirst');

    await page.getByTestId('contact-lastname').fill('TestLast');
    await expect(page.getByTestId('contact-lastname')).toHaveValue('TestLast');

    await page.getByTestId('contact-email').fill('test@example.com');
    await expect(page.getByTestId('contact-email')).toHaveValue('test@example.com');

    await page.getByTestId('contact-phone').fill('+1234567890');
    await expect(page.getByTestId('contact-phone')).toHaveValue('+1234567890');

    await page.getByTestId('contact-inquiry').selectOption('internship');
    await expect(page.getByTestId('contact-inquiry')).toHaveValue('internship');

    await page.getByTestId('contact-message').fill('This is an automated E2E test message.');
    await expect(page.getByTestId('contact-message')).toHaveValue('This is an automated E2E test message.');
  });

  test('should display status message when form is submitted', async ({ page }) => {
    await page.getByTestId('contact-firstname').fill('Jane');
    await page.getByTestId('contact-lastname').fill('Doe');
    await page.getByTestId('contact-email').fill('jane.doe@example.com');
    await page.getByTestId('contact-phone').fill('+1234567890');
    await page.getByTestId('contact-inquiry').selectOption('partnership');
    await page.getByTestId('contact-message').fill('Testing contact form submission response handling.');

    await page.getByTestId('contact-submit').click();

    // The status message element will appear (either success if SMTP configured or error message gracefully handled)
    const statusMsg = page.getByTestId('contact-status');
    await expect(statusMsg).toBeVisible({ timeout: 10000 });
  });
});
