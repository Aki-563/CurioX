import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import AxeBuilder from '@axe-core/playwright';

for (const path of ['/', '/products/', '/about/', '/contact/', '/404.html']) {
  test(`WCAG automated checks ${path}`, async ({ page }) => {
    for (const width of [320, 1440]) {
      await page.setViewportSize({ width, height: 960 });
      await page.goto(path);
      await page.evaluate(() => document.fonts.ready);
      const result = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze();
      expect(result.violations).toEqual([]);
    }
  });
}
test('mobile expanded navigation passes automated accessibility checks', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 780 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Menu', exact: true }).click();
  const result = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
    .analyze();
  expect(result.violations).toEqual([]);
});

test('landmarks, heading outline and decorative graphics expose clear semantics', async ({
  page,
}, info) => {
  for (const path of ['/', '/products/', '/about/', '/contact/', '/404.html']) {
    await page.goto(path);
    await expect(page.getByRole('main')).toHaveCount(1);
    await expect(page.getByRole('banner')).toHaveCount(1);
    await expect(page.getByRole('contentinfo')).toHaveCount(1);
    for (const svg of await page.locator('svg').all())
      expect(
        await svg.evaluate((el) => !!el.closest('[aria-hidden="true"]')),
      ).toBe(true);
    const levels = await page
      .locator('h1,h2,h3,h4,h5,h6')
      .evaluateAll((headings) =>
        headings.map((el) => Number(el.tagName.slice(1))),
      );
    expect(levels[0]).toBe(1);
    for (let i = 1; i < levels.length; i++)
      expect(levels[i] - levels[i - 1]).toBeLessThanOrEqual(1);
    const snapshot = await page.locator('body').ariaSnapshot();
    await info.attach(`semantics-${path.replaceAll('/', '') || 'home'}`, {
      body: snapshot,
      contentType: 'text/plain',
    });
    fs.mkdirSync('test-artifacts/semantics', { recursive: true });
    fs.writeFileSync(
      `test-artifacts/semantics/${info.project.name}-${path.replaceAll('/', '') || 'home'}.txt`,
      snapshot,
    );
  }
});

test('complete desktop tab order reaches every visible link with focus indicator', async ({
  page,
}) => {
  for (const path of ['/', '/products/', '/about/', '/contact/']) {
    await page.setViewportSize({ width: 1440, height: 960 });
    await page.goto(path);
    const targets = await page.locator('a,button,summary').all();
    for (const target of targets) {
      if (
        !(await target.isVisible()) &&
        !(await target.evaluate((el) => el.classList.contains('skip-link')))
      )
        continue;
      await page.keyboard.press('Tab');
      await expect(target).toBeFocused();
      const outline = await target.evaluate(
        (el) => getComputedStyle(el).outlineStyle,
      );
      expect(outline).not.toBe('none');
    }
  }
});

test('forced colors and reduced motion keep controls visible', async ({
  page,
}, info) => {
  await page.emulateMedia({ forcedColors: 'active', reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 320, height: 780 });
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-scroll', 'native');
  const cta = page.getByRole('link', { name: 'View products', exact: true });
  await cta.focus();
  expect(await cta.evaluate((el) => getComputedStyle(el).borderStyle)).toBe(
    'solid',
  );
  expect(
    await cta.evaluate((el) =>
      Number.parseFloat(getComputedStyle(el).transitionDuration),
    ),
  ).toBeLessThan(0.01);
  await page.screenshot({
    path: `test-artifacts/forced-colors-${info.project.name}.png`,
  });
});

test('actual primary button state colours meet contrast thresholds', async ({
  page,
}, info) => {
  await page.goto('/');
  const button = page.getByRole('link', {
    name: 'View products',
    exact: true,
  });
  const readings: { state: string; fg: string; bg: string; ratio: number }[] =
    [];
  const sample = async (state: string) => {
    const colors = await button.evaluate((el) => ({
      fg: getComputedStyle(el).color,
      bg: getComputedStyle(el).backgroundColor,
    }));
    const lum = (rgb: string) =>
      rgb
        .match(/[\d.]+/g)!
        .slice(0, 3)
        .map(Number)
        .map((c) => c / 255)
        .map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
        .reduce((sum, c, i) => sum + c * [0.2126, 0.7152, 0.0722][i], 0);
    const values = [lum(colors.fg), lum(colors.bg)].sort((a, b) => b - a);
    const ratio = (values[0] + 0.05) / (values[1] + 0.05);
    readings.push({ state, ...colors, ratio });
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  };
  await sample('normal');
  await button.hover();
  await page.waitForTimeout(180);
  await sample('hover');
  await page.mouse.down();
  await page.waitForTimeout(180);
  await sample('pressed');
  await page.mouse.move(5, 5);
  await page.mouse.up();
  await button.focus();
  await page.waitForTimeout(180);
  await sample('focus');
  fs.mkdirSync('test-artifacts', { recursive: true });
  fs.writeFileSync(
    `test-artifacts/button-contrast-${info.project.name}.json`,
    JSON.stringify(readings, null, 2),
  );
});
