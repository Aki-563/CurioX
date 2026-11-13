import { test, expect } from '@playwright/test';

const widths = [
  320, 360, 375, 390, 430, 480, 640, 768, 820, 1024, 1280, 1440, 1920, 2560,
];
for (const path of ['/', '/about/', '/contact/', '/404.html']) {
  test(`responsive sweep ${path}`, async ({ page }) => {
    await page.goto(path);
    await page.evaluate(() => document.fonts.ready);
    for (const width of widths) {
      await page.setViewportSize({ width, height: width < 768 ? 780 : 960 });
      const measurements = await page.evaluate(() => {
        const h1 = document.querySelector('h1')!.getBoundingClientRect();
        return {
          overflow: document.documentElement.scrollWidth - innerWidth,
          headingLeft: h1.left,
          headingRight: h1.right,
          container: document
            .querySelector('.container')!
            .getBoundingClientRect().width,
        };
      });
      expect(measurements.overflow, `${path} ${width}px`).toBeLessThanOrEqual(
        1,
      );
      expect(measurements.headingLeft).toBeGreaterThanOrEqual(0);
      expect(measurements.headingRight).toBeLessThanOrEqual(width + 1);
      expect(measurements.container).toBeLessThanOrEqual(1361);
    }
    for (const viewport of [
      { width: 640, height: 360 },
      { width: 820, height: 480 },
      { width: 320, height: 568 },
    ]) {
      await page.setViewportSize(viewport);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
      ).toBe(true);
    }
  });
}

test('text resize 200 percent and effective 200 percent desktop zoom reflow', async ({
  page,
}) => {
  for (const path of ['/', '/about/', '/contact/', '/404.html']) {
    await page.setViewportSize({ width: 640, height: 450 });
    await page.goto(path); // effective CSS viewport of 1280x900 at 200% browser zoom
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
    ).toBe(true);
    await page.setViewportSize({ width: 320, height: 780 });
    await page.evaluate(
      () => (document.documentElement.style.fontSize = '200%'),
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
      path,
    ).toBe(true);
    await page.evaluate(() => (document.documentElement.style.fontSize = ''));
  }
});

test('coarse touch targets and no-JS content remain usable', async ({
  browser,
  browserName,
}) => {
  const context = await browser.newContext({
    hasTouch: true,
    isMobile: browserName !== 'firefox',
    viewport: { width: 320, height: 780 },
  });
  const page = await context.newPage();
  await page.goto('/');
  await page.getByRole('button', { name: 'Menu', exact: true }).tap();
  for (const target of await page.locator('a:visible, button:visible').all()) {
    const box = await target.boundingBox();
    expect(box?.height).toBeGreaterThanOrEqual(44);
  }
  await page
    .getByRole('navigation', { name: 'Main', exact: true })
    .getByRole('link', { name: 'About', exact: true })
    .tap();
  await expect(page).toHaveURL(/\/about\//);
  await context.close();
});
