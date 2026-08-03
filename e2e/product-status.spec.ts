import { test, expect } from '@playwright/test';

test.describe('Product status page', () => {
  test('shows readiness scorecards', async ({ page }) => {
    await page.goto('/product-status');
    await page.waitForLoadState('networkidle');
    // Should show percentage values
    await expect(page.locator('text=%').first()).toBeVisible();
    // Should show readiness heading
    await expect(page.getByRole('heading', { name: /readiness scores/i })).toBeVisible();
    // Should show deployment readiness heading
    await expect(page.getByRole('heading', { name: /deployment readiness/i })).toBeVisible();
  });

  test('shows capability table', async ({ page }) => {
    await page.goto('/product-status');
    await page.waitForLoadState('networkidle');
    // Should show capability registry heading
    await expect(page.getByRole('heading', { name: /capability registry/i })).toBeVisible();
    // Should show table headers
    await expect(page.getByRole('columnheader', { name: /capability/i })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: /status/i })).toBeVisible();
  });

  test('shows deployment readiness warnings', async ({ page }) => {
    await page.goto('/product-status');
    await page.waitForLoadState('networkidle');
    await expect(page.getByText(/frontend can be deployed/i)).toBeVisible();
    await expect(page.getByText(/cannot yet operate/i)).toBeVisible();
  });

  test('shows status definitions', async ({ page }) => {
    await page.goto('/product-status');
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('heading', { name: /status definitions/i })).toBeVisible();
    // Check for a specific status definition badge
    await expect(page.getByText('Interactive Demo', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('Planned', { exact: true }).first()).toBeVisible();
  });
});
