import { test, expect } from '@playwright/test';

test('public metadata, schema and crawl inventory are consistent', async ({
  page,
  request,
}) => {
  const titles = new Set<string>();
  for (const path of ['/', '/about/', '/contact/']) {
    await page.goto(path);
    const title = await page.title();
    expect(titles.has(title)).toBe(false);
    titles.add(title);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `https://curiox.in${path}`,
    );
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
      'content',
      `https://curiox.in${path}`,
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      'content',
      'https://curiox.in/social-preview.png',
    );
    await expect(
      page.locator('meta[property="og:image:width"]'),
    ).toHaveAttribute('content', '1200');
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      'content',
      'summary_large_image',
    );
    await expect(page.locator('h1')).toHaveCount(1);
    const schema = JSON.parse(
      (await page
        .locator('script[type="application/ld+json"]')
        .textContent()) ?? '{}',
    );
    expect(
      schema['@graph'].map((node: Record<string, string>) => node['@type']),
    ).toEqual(['Organization', 'WebSite']);
    expect(schema['@graph'][0].email).toBe('akileshprimary@gmail.com');
    expect(schema['@graph'][0].slogan).toBe(
      'Curious Minds. Creating Tomorrow.',
    );
    expect(schema['@graph'][0]).not.toHaveProperty('logo');
    expect(schema['@graph'][0]).not.toHaveProperty('address');
    const response = await request.get('/social-preview.png');
    expect(response.ok()).toBe(true);
    expect(response.headers()['content-type']).toContain('image/png');
  }
  const sitemap = await (await request.get('/sitemap.xml')).text();
  expect((sitemap.match(/<loc>/g) ?? []).length).toBe(3);
  for (const path of ['/', '/about/', '/contact/'])
    expect(sitemap).toContain(`https://curiox.in${path}</loc>`);
  expect(sitemap).not.toMatch(/review|404|products|privacy/);
  expect(await (await request.get('/robots.txt')).text()).toContain(
    'Sitemap: https://curiox.in/sitemap.xml',
  );
  await page.goto('/review/components/');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    'content',
    'noindex, nofollow',
  );
  await page.goto('/404.html');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    'content',
    'noindex, nofollow',
  );
});
