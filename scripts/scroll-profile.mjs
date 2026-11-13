import fs from 'node:fs';
import { chromium } from '@playwright/test';
const browser = await chromium.launch();
const results = [];
for (const mode of ['native', 'smooth']) {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    reducedMotion: 'no-preference',
  });
  await page.goto(
    `http://127.0.0.1:4321/${mode === 'native' ? '?scroll=native' : ''}`,
  );
  await page.waitForFunction(
    (mode) => document.documentElement.dataset.scroll === mode,
    mode,
  );
  const client = await page.context().newCDPSession(page);
  await client.send('Performance.enable');
  const start = await client.send('Performance.getMetrics');
  await page.evaluate(() => {
    window.__curioxFrameSamples = [];
    window.__lastFrame = performance.now();
    window.__sample = true;
    function sample(time) {
      if (!window.__sample) return;
      window.__curioxFrameSamples.push(time - window.__lastFrame);
      window.__lastFrame = time;
      requestAnimationFrame(sample);
    }
    requestAnimationFrame(sample);
  });
  await page.mouse.move(900, 500);
  const positions = [];
  for (let i = 0; i < 6; i++) {
    await page.mouse.wheel(0, 320);
    await page.waitForTimeout(100);
    positions.push(await page.evaluate(() => window.scrollY));
  }
  await page.waitForTimeout(500);
  const end = await client.send('Performance.getMetrics');
  const frames = await page.evaluate(() => {
    window.__sample = false;
    return window.__curioxFrameSamples;
  });
  const metric = (result, name) =>
    result.metrics.find((item) => item.name === name)?.value ?? 0;
  results.push({
    mode,
    scrollPositions: positions,
    finalScroll: await page.evaluate(() => window.scrollY),
    scriptTaskMs:
      (metric(end, 'ScriptDuration') - metric(start, 'ScriptDuration')) * 1000,
    totalTaskMs:
      (metric(end, 'TaskDuration') - metric(start, 'TaskDuration')) * 1000,
    frameCount: frames.length,
    framesOver50ms: frames.filter((ms) => ms > 50).length,
    medianFrameMs: frames.sort((a, b) => a - b)[Math.floor(frames.length / 2)],
  });
  await page.close();
}
await browser.close();
fs.writeFileSync(
  'test-artifacts/scroll-profile.json',
  JSON.stringify(results, null, 2),
);
console.log(JSON.stringify(results, null, 2));
