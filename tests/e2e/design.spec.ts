import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('component gallery contrast, semantics, font loading and narrow layouts', async ({
  page,
}) => {
  await page.goto('/review/components/');
  await page.evaluate(() => document.fonts.ready);
  expect(
    await page.evaluate(
      () =>
        document.fonts.check('600 20px "Space Grotesk"') &&
        document.fonts.check('400 16px Inter'),
    ),
  ).toBe(true);
  for (const width of [320, 375, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  const result = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
    .analyze();
  expect(result.violations).toEqual([]);
  for (const button of await page.locator('.button').all()) {
    expect(
      await button.evaluate((el) => getComputedStyle(el).borderRadius),
    ).toBe('0px');
  }
  await page.getByRole('link', { name: 'Explore CurioX' }).focus();
  expect(
    await page
      .getByRole('link', { name: 'Explore CurioX' })
      .evaluate((el) => getComputedStyle(el).outlineStyle),
  ).not.toBe('none');
});
