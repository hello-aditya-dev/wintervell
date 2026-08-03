/**
 * Standalone overflow and accessibility check script.
 * Uses a single browser instance, serial execution.
 */
/* eslint-disable @typescript-eslint/no-require-imports -- CJS script using require() is intentional */
const { chromium } = require('playwright');
const fs = require('fs');

const BASE = process.env.BASE_URL ?? 'http://127.0.0.1:3000';

const VIEWPORTS = [
  { name: '375x812', w: 375, h: 812 },
  { name: '390x844', w: 390, h: 844 },
  { name: '430x932', w: 430, h: 932 },
  { name: '768x1024', w: 768, h: 1024 },
  { name: '1024x768', w: 1024, h: 768 },
  { name: '1280x800', w: 1280, h: 800 },
  { name: '1440x900', w: 1440, h: 900 },
];

const ROUTES = [
  '/', '/pricing', '/contact', '/product', '/white-label',
  '/due-diligence', '/license', '/sample-report',
  '/app', '/app/prospects', '/app/audits', '/app/reports',
  '/app/proposals', '/app/pipeline', '/app/tasks', '/app/services',
  '/app/settings/branding', '/app/settings/team', '/app/settings/integrations',
  '/app/prospects/prospect-1', '/app/audits/audit-1', '/app/reports/report-1',
  '/app/proposals/proposal-1',
];

