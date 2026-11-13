import { test, expect } from '@playwright/test';

test('desktop optional smoothing, native hash/history and preference cleanup', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-scroll', 'smooth');
  await page.getByRole('link', { name: 'How we think' }).click();
  await expect(page).toHaveURL(/#principles$/);
  const top = await page
    .locator('#principles')
    .evaluate((el) => el.getBoundingClientRect().top);
  expect(top).toBeGreaterThanOrEqual(87);
  expect(top).toBeLessThan(160);
  await page.goBack();
  await expect(page).not.toHaveURL(/#principles$/);
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('html')).toHaveAttribute('data-scroll', 'native');
  await expect(page.locator('html')).not.toHaveClass(/lenis/);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect(page.locator('html')).toHaveAttribute('data-scroll', 'smooth');
  await page.setViewportSize({ width: 390, height: 780 });
  await expect(page.locator('html')).toHaveAttribute('data-scroll', 'native');
});

test('nested native scroller remains independent of page wheel enhancement', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-scroll', 'smooth');
  await page.evaluate(() => {
    const region = document.createElement('div');
    region.id = 'test-scroller';
    region.dataset.lenisPrevent = '';
    region.style.cssText =
      'position:fixed;top:150px;left:100px;width:200px;height:100px;overflow:auto;z-index:100;background:#171126';
    const content = document.createElement('div');
    content.style.height = '600px';
    content.textContent = 'Test-only nested scroll region';
    region.append(content);
    document.body.append(region);
  });
  await page.mouse.move(150, 190);
  await page.mouse.wheel(0, 250);
  await expect
    .poll(() => page.locator('#test-scroller').evaluate((el) => el.scrollTop))
    .toBeGreaterThan(0);
  expect(await page.evaluate(() => scrollY)).toBe(0);
});

test('touch/reduced motion do not download Lenis and content stays visible', async ({
  browser,
}) => {
  for (const options of [
    { hasTouch: true },
    { reducedMotion: 'reduce' as const },
  ]) {
    const context = await browser.newContext({
      ...options,
      viewport: { width: 1440, height: 900 },
    });
    const page = await context.newPage();
    const requests: string[] = [];
    page.on('request', (request) => requests.push(request.url()));
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('data-scroll', 'native');
    await expect(page.locator('h1')).toBeVisible();
    expect(
      requests.filter(
        (url) => url.includes('smooth-scroll') && url.endsWith('.js'),
      ),
    ).toEqual([]);
    await context.close();
  }
});
