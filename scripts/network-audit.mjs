import fs from 'node:fs';
import zlib from 'node:zlib';
import { chromium } from '@playwright/test';

const browser = await chromium.launch();
const rows = [];
for (const profile of ['mobile', 'desktop', 'reduced']) {
  const page = await browser.newPage({
    viewport: { width: profile === 'mobile' ? 390 : 1440, height: 900 },
    hasTouch: profile === 'mobile',
    reducedMotion: profile === 'reduced' ? 'reduce' : 'no-preference',
  });
  const responses = [];
  page.on('response', (response) =>
    responses.push({
      url: response.url(),
      status: response.status(),
      encoding: response.headers()['content-encoding'] ?? 'identity',
      type: response.headers()['content-type'],
    }),
  );
  await page.addInitScript(() => {
    window.__curioxInputSamples = [];
    new PerformanceObserver((list) =>
      window.__curioxInputSamples.push(
        ...list.getEntries().map((entry) => ({
          name: entry.name,
          duration: entry.duration,
          interactionId: entry.interactionId,
        })),
      ),
    ).observe({ type: 'event', buffered: true, durationThreshold: 16 });
  });
  await page.goto('http://127.0.0.1:4322/');
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);
  const load = await page.evaluate(() => {
    const nav = performance.getEntriesByType('navigation')[0];
    const resources = performance.getEntriesByType('resource').map((entry) => ({
      url: entry.name,
      type: entry.initiatorType,
      encoded: entry.encodedBodySize,
      decoded: entry.decodedBodySize,
      transfer: entry.transferSize,
      duration: entry.duration,
    }));
    return {
      document: {
        encoded: nav.encodedBodySize,
        decoded: nav.decodedBodySize,
        transfer: nav.transferSize,
      },
      resources,
    };
  });
  if (profile === 'mobile') {
    await page.getByRole('button', { name: 'Menu', exact: true }).click();
    await page.keyboard.press('Escape');
  } else await page.getByRole('link', { name: 'How we think' }).click();
  await page.waitForTimeout(100);
  rows.push({
    profile,
    load,
    responses,
    eventTiming: await page.evaluate(() => window.__curioxInputSamples),
    notes:
      'Trusted local interactions; Event Timing samples at >=16ms threshold only. Not field INP.',
  });
  await page.close();
}
const previewPage = await browser.newPage();
const previewEncodings = [];
previewPage.on('response', (response) =>
  previewEncodings.push({
    url: response.url(),
    encoding: response.headers()['content-encoding'] ?? 'identity',
  }),
);
await previewPage.goto('http://127.0.0.1:4321/');
await previewPage.evaluate(() => document.fonts.ready);
await browser.close();
const scripts = fs
  .readdirSync('dist/_astro')
  .filter((file) => file.endsWith('.js'))
  .map((file) => {
    const bytes = fs.readFileSync(`dist/_astro/${file}`);
    return { file, raw: bytes.length, gzip: zlib.gzipSync(bytes).length };
  });
const html = fs.readFileSync('dist/index.html', 'utf8');
const inline = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)]
  .filter(
    (match) => !match[1].includes('ld+json') && !match[1].includes('src='),
  )
  .map((match) => ({
    raw: Buffer.byteLength(match[2]),
    gzipEquivalent: zlib.gzipSync(match[2]).length,
  }));
const report = {
  rows,
  scripts,
  inline,
  totalJSConservativeGzip:
    scripts.reduce((sum, item) => sum + item.gzip, 0) +
    inline.reduce((sum, item) => sum + item.gzipEquivalent, 0),
  previewEncodings,
  notes:
    'Local gzip responses and gzip-equivalent inline accounting; not Cloudflare compression or field INP.',
};
fs.writeFileSync(
  'test-artifacts/network-audit.json',
  JSON.stringify(report, null, 2),
);
console.log(
  JSON.stringify(
    {
      scripts,
      inline,
      totalJSConservativeGzip: report.totalJSConservativeGzip,
      profiles: rows.map((row) => ({
        profile: row.profile,
        transfer:
          row.load.document.transfer +
          row.load.resources.reduce(
            (sum, resource) => sum + resource.transfer,
            0,
          ),
        eventTiming: row.eventTiming,
      })),
      previewEncodings,
    },
    null,
    2,
  ),
);
