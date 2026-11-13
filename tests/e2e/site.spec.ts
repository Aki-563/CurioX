import { test, expect } from '@playwright/test';

for (const path of ['/', '/about/', '/contact/', '/404.html']) {
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
  for (const path of ['/', '/about/', '/contact/']) {
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
