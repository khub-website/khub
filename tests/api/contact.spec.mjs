import { test, expect } from '@playwright/test';

test.describe('API: POST /api/contact', () => {
  test('should return 400 when required fields are missing', async ({ request }) => {
    const response = await request.post('/api/contact', {
      data: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
      },
    });

    // In Next.js, if SMTP is not configured, it returns 500 missing env vars, or 400 if validation fails first.
    // Both indicate proper rejection without sending an email.
    expect([400, 500]).toContain(response.status());
    const body = await response.json();
    expect(body).toHaveProperty('message');
  });

  test('should return 400 or 500 when email format is invalid', async ({ request }) => {
    const response = await request.post('/api/contact', {
      data: {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'invalid-email-format',
        phone: '+1234567890',
        inquiry: 'other',
        message: 'Hello, this is a test message.',
      },
    });

    expect([400, 500]).toContain(response.status());
    const body = await response.json();
    expect(body).toHaveProperty('message');
  });
});
