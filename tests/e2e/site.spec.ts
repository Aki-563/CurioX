import { test, expect } from '@playwright/test';

for (const path of [
  '/',
  '/products/',
  '/products/smriti/',
  '/products/smriti/privacy/',
  '/brand/',
  '/about/',
  '/contact/',
  '/404.html',
]) {
  test(`static content ${path}`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (message) => {
      if (message.type() === 'error' && path !== '/404.html')
        errors.push(message.text());
    });
    const failures: string[] = [];
    page.on('requestfailed', (request) => failures.push(request.url()));
    await page.goto(path);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('main')).toBeVisible();
    expect(errors).toEqual([]);
    expect(failures).toEqual([]);
    if (path === '/') {
      await expect(
        page.getByRole('heading', { level: 3, name: 'Smriti', exact: true }),
      ).toBeVisible();
      await expect(
        page.getByRole('link', { name: 'View products', exact: true }),
      ).toHaveAttribute('href', '#products');
      await expect(page.locator('main')).not.toContainText(
        'A question today. A possibility tomorrow.',
      );
    }
    if (path === '/products/') {
      await expect(
        page.getByRole('heading', { level: 2, name: 'Smriti', exact: true }),
      ).toBeVisible();
      await expect(page.locator('.product-card')).toHaveCount(1);
      await expect(page.locator('.product-card button')).toHaveCount(0);
      await expect(page.locator('.product-card a')).toHaveAttribute(
        'href',
        '/products/smriti/',
      );
      await expect(
        page
          .getByRole('navigation', { name: 'Main', exact: true })
          .locator('summary'),
      ).toHaveAttribute('aria-current', 'page');
    }
    if (path === '/products/smriti/') {
      await expect(page.locator('h1')).toHaveText('Smriti');
      const play = page.getByRole('link', { name: /Google Play/ });
      await expect(play).toHaveCount(2);
      for (const link of await play.all())
        await expect(link).toHaveAttribute(
          'href',
          'https://play.google.com/store/apps/details?id=com.connectingdots.smriti',
        );
      await expect(page.locator('main')).toContainText(
        'Google Play and the Google Play logo are trademarks of Google LLC.',
      );
      await expect(
        page
          .getByRole('navigation', { name: 'Main', exact: true })
          .locator('summary'),
      ).not.toHaveAttribute('aria-current', 'page');
    }
    if (path === '/brand/') {
      // 19 approved versions (SVG + PDF) and 13 transparent ones (SVG + PNG + PDF).
      await expect(page.locator('.brand-tile')).toHaveCount(32);
      await expect(page.locator('.brand-tile a[download]')).toHaveCount(77);
      await expect(
        page.getByRole('link', { name: /Download logo kit/ }),
      ).toHaveAttribute('href', '/brand/curiox-logo-kit.zip');
      await expect(
        page.getByRole('link', { name: /Logo overview \(PDF\)/ }),
      ).toHaveAttribute('href', '/brand/curiox-logo-overview.pdf');
    }
    // Approved logo lockup in header and footer; brand name is uppercase.
    await expect(page.locator('header .wordmark svg.logo-art')).toHaveCount(1);
    await expect(page.locator('footer .wordmark svg.logo-art')).toHaveCount(1);
    await expect(page.locator('header .wordmark')).toHaveAttribute(
      'aria-label',
      'CURIOX — Home',
    );
    expect(await page.locator('body').innerText()).not.toContain('CurioX');
  });
}

test('content and navigation survive JavaScript being disabled', async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 320, height: 780 },
  });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.locator('h1')).toBeVisible();
  await page
    .getByRole('navigation', { name: 'Main', exact: true })
    .getByRole('link', { name: 'About', exact: true })
    .click();
  await expect(page).toHaveURL(/\/about\//);
  await context.close();
});

test('public links and hash destinations resolve, with genuine unknown-route 404', async ({
  page,
  request,
}) => {
  for (const path of ['/', '/products/', '/about/', '/contact/']) {
    await page.goto(path);
    const hrefs = await page
      .locator('a[href]')
      .evaluateAll((links) => [
        ...new Set(links.map((link) => link.getAttribute('href')!)),
      ]);
    for (const href of hrefs) {
      if (href.startsWith('mailto:')) continue;
      const url = new URL(href, 'http://127.0.0.1:4321' + path);
      const response = await request.get(url.pathname);
      expect(response.ok(), href).toBe(true);
      if (url.hash) {
        const body = await response.text();
        expect(body, href).toContain(`id="${url.hash.slice(1)}"`);
      }
    }
  }
  const response = await page.goto('/this-route-does-not-exist/');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'A little off',
  );
});

test('contact uses approved email without collecting data on site', async ({
  page,
}) => {
  await page.goto('/contact/');
  await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
  await expect(page.locator('form, input, textarea')).toHaveCount(0);
  await expect(
    page.getByRole('link', { name: 'akileshprimary@gmail.com' }),
  ).toHaveAttribute('href', 'mailto:akileshprimary@gmail.com');
  await expect(page.locator('a[href^="tel:"]')).toHaveCount(0);
  await expect(page.locator('main')).toContainText('Opens your email app');
});
