import fs from 'node:fs';
import { chromium, firefox, webkit } from '@playwright/test';

const phase = process.argv[2] ?? '11';
const gallery = process.argv.includes('--gallery');
const routes = gallery
  ? [['gallery', '/review/components/']]
  : [
      ['home', '/'],
      ['products', '/products/'],
      ['about', '/about/'],
      ['contact', '/contact/'],
      ['404', '/404.html'],
    ];
const widths = gallery
  ? [320, 375, 768, 1440]
  : phase === '01'
    ? [320, 1440]
    : phase === '06'
      ? [
          320, 360, 375, 390, 430, 480, 640, 768, 820, 1024, 1280, 1440, 1920,
          2560,
        ]
      : [320, 390, 768, 1440, 1920];
const browserTypes = process.argv.includes('--all-browsers')
  ? { chromium, firefox, webkit }
  : { chromium };
for (const [browserName, browserType] of Object.entries(browserTypes)) {
  const directory = `test-artifacts/phase-${phase}${browserName === 'chromium' ? '' : '/' + browserName}`;
  fs.mkdirSync(directory, { recursive: true });
  const browser = await browserType.launch();
  for (const [name, path] of routes) {
    for (const width of widths) {
      const page = await browser.newPage({
        viewport: { width, height: 960 },
        reducedMotion: 'reduce',
      });
      await page.goto(`http://127.0.0.1:4321${path}`);
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({
        path: `${directory}/${name}-${width}.png`,
        fullPage: true,
      });
      if (name === 'home' && (await page.locator('.hero').count()))
        await page
          .locator('.hero')
          .screenshot({ path: `${directory}/hero-${width}.png` });
      await page.close();
    }
  }
  await browser.close();
  console.log(`Screenshots saved in ${directory}`);
}
