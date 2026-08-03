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

  test('app product status', async ({ page }) => {
    await page.goto('/app/product-status');
    await expect(page.getByRole('heading', { name: /product status/i })).toBeVisible();
  });

  test('call centre dashboard', async ({ page }) => {
    await page.goto('/app/call-centre');
    await expect(page.getByRole('heading', { name: /call centre/i })).toBeVisible();
  });

  test('call centre calls', async ({ page }) => {
    await page.goto('/app/call-centre/calls');
    await expect(page.getByRole('heading', { name: /call/i })).toBeVisible();
  });

  test('call centre agents', async ({ page }) => {
    await page.goto('/app/call-centre/agents');
    await expect(page.getByRole('heading', { name: /agent/i })).toBeVisible();
  });

  test('call centre queues', async ({ page }) => {
    await page.goto('/app/call-centre/queues');
    await expect(page.getByRole('heading', { name: /queue/i })).toBeVisible();
  });

  test('call centre campaigns', async ({ page }) => {
    await page.goto('/app/call-centre/campaigns');
    await expect(page.getByRole('heading', { name: /campaign/i })).toBeVisible();
  });

  test('call centre supervisor', async ({ page }) => {
    await page.goto('/app/call-centre/supervisor');
    await expect(page.getByRole('heading', { name: /supervisor/i })).toBeVisible();
  });
});
