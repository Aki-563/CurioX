import fs from 'node:fs';
import lighthouse from 'lighthouse';
import { chromium } from '@playwright/test';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';

const label = process.argv[2] ?? '10';
const runCount = Number(
  process.argv.find((arg) => arg.startsWith('--runs='))?.split('=')[1] ?? 3,
);
const routes = process.argv.includes('--home')
  ? [['home', '/']]
  : [
      ['home', '/'],
      ['about', '/about/'],
      ['contact', '/contact/'],
    ];
const base = process.env.CURIOX_PERF_URL ?? 'http://127.0.0.1:4321';
const directory = `test-artifacts/lighthouse-${label}`;
fs.mkdirSync(directory, { recursive: true });
const require = createRequire(import.meta.url);
const lighthouseRequire = createRequire(require.resolve('lighthouse'));
const { launch } = await import(
  pathToFileURL(lighthouseRequire.resolve('chrome-launcher')).href
);
const chrome = await launch({
  chromePath: chromium.executablePath(),
  chromeFlags: ['--headless=new', '--disable-gpu'],
  port: 0,
});
const rows = [];
try {
  for (const [name, path] of routes) {
    for (const profile of ['mobile', 'desktop']) {
      for (let run = 1; run <= runCount; run++) {
        const options = {
          port: chrome.port,
          logLevel: 'error',
          output: 'json',
          onlyCategories: [
            'performance',
            'accessibility',
            'best-practices',
            'seo',
          ],
          ...(profile === 'desktop'
            ? {
                formFactor: 'desktop',
                screenEmulation: {
                  mobile: false,
                  width: 1440,
                  height: 900,
                  deviceScaleFactor: 1,
                  disabled: false,
                },
                throttling: {
                  rttMs: 40,
                  throughputKbps: 10240,
                  cpuSlowdownMultiplier: 1,
                  requestLatencyMs: 0,
                  downloadThroughputKbps: 0,
                  uploadThroughputKbps: 0,
                },
              }
            : {}),
        };
        const result = await lighthouse(base + path, options);
        const lhr = result.lhr;
        fs.writeFileSync(
          `${directory}/${name}-${profile}-${run}.json`,
          JSON.stringify(lhr),
        );
        const row = {
          page: name,
          profile,
          run,
          ...Object.fromEntries(
            Object.entries(lhr.categories).map(([key, category]) => [
              key,
              Math.round(category.score * 100),
            ]),
          ),
          lcp: lhr.audits['largest-contentful-paint'].numericValue,
          cls: lhr.audits['cumulative-layout-shift'].numericValue,
          tbt: lhr.audits['total-blocking-time'].numericValue,
          transfer: lhr.audits['total-byte-weight'].numericValue,
          warnings: lhr.runWarnings,
        };
        rows.push(row);
        console.log(JSON.stringify(row));
      }
    }
  }
} finally {
  await chrome.kill();
}
const medians = [];
for (const [name] of routes)
  for (const profile of ['mobile', 'desktop']) {
    const subset = rows.filter(
      (row) => row.page === name && row.profile === profile,
    );
    const metrics = [
      'performance',
      'accessibility',
      'best-practices',
      'seo',
      'lcp',
      'cls',
      'tbt',
      'transfer',
    ];
    medians.push({
      page: name,
      profile,
      ...Object.fromEntries(
        metrics.map((key) => {
          const values = subset.map((row) => row[key]).sort((a, b) => a - b);
          return [
            key,
            {
              median: values[Math.floor(values.length / 2)],
              min: values[0],
              max: values.at(-1),
            },
          ];
        }),
      ),
    });
  }
fs.writeFileSync(
  `${directory}/summary.json`,
  JSON.stringify(
    {
      date: '2026-11-13',
      base,
      methodology:
        'Local lab only. Lighthouse simulated throttling; default mobile profile, explicit desktop 40ms RTT/10Mbps/1x CPU. Same Windows host and Chromium. No field INP or CDN claims.',
      rows,
      medians,
    },
    null,
    2,
  ),
);
