import { test, expect } from '@playwright/test';

test('release output runs under actual prepared CSP and static headers', async ({
  page,
  request,
}) => {
  for (const path of ['/', '/products/', '/about/', '/contact/']) {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.addInitScript(() => {
      (window as unknown as { cspViolations: string[] }).cspViolations = [];
      document.addEventListener('securitypolicyviolation', (event) =>
        (window as unknown as { cspViolations: string[] }).cspViolations.push(
          event.violatedDirective,
        ),
      );
    });
    const response = await page.goto(`http://127.0.0.1:4322${path}`);
    const headers = response!.headers();
    expect(headers['x-content-type-options']).toBe('nosniff');
    expect(headers['x-frame-options']).toBe('DENY');
    expect(headers['content-security-policy']).toContain('sha256-');
    expect(headers['content-security-policy']).not.toContain('unsafe-inline');
    expect(headers['x-robots-tag']).toBeUndefined();
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('html')).toHaveAttribute('data-scroll', 'smooth');
    expect(
      await page.evaluate(
        () => (window as unknown as { cspViolations: string[] }).cspViolations,
      ),
    ).toEqual([]);
    expect(errors).toEqual([]);
  }
  await page.setViewportSize({ width: 320, height: 780 });
  await page.goto('http://127.0.0.1:4322/');
  const toggle = page.locator('.menu-toggle');
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(toggle).toBeFocused();
  expect(
    (await request.get('http://127.0.0.1:4322/review/components/')).status(),
  ).toBe(404);
  expect((await request.get('http://127.0.0.1:4322/unknown/')).status()).toBe(
    404,
  );
  const script = await page.locator('script[src]').first().getAttribute('src');
  const asset = await request.get(`http://127.0.0.1:4322${script}`);
  expect(asset.headers()['cache-control']).toBe(
    'public, max-age=31536000, immutable',
  );
  const font = await request.get(
    'http://127.0.0.1:4322/fonts/inter-latin.woff2',
  );
  expect(font.headers()['cache-control']).toBe('public, max-age=86400');
  for (const host of [
    'curiox-test.pages.dev',
    'branch.curiox-test.pages.dev',
  ]) {
    const preview = await request.get('http://127.0.0.1:4322/', {
      headers: { Host: host },
    });
    expect(preview.headers()['x-robots-tag']).toContain('noindex');
  }
});
