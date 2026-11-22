import { test, expect } from '@playwright/test';

test('desktop Products eases in and out and respects reduced motion', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  const panel = page.locator('.products-dropdown');
  await page.locator('header summary').hover();
  await expect
    .poll(() =>
      panel.evaluate((el) => {
        const animation = el.getAnimations()[0];
        if (!animation) return null;
        animation.pause();
        return animation.effect?.getTiming().easing;
      }),
    )
    .toBe('ease-in-out');
  await panel.evaluate((el) => el.getAnimations()[0].finish());
  await panel.evaluate((el) => {
    const animate = el.animate.bind(el);
    el.animate = (...args) => {
      const animation = animate(...args);
      animation.pause();
      return animation;
    };
  });
  await page.mouse.move(200, 450);
  await expect
    .poll(() =>
      panel.evaluate((el) => {
        const animation = el.getAnimations()[0];
        if (!animation || animation.playState === 'finished') return null;
        animation.pause();
        const effect = animation.effect as KeyframeEffect;
        return {
          easing: effect.getTiming().easing,
          opacity: Number(effect.getKeyframes().at(-1)?.opacity),
        };
      }),
    )
    .toEqual({ easing: 'ease-in-out', opacity: 0 });
  await panel.evaluate((el) => el.getAnimations()[0].finish());
  await expect(panel).toBeHidden();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.locator('header summary').hover();
  await expect(panel).toBeVisible();
  expect(await panel.evaluate((el) => el.getAnimations().length)).toBe(0);
});

test('desktop Products opens on hover across the full header width without arrows', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const summary = page.locator('header summary');
    const panel = page.locator('.products-dropdown');
    await summary.hover();
    await expect(panel).toBeVisible();
    const bounds = await panel.boundingBox();
    expect(bounds!.x).toBeCloseTo(0, 0);
    expect(bounds!.width).toBeCloseTo(width, 0);
    await panel.getByRole('link', { name: 'Smriti', exact: true }).hover();
    await expect(panel).toBeVisible();
    await expect(panel.locator('.product-nav-arrow')).toHaveCount(0);
    await page.mouse.move(200, 450);
    await expect(panel).toBeHidden();
    await summary.focus();
    await page.keyboard.press('Enter');
    await expect(panel).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(panel).toBeHidden();
  }
});

test('header hides down, returns up and stays available for keyboard and menus', async ({
  page,
}) => {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 600 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    const header = page.locator('header');
    await page.mouse.move(200, 350);
    await page.mouse.wheel(0, 300);
    await expect(header).toHaveAttribute('data-scroll-hidden', 'true');
    await expect
      .poll(() => header.evaluate((el) => el.getBoundingClientRect().bottom))
      .toBeLessThanOrEqual(0);
    await page.mouse.wheel(0, -120);
    await expect(header).toHaveAttribute('data-scroll-hidden', 'false');
    await page.mouse.wheel(0, 240);
    await expect(header).toHaveAttribute('data-scroll-hidden', 'true');
    await header.locator('.wordmark').focus();
    await expect(header).toHaveAttribute('data-scroll-hidden', 'false');
    if (width < 1024) {
      await header.locator('.menu-toggle').click();
      await page.evaluate(() => dispatchEvent(new Event('scroll')));
      await expect(header).toHaveAttribute('data-scroll-hidden', 'false');
      expect(
        await header.evaluate((el) => el.getBoundingClientRect().top),
      ).toBe(0);
      await page.keyboard.press('Escape');
    } else {
      await header.locator('summary').click();
      await header.getByRole('link', { name: 'Smriti', exact: true }).hover();
      await page.mouse.wheel(0, 120);
      await expect(header).toHaveAttribute('data-scroll-hidden', 'false');
      await page.keyboard.press('Escape');
    }
    await page.evaluate(() => scrollTo(0, 0));
    await expect(header).toHaveAttribute('data-scroll-hidden', 'false');
  }
});

