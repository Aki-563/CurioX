import { test, expect } from '@playwright/test';

test('secondary content reveals once with blur and stagger; reduced motion cancels effects', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1200 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/about/');
  const items = page.locator('.about-details > div');
  await expect(items).toHaveCount(2);
  expect(
    await items.first().evaluate((el) => getComputedStyle(el).filter),
  ).toBe('none');
  const pendingSamples = page.waitForFunction(() => {
    const animations = [
      ...document.querySelectorAll('.about-details > div'),
    ].map((el) => el.getAnimations()[0]);
    if (animations.length !== 2 || animations.some((animation) => !animation))
      return null;
    return animations.map((animation) => {
      animation.pause();
      return {
        delay: animation.effect?.getTiming().delay,
        frames: (animation.effect as KeyframeEffect | null)?.getKeyframes(),
      };
    });
  });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  const samples = (await (await pendingSamples).jsonValue())!;
  expect(samples[0].delay).toBe(0);
  expect(samples[1].delay).toBe(75);
  expect(samples[0].frames?.[0].filter).toBe('blur(4px)');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect
    .poll(() => items.first().evaluate((el) => el.getAnimations().length))
    .toBe(0);
  expect(
    await items.first().evaluate((el) => getComputedStyle(el).opacity),
  ).toBe('1');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  expect(await items.first().evaluate((el) => el.getAnimations().length)).toBe(
    0,
  );
});

test('glass header keeps its blur; product navigation works without JavaScript', async ({
  page,
  browser,
}) => {
  await page.goto('/');
  expect(
    await page
      .locator('header')
      .evaluate((el) => getComputedStyle(el).backdropFilter),
  ).toBe('blur(8px)');
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const fallback = await context.newPage();
  await fallback.goto('/');
  await fallback.locator('header summary').click();
  await fallback
    .getByRole('navigation', { name: 'Main', exact: true })
    .getByRole('link', { name: 'Smriti', exact: true })
    .click();
  await expect(fallback).toHaveURL(/\/products\/smriti\/$/);
  expect(
    await fallback
      .locator('#smriti-heading')
      .evaluate((el) => getComputedStyle(el).opacity),
  ).toBe('1');
  await context.close();
});

test('desktop optional smoothing, native hash/history and preference cleanup', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-scroll', 'smooth');
  await page.getByRole('link', { name: 'View products', exact: true }).click();
  await expect(page).toHaveURL(/#products$/);
  const top = await page
    .locator('#products')
    .evaluate((el) => el.getBoundingClientRect().top);
  expect(top).toBeGreaterThanOrEqual(87);
  expect(top).toBeLessThan(160);
  await page.goBack();
  await expect(page).not.toHaveURL(/#products$/);
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
