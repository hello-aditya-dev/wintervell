import { test, expect } from '@playwright/test';

test.describe('Call centre demonstration', () => {
  test('dashboard shows demo disclaimer', async ({ page }) => {
    await page.goto('/app/call-centre');
    await expect(page.getByText(/demo/i).first()).toBeVisible();
  });

  test('calls page shows demo data', async ({ page }) => {
    await page.goto('/app/call-centre/calls');
    // Should show fictional contact names
    await expect(page.getByText(/555-02/).first()).toBeVisible();
  });

  test('call detail shows recording placeholder', async ({ page }) => {
    await page.goto('/app/call-centre/calls/call-1');
    await expect(page.getByText(/no recording exists/i)).toBeVisible();
  });

  test('agents page shows agent statuses', async ({ page }) => {
    await page.goto('/app/call-centre/agents');
    // Should show demo statuses
    await expect(page.getByText(/demo/i).first()).toBeVisible();
  });

  test('supervisor dashboard shows metrics', async ({ page }) => {
    await page.goto('/app/call-centre/supervisor');
    await expect(page.getByText(/demo/i).first()).toBeVisible();
  });
});
