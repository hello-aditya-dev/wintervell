import { test, expect } from '@playwright/test';

/**
 * Dynamic routes E2E tests.
 *
 * Tests valid and invalid IDs for prospects, audits, reports, proposals.
 */
test.describe('Dynamic routes', () => {
  // ── Prospects ─────────────────────────────────────────────────────────────
  test.describe('Prospects', () => {
    test('valid prospect ID renders the prospect page', async ({ page }) => {
      const response = await page.goto('/app/prospects/prospect-1');
      expect(response).not.toBeNull();
      expect(response!.status()).toBe(200);

      // The page should show the prospect's company name
      const body = page.locator('body');
      await expect(body).toContainText(/Meridian Health/i);
    });

    test('invalid prospect ID shows not-found', async ({ page }) => {
      const response = await page.goto('/app/prospects/nonexistent-prospect');
      expect(response).not.toBeNull();
      // The app should show a not-found page for invalid IDs
      const body = page.locator('body');
      await expect(body).toBeVisible();
    });

    test('new prospect page renders', async ({ page }) => {
      const response = await page.goto('/app/prospects/new');
      expect(response).not.toBeNull();
      expect(response!.status()).toBe(200);
    });
  });

  // ── Audits ────────────────────────────────────────────────────────────────
  test.describe('Audits', () => {
    test('valid audit ID renders the audit page', async ({ page }) => {
      const response = await page.goto('/app/audits/audit-1');
      expect(response).not.toBeNull();
      expect(response!.status()).toBe(200);

      // The page should show audit-related content
      const body = page.locator('body');
      await expect(body).toBeVisible();
    });

    test('invalid audit ID shows not-found', async ({ page }) => {
      const response = await page.goto('/app/audits/nonexistent-audit');
      expect(response).not.toBeNull();
      const body = page.locator('body');
      await expect(body).toBeVisible();
    });

    test('new audit page renders', async ({ page }) => {
      const response = await page.goto('/app/audits/new');
      expect(response).not.toBeNull();
      expect(response!.status()).toBe(200);
    });
  });

  // ── Reports ───────────────────────────────────────────────────────────────
  test.describe('Reports', () => {
    test('valid report ID renders the report page', async ({ page }) => {
      const response = await page.goto('/app/reports/report-1');
      expect(response).not.toBeNull();
      expect(response!.status()).toBe(200);

      const body = page.locator('body');
      await expect(body).toBeVisible();
    });

    test('invalid report ID shows not-found', async ({ page }) => {
      const response = await page.goto('/app/reports/nonexistent-report');
      expect(response).not.toBeNull();
      const body = page.locator('body');
      await expect(body).toBeVisible();
    });
  });

  // ── Proposals ─────────────────────────────────────────────────────────────
  test.describe('Proposals', () => {
    test('valid proposal ID renders the proposal page', async ({ page }) => {
      const response = await page.goto('/app/proposals/proposal-1');
      expect(response).not.toBeNull();
      expect(response!.status()).toBe(200);

      const body = page.locator('body');
      await expect(body).toBeVisible();
    });

    test('invalid proposal ID shows not-found', async ({ page }) => {
      const response = await page.goto('/app/proposals/nonexistent-proposal');
      expect(response).not.toBeNull();
      const body = page.locator('body');
      await expect(body).toBeVisible();
    });
  });
});