async function main() {
  const browser = await chromium.launch();
  const overflowIssues = [];
  const a11yResults = {};

  // ─── Task 7: Overflow checks ───
  console.log('\n═══ TASK 7: OVERFLOW VERIFICATION ═══\n');
  
  for (const vp of VIEWPORTS) {
    for (const route of ROUTES) {
      const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h } });
      const page = await ctx.newPage();
      
      try {
        await page.goto(`${BASE}${route}`, { waitUntil: 'domcontentloaded', timeout: 15000 });
        await page.waitForTimeout(800);
        
        const result = await page.evaluate(() => ({
          docOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
          bodyOverflow: document.body.scrollWidth > document.body.clientWidth,
          docScroll: document.documentElement.scrollWidth,
          docClient: document.documentElement.clientWidth,
          bodyScroll: document.body.scrollWidth,
          bodyClient: document.body.clientWidth,
        }));
        
        if (result.docOverflow || result.bodyOverflow) {
          const issue = { route, viewport: vp.name, ...result };
          overflowIssues.push(issue);
          console.log(`  ❌ OVERFLOW: ${route} @ ${vp.name} (doc: ${result.docScroll}/${result.docClient}, body: ${result.bodyScroll}/${result.bodyClient})`);
        } else {
          process.stdout.write(`  ✓ ${route} @ ${vp.name}\n`);
        }
      } catch (e) {
        console.log(`  ⚠ ERROR: ${route} @ ${vp.name}: ${e.message?.slice(0, 80)}`);
      }
      
      await ctx.close();
    }
  }

  console.log(`\nOverflow issues found: ${overflowIssues.length}`);
  if (overflowIssues.length > 0) {
    console.log('Issues:', JSON.stringify(overflowIssues, null, 2));
  }

  // ─── Task 8: Accessibility checks ───
  console.log('\n═══ TASK 8: ACCESSIBILITY VERIFICATION ═══\n');
  
  const a11yCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const a11yPage = await a11yCtx.newPage();

  // 8a. Skip link
  console.log('\n--- 8a. Skip Link ---');
  try {
    await a11yPage.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await a11yPage.waitForTimeout(500);
    
    const skipLink = a11yPage.locator('a.skip-link');
    const skipExists = await skipLink.count();
    a11yResults.skipLink = { exists: skipExists > 0 };
    
    if (skipExists > 0) {
      const href = await skipLink.getAttribute('href');
      const text = await skipLink.textContent();
      a11yResults.skipLink.href = href;
      a11yResults.skipLink.text = text?.trim();
      console.log(`  ✓ Skip link found: href="${href}", text="${text?.trim()}"`);
      
      // Tab to focus skip link
      await a11yPage.keyboard.press('Tab');
      const isFocused = await skipLink.evaluate(el => el === document.activeElement);
      a11yResults.skipLink.focusable = isFocused;
      console.log(`  ${isFocused ? '✓' : '❌'} Skip link focusable on Tab: ${isFocused}`);
    } else {
      console.log('  ❌ Skip link NOT found');
    }
  } catch (e) {
    console.log(`  ⚠ Error checking skip link: ${e.message}`);
  }

  // 8b. Main content target
  console.log('\n--- 8b. Main Content Target ---');
  try {
    const mainExists = await a11yPage.evaluate(() => !!document.getElementById('main-content'));
    a11yResults.mainTarget = mainExists;
    console.log(`  ${mainExists ? '✓' : '❌'} #main-content target exists: ${mainExists}`);
  } catch (e) {
    console.log(`  ⚠ Error: ${e.message}`);
  }

  // 8c. Landmarks on key pages
  console.log('\n--- 8c. Landmarks ---');
  const landmarkPages = ['/', '/pricing', '/contact', '/product', '/app'];
  a11yResults.landmarks = {};
  for (const route of landmarkPages) {
    try {
      await a11yPage.goto(`${BASE}${route}`, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await a11yPage.waitForTimeout(500);
      
      const landmarks = await a11yPage.evaluate(() => ({
        main: !!document.querySelector('main'),
        nav: document.querySelectorAll('nav').length,
        headerBanner: !!document.querySelector('header[role="banner"]'),
        footerInfo: !!document.querySelector('footer[role="contentinfo"]'),
        header: !!document.querySelector('header'),
        footer: !!document.querySelector('footer'),
      }));
      
      a11yResults.landmarks[route] = landmarks;
      const ok = landmarks.main && landmarks.nav > 0 && landmarks.header && landmarks.footer;
      console.log(`  ${ok ? '✓' : '❌'} ${route}: main=${landmarks.main}, nav=${landmarks.nav}, header[role=banner]=${landmarks.headerBanner}, footer[role=contentinfo]=${landmarks.footerInfo}`);
    } catch (e) {
      console.log(`  ⚠ ${route}: ${e.message?.slice(0, 80)}`);
    }
  }

  // 8d. Single H1 per page
  console.log('\n--- 8d. Single H1 per Page ---');
  const h1Pages = ['/', '/pricing', '/contact', '/product', '/white-label', '/due-diligence', '/license', '/sample-report', '/app', '/app/prospects', '/app/audits', '/app/reports'];
  a11yResults.h1 = {};
  for (const route of h1Pages) {
    try {
      await a11yPage.goto(`${BASE}${route}`, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await a11yPage.waitForTimeout(500);
      
      const h1Count = await a11yPage.evaluate(() => document.querySelectorAll('h1').length);
      a11yResults.h1[route] = h1Count;
      console.log(`  ${h1Count === 1 ? '✓' : '❌'} ${route}: h1 count = ${h1Count}`);
    } catch (e) {
      console.log(`  ⚠ ${route}: ${e.message?.slice(0, 80)}`);
    }
  }

  // 8e. Form labels on /contact
  console.log('\n--- 8e. Form Labels on /contact ---');
  try {
    await a11yPage.goto(`${BASE}/contact`, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await a11yPage.waitForTimeout(500);
    
    const labelCheck = await a11yPage.evaluate(() => {
      const inputs = document.querySelectorAll('input:not([type="hidden"]):not([tabindex="-1"]), textarea, select');
      const results = [];
      inputs.forEach((input) => {
        const id = input.id;
        const tagName = input.tagName.toLowerCase();
        if (!id) {
          results.push({ id: '(no id)', tag: tagName, hasLabel: false });
          return;
        }
        const label = document.querySelector(`label[for="${id}"]`);
        results.push({ id, tag: tagName, hasLabel: label !== null, labelText: label?.textContent?.trim() });
      });
      return results;
    });
    
    a11yResults.formLabels = labelCheck;
    const unlabeled = labelCheck.filter(r => !r.hasLabel);
    if (unlabeled.length === 0) {
      console.log(`  ✓ All ${labelCheck.length} form controls have associated labels`);
    } else {
      console.log(`  ❌ ${unlabeled.length} unlabeled controls:`, JSON.stringify(unlabeled));
    }
  } catch (e) {
    console.log(`  ⚠ Error: ${e.message}`);
  }

  // 8f. Focus indicators
  console.log('\n--- 8f. Focus Indicators ---');
  try {
    await a11yPage.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await a11yPage.waitForTimeout(500);
    
    // Check CSS defines :focus-visible
    const focusVisibleInCSS = await a11yPage.evaluate(() => {
      const sheets = document.styleSheets;
      let found = false;
      try {
        for (let i = 0; i < sheets.length; i++) {
          try {
            const rules = sheets[i].cssRules;
            for (let j = 0; j < rules.length; j++) {
              if (rules[j].cssText && rules[j].cssText.includes(':focus-visible')) {
                found = true;
                break;
              }
            }
          } catch {}
          if (found) break;
        }
      } catch {}
      return found;
    });
    
    a11yResults.focusVisible = focusVisibleInCSS;
    console.log(`  ${focusVisibleInCSS ? '✓' : '❌'} :focus-visible CSS rules found: ${focusVisibleInCSS}`);
  } catch (e) {
    console.log(`  ⚠ Error: ${e.message}`);
  }

  // 8g. Reduced motion
  console.log('\n--- 8g. Reduced Motion ---');
  try {
    // Check CSS has reduced motion media query
    const reducedMotionCSS = await a11yPage.evaluate(() => {
      const sheets = document.styleSheets;
      let found = false;
      try {
        for (let i = 0; i < sheets.length; i++) {
          try {
            const rules = sheets[i].cssRules;
            for (let j = 0; j < rules.length; j++) {
              const rule = rules[j];
              if (rule.media && rule.media.mediaText && rule.media.mediaText.includes('prefers-reduced-motion')) {
                found = true;
                break;
              }
            }
          } catch {}
          if (found) break;
        }
      } catch {}
      return found;
    });
    
    a11yResults.reducedMotionCSS = reducedMotionCSS;
    console.log(`  ${reducedMotionCSS ? '✓' : '❌'} prefers-reduced-motion CSS rules found: ${reducedMotionCSS}`);
  } catch (e) {
    console.log(`  ⚠ Error: ${e.message}`);
  }

  // Test with reduced motion context
  try {
    const rmCtx = await browser.newContext({ 
      viewport: { width: 1280, height: 800 },
      reducedMotion: 'reduce',
    });
    const rmPage = await rmCtx.newPage();
    await rmPage.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await rmPage.waitForTimeout(500);
    
    const scrollBehavior = await rmPage.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior);
    a11yResults.reducedMotionScrollBehavior = scrollBehavior;
    console.log(`  ${scrollBehavior === 'auto' ? '✓' : '⚠'} scroll-behavior with reduced motion: "${scrollBehavior}" (expected "auto")`);
    
    await rmCtx.close();
  } catch (e) {
    console.log(`  ⚠ Reduced motion context test error: ${e.message}`);
  }

  // 8h. Lang attribute
  console.log('\n--- 8h. Lang Attribute ---');
  try {
    await a11yPage.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await a11yPage.waitForTimeout(500);
    const lang = await a11yPage.evaluate(() => document.documentElement.lang);
    a11yResults.lang = lang;
    console.log(`  ${lang === 'en' ? '✓' : '❌'} html lang="${lang}"`);
  } catch (e) {
    console.log(`  ⚠ Error: ${e.message}`);
  }

  // 8i. Images have alt text
  console.log('\n--- 8i. Image Alt Text ---');
  try {
    const imgAlt = await a11yPage.evaluate(() => {
      const imgs = document.querySelectorAll('img');
      return Array.from(imgs).map(img => ({
        src: img.src?.slice(0, 60),
        hasAlt: img.hasAttribute('alt'),
        alt: img.getAttribute('alt'),
      }));
    });
    a11yResults.imgAlt = imgAlt;
    const missingAlt = imgAlt.filter(i => !i.hasAlt);
    if (missingAlt.length === 0) {
      console.log(`  ✓ All ${imgAlt.length} images have alt attributes`);
    } else {
      console.log(`  ❌ ${missingAlt.length} images missing alt:`, JSON.stringify(missingAlt));
    }
  } catch (e) {
    console.log(`  ⚠ Error: ${e.message}`);
  }

  await a11yCtx.close();
  await browser.close();

  // ─── Summary ───
  console.log('\n═══ SUMMARY ═══\n');
  console.log(`Overflow issues: ${overflowIssues.length}`);
  console.log(`A11y results: ${JSON.stringify(a11yResults, null, 2)}`);
  
  // Output JSON for the report
  const report = { overflowIssues, a11yResults };
  fs.writeFileSync('/tmp/overflow-a11y-report.json', JSON.stringify(report, null, 2));
  console.log('\nReport saved to /tmp/overflow-a11y-report.json');
}

main().catch(e => { console.error(e); process.exit(1); });
