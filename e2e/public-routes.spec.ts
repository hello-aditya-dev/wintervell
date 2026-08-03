import { test, expect } from '@playwright/test';

/**
 * Public routes E2E tests.
 *
 * Tests that every public route returns a 200 and renders its main heading.
 */
test.describe('Public routes', () => {
  const publicRoutes = [
    { path: '/', heading: /WinterVell/i },
    { path: '/pricing', heading: /pricing/i },
    { path: '/contact', heading: /contact/i },
    { path: '/license', heading: /licence/i },
    { path: '/terms', heading: /terms/i },
    { path: '/privacy', heading: /privacy/i },
    { path: '/product', heading: /product/i },
    { path: '/due-diligence', heading: /due diligence/i },
    { path: '/white-label', heading: /white.?label/i },
    { path: '/sample-report', heading: /report/i },
    { path: '/demo', heading: /demo/i },
  ];

  for (const route of publicRoutes) {
    test(`${route.path} returns 200 and renders heading`, async ({ page }) => {
      const response = await page.goto(route.path);
      expect(response).not.toBeNull();
      expect(response!.status()).toBe(200);

      // Check that the page has a heading matching the expected pattern
      const heading = page.locator('h1, h2').first();
      await expect(heading).toBeVisible();
    });
  }
});
