import fs from 'node:fs';
import { chromium } from '@playwright/test';

const browser = await chromium.launch();
const results = [];
for (const width of [390, 1440]) {
  const page = await browser.newPage({ viewport: { width, height: 960 } });
  await page.addInitScript(() => {
    window.__curioxLab = { lcp: null, cls: 0, longTasks: [] };
    new PerformanceObserver((list) => {
      const entry = list.getEntries().at(-1);
      window.__curioxLab.lcp = {
        ms: entry.startTime,
        tag: entry.element?.tagName,
        text: entry.element?.textContent?.slice(0, 160),
      };
    }).observe({ type: 'largest-contentful-paint', buffered: true });
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries())
        if (!entry.hadRecentInput) window.__curioxLab.cls += entry.value;
    }).observe({ type: 'layout-shift', buffered: true });
    new PerformanceObserver((list) => {
      window.__curioxLab.longTasks.push(
        ...list.getEntries().map((entry) => entry.duration),
      );
    }).observe({ type: 'longtask', buffered: true });
  });
  await page.goto('http://127.0.0.1:4321/');
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(700);
  results.push(
    await page.evaluate(
      (width) => ({
        width,
        ...window.__curioxLab,
        inlineScriptBytes: [...document.scripts].reduce(
          (sum, script) =>
            sum + new TextEncoder().encode(script.textContent).length,
          0,
        ),
        scripts: performance
          .getEntriesByType('resource')
          .filter((entry) => entry.initiatorType === 'script')
          .map((entry) => ({
            url: entry.name,
            encodedBytes: entry.encodedBodySize,
          })),
        resourceBytes: performance
          .getEntriesByType('resource')
          .reduce((sum, entry) => sum + entry.encodedBodySize, 0),
      }),
      width,
    ),
  );
  await page.close();
}
await browser.close();
fs.mkdirSync('test-artifacts', { recursive: true });
fs.writeFileSync(
  `test-artifacts/baseline-${process.argv[2] ?? '04'}.json`,
  JSON.stringify(results, null, 2),
);
console.log(JSON.stringify(results, null, 2));
