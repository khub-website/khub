import { test, expect } from '@playwright/test';

test.describe('API: GET /api/achievements/[id]', () => {
  test('should return 200 and dynamic data from drugparadigm API for drug-paradigm', async ({ request }) => {
    const response = await request.get('/api/achievements/drug-paradigm');
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('photos');
    expect(body).toHaveProperty('siteUrl', 'https://drugparadigm.com/');
    expect(Array.isArray(body.achievements)).toBe(true);

    // If live API responded, isScraped is true and achievements are present
    if (body.isScraped) {
      expect(body.achievements.length).toBeGreaterThan(0);
      expect(body.achievements[0]).toHaveProperty('title');
      expect(body.achievements[0]).toHaveProperty('url');
    }
  });

  test('should return 200 for other known paradigms', async ({ request }) => {
    const response = await request.get('/api/achievements/robo-paradigm');
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('photos');
  });

  test('should return 404 for unknown paradigm id', async ({ request }) => {
    const response = await request.get('/api/achievements/unknown-paradigm-xyz');
    expect(response.status()).toBe(404);
    const body = await response.json();
    expect(body).toHaveProperty('message', 'Paradigm not found');
  });
});