test('mobile logo and toggle keep their position across menu and Products states', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [320, 390, 820, 1023]) {
    await page.setViewportSize({ width, height: 780 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(() => scrollTo(0, 200));
    await page.locator('.menu-toggle').focus();
    const controls = page.locator('header .wordmark, .menu-toggle');
    const positions = () =>
      controls.evaluateAll((elements) =>
        elements.map((element) => {
          const { x, y, width, height } = element.getBoundingClientRect();
          return { x, y, width, height };
        }),
      );
    const closed = await positions();
    await page.locator('.menu-toggle').click();
    const opened = await positions();
    await page.locator('header summary').click();
    const expanded = await positions();
    await expect(page.locator('.products-dropdown')).not.toContainText(
      'Products',
    );
    await expect(page.locator('.dropdown-label')).toHaveCount(0);
    await page.locator('.menu-toggle').click();
    const reclosed = await positions();
    for (const state of [opened, expanded, reclosed]) {
      state.forEach((control, index) => {
        for (const key of ['x', 'y', 'width', 'height'] as const)
          expect(
            Math.abs(control[key] - closed[index][key]),
            `${width}px ${key}`,
          ).toBeLessThanOrEqual(0.5);
      });
    }
  }
});

test('mobile full-screen navigation supports keyboard, Escape and restoration', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 780 });
  await page.goto('/');
  const toggle = page.locator('button[aria-controls="main-navigation"]');
  const nav = page.getByRole('navigation', { name: 'Main', exact: true });
  await expect(nav).toBeHidden();
  await toggle.focus();
  await page.keyboard.press('Enter');
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  expect(
    await page
      .locator('header')
      .evaluate((el) => Math.round(el.getBoundingClientRect().height)),
  ).toBe(780);
  await expect(page.locator('main')).toHaveAttribute('inert', '');
  await page.keyboard.press('Tab');
  await expect(nav.locator('summary')).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(toggle).toBeFocused();
  await expect(nav).toBeHidden();
  await toggle.click();
  await toggle.click();
  await expect(nav).toBeHidden();
  await toggle.click();
  await nav.getByRole('link', { name: 'About', exact: true }).click();
  await expect(page).toHaveURL(/\/about\//);
  await page.goBack();
  await expect(page.locator('h1')).toBeVisible();
});

test('Products expands within the mobile menu; focus and scrolling stay contained', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 600 });
  await page.goto('/');
  const toggle = page.locator('.menu-toggle');
  const nav = page.getByRole('navigation', { name: 'Main', exact: true });
  await toggle.click();
  const products = nav.locator('summary');
  await products.click();
  await expect(products).toHaveAttribute('aria-expanded', 'true');
  await expect(
    nav.getByRole('link', { name: 'Smriti', exact: true }),
  ).toBeVisible();
  expect(
    await page.locator('html').evaluate((el) => getComputedStyle(el).overflow),
  ).toBe('hidden');
  await page.setViewportSize({ width: 390, height: 320 });
  await nav.hover();
  await page.mouse.wheel(0, 350);
  await expect
    .poll(() => nav.evaluate((el) => el.scrollTop))
    .toBeGreaterThan(0);
  expect(await page.evaluate(() => scrollY)).toBe(0);
  await nav.getByRole('link', { name: 'Contact', exact: true }).focus();
  await page.keyboard.press('Tab');
  await expect(page.locator('header .wordmark')).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(
    nav.getByRole('link', { name: 'Contact', exact: true }),
  ).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(products).toBeFocused();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(toggle).toBeFocused();
  await expect(page.locator('main')).not.toHaveAttribute('inert', '');
  await toggle.click();
  await products.click();
  await nav.getByRole('link', { name: 'Smriti', exact: true }).click();
  await expect(page).toHaveURL(/\/products\/smriti\/$/);
  await expect(page.locator('#smriti-heading')).toBeInViewport();
  await expect(page.locator('html')).not.toHaveAttribute('data-menu-open', '');
});

test('desktop Products disclosure closes outside and on Escape; resizing resets the mobile menu', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const products = page.locator('header summary');
  await products.click();
  await expect(page.locator('.products-disclosure')).toHaveAttribute(
    'open',
    '',
  );
  await page.locator('h1').click();
  await expect(page.locator('.products-disclosure')).not.toHaveAttribute(
    'open',
    '',
  );
  await products.focus();
  await page.keyboard.press('Enter');
  await page.keyboard.press('Escape');
  await expect(products).toBeFocused();
  await page.setViewportSize({ width: 820, height: 900 });
  await page.locator('.menu-toggle').click();
  await page.setViewportSize({ width: 1280, height: 900 });
  await expect(page.locator('.menu-toggle')).toBeHidden();
  await expect(page.locator('main')).not.toHaveAttribute('inert', '');
  await expect(page.locator('html')).not.toHaveAttribute('data-menu-open', '');
});

test('skip link reaches main and desktop navigation fits', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(
    page.getByRole('link', { name: 'Skip to content' }),
  ).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  for (const width of [320, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 780 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
});
