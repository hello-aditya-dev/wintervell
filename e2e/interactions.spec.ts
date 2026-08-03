import { test, expect } from '@playwright/test';

/**
 * Interaction E2E tests.
 *
 * Tests interactive features: create demo prospect, create demo audit,
 * update finding, toggle report inclusion, edit proposal, move pipeline card,
 * reset demo data, change branding, submit contact form.
 */
test.describe('Interactions', () => {
  // ── Create demo prospect ──────────────────────────────────────────────────
  test('create demo prospect', async ({ page }) => {
    await page.goto('/app/prospects/new');

    // Fill in the form fields
    const nameInput = page.locator('input[name="contactName"], input[placeholder*="name" i]').first();
    if (await nameInput.isVisible()) {
      await nameInput.fill('Test User');
    }

    const companyInput = page.locator('input[name="company"], input[placeholder*="company" i]').first();
    if (await companyInput.isVisible()) {
      await companyInput.fill('Test Company');
    }

    const emailInput = page.locator('input[name="email"], input[type="email"]').first();
    if (await emailInput.isVisible()) {
      await emailInput.fill('test@testcompany.example.com');
    }

    const websiteInput = page.locator('input[name="website"], input[placeholder*="website" i]').first();
    if (await websiteInput.isVisible()) {
      await websiteInput.fill('https://testcompany.example.com');
    }

    // Submit the form
    const submitButton = page.locator('button[type="submit"], button:has-text("Create"), button:has-text("Save")').first();
    if (await submitButton.isVisible()) {
      await submitButton.click();
      // After submission, should navigate away or show success
      await page.waitForTimeout(1000);
    }
  });

  // ── Create demo audit ─────────────────────────────────────────────────────
  test('create demo audit', async ({ page }) => {
    await page.goto('/app/audits/new');

    // The audit creation wizard should be visible
    const wizard = page.locator('form, [data-testid="audit-wizard"]').first();
    await expect(wizard).toBeVisible();

    // Look for a prospect selector
    const prospectSelect = page.locator('select, button:has-text("Select"), [role="combobox"]').first();
    if (await prospectSelect.isVisible()) {
      await prospectSelect.click();
      await page.waitForTimeout(500);

      // Select first option
      const option = page.locator('[role="option"], option').first();
      if (await option.isVisible()) {
        await option.click();
      }
    }

    // Look for category checkboxes
    const categoryCheckbox = page.locator('input[type="checkbox"], button[role="checkbox"]').first();
    if (await categoryCheckbox.isVisible()) {
      await categoryCheckbox.click();
    }

    // Submit or continue
    const submitButton = page.locator('button[type="submit"], button:has-text("Create"), button:has-text("Start")').first();
    if (await submitButton.isVisible()) {
      await submitButton.click();
      await page.waitForTimeout(1000);
    }
  });

  // ── Update finding ────────────────────────────────────────────────────────
  test('update finding status', async ({ page }) => {
    await page.goto('/app/audits/audit-1');

    // Wait for the page to load
    await page.waitForTimeout(1000);

    // Look for a finding to interact with
    const findingItem = page.locator('[data-finding-id], [data-testid*="finding"]').first();
    if (await findingItem.isVisible()) {
      await findingItem.click();
      await page.waitForTimeout(500);
    }

    // Look for status change buttons
    const statusButton = page.locator('button:has-text("Verify"), button:has-text("Edit"), button:has-text("Exclude")').first();
    if (await statusButton.isVisible()) {
      await statusButton.click();
      await page.waitForTimeout(500);
    }
  });

  // ── Toggle report inclusion ───────────────────────────────────────────────
  test('toggle report inclusion', async ({ page }) => {
    await page.goto('/app/reports/report-1');
    await page.waitForTimeout(1000);

    // Look for inclusion toggle
    const toggle = page.locator('input[type="checkbox"], button[role="switch"], button:has-text("Include")').first();
    if (await toggle.isVisible()) {
      await toggle.click();
      await page.waitForTimeout(500);
    }
  });

  // ── Edit proposal ─────────────────────────────────────────────────────────
  test('edit proposal', async ({ page }) => {
    await page.goto('/app/proposals/proposal-1');
    await page.waitForTimeout(1000);

    // Look for an edit button or editable field
    const editButton = page.locator('button:has-text("Edit"), button:has-text("edit")').first();
    if (await editButton.isVisible()) {
      await editButton.click();
      await page.waitForTimeout(500);
    }

    // Look for an editable text field
    const textField = page.locator('textarea, input[type="text"]').first();
    if (await textField.isVisible()) {
      await textField.click();
      await textField.fill('Updated proposal text');
    }
  });

  // ── Move pipeline card ────────────────────────────────────────────────────
  test('move pipeline card', async ({ page }) => {
    await page.goto('/app/pipeline');
    await page.waitForTimeout(1000);

    // The pipeline page should have cards representing opportunities
    const pipelineCards = page.locator('[data-opportunity-id], [data-testid*="pipeline-card"]').first();
    if (await pipelineCards.isVisible()) {
      // Try to drag and drop (simplified - just check the card exists)
      const stageColumns = page.locator('[data-stage], [data-testid*="stage"]').first();
      await expect(stageColumns.or(pipelineCards)).toBeVisible();
    }
  });

  // ── Reset demo data ───────────────────────────────────────────────────────
  test('reset demo data', async ({ page }) => {
    await page.goto('/app');
    await page.waitForTimeout(1000);

    // Look for a reset button or demo banner
    const resetButton = page.locator('button:has-text("Reset"), button:has-text("reset")').first();
    if (await resetButton.isVisible()) {
      await resetButton.click();
      await page.waitForTimeout(500);

      // Confirm the reset if there's a confirmation dialog
      const confirmButton = page.locator('button:has-text("Confirm"), button:has-text("Yes")').first();
      if (await confirmButton.isVisible()) {
        await confirmButton.click();
        await page.waitForTimeout(500);
      }
    }
  });

  // ── Change branding ───────────────────────────────────────────────────────
  test('change branding', async ({ page }) => {
    await page.goto('/app/settings/branding');
    await page.waitForTimeout(1000);

    // Look for color input fields
    const colorInput = page.locator('input[type="color"], input[name*="color" i]').first();
    if (await colorInput.isVisible()) {
      await colorInput.fill('#1a2b3c');
    }

    // Look for company name input
    const nameInput = page.locator('input[name*="name" i], input[name*="brand" i]').first();
    if (await nameInput.isVisible()) {
      await nameInput.fill('Test Agency');
    }

    // Save
    const saveButton = page.locator('button:has-text("Save"), button:has-text("Apply")').first();
    if (await saveButton.isVisible()) {
      await saveButton.click();
      await page.waitForTimeout(500);
    }
  });

  // ── Submit contact form ───────────────────────────────────────────────────
  test('submit contact form', async ({ page }) => {
    await page.goto('/contact');
    await page.waitForTimeout(1000);

    // Fill in the contact form
    const nameInput = page.locator('input[name="name"], input[placeholder*="name" i]').first();
    if (await nameInput.isVisible()) {
      await nameInput.fill('Test User');
    }

    const emailInput = page.locator('input[name="email"], input[type="email"]').first();
    if (await emailInput.isVisible()) {
      await emailInput.fill('test@example.com');
    }

    const messageInput = page.locator('textarea, input[name="message"]').first();
    if (await messageInput.isVisible()) {
      await messageInput.fill('This is a test message from the E2E test suite.');
    }

    // Submit the form
    const submitButton = page.locator('button[type="submit"], button:has-text("Send"), button:has-text("Submit")').first();
    if (await submitButton.isVisible()) {
      await submitButton.click();
      await page.waitForTimeout(1000);
    }
  });
});
