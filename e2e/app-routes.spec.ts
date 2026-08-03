import { test, expect } from '@playwright/test';

/**
 * Application routes E2E tests.
 *
 * Tests that every static application route returns and renders its main heading.
 */
test.describe('App routes', () => {
  const appRoutes = [
    { path: '/app', heading: /dashboard/i },
    { path: '/app/prospects', heading: /prospect/i },
    { path: '/app/audits', heading: /audit/i },
    { path: '/app/reports', heading: /report/i },
    { path: '/app/proposals', heading: /proposal/i },
    { path: '/app/pipeline', heading: /pipeline/i },
    { path: '/app/tasks', heading: /task/i },
    { path: '/app/services', heading: /service/i },
    { path: '/app/settings/branding', heading: /brand/i },
    { path: '/app/settings/team', heading: /team/i },
    { path: '/app/settings/integrations', heading: /integration/i },
  ];

  for (const route of appRoutes) {
    test(`${route.path} returns 200 and renders heading`, async ({ page }) => {
      const response = await page.goto(route.path);
      expect(response).not.toBeNull();
      expect(response!.status()).toBe(200);

      // Check that the page has a visible heading
      const heading = page.locator('h1, h2').first();
      await expect(heading).toBeVisible();
    });
  }
});
