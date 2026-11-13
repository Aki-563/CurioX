import fs from 'node:fs';
import { chromium } from '@playwright/test';

const graphic = fs
  .readFileSync('src/components/sections/CuriosityGraphic.astro', 'utf8')
  .match(/<svg[\s\S]*?<\/svg>/)[0];
const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 1,
});
await page.goto('http://127.0.0.1:4321/');
await page.setContent(`<!doctype html><html lang="en"><head><style>
@font-face{font-family:Space;src:url(http://127.0.0.1:4321/fonts/space-grotesk-latin.woff2)}
@font-face{font-family:Inter;src:url(http://127.0.0.1:4321/fonts/inter-latin.woff2)}
*{box-sizing:border-box}body{margin:0;background:#050409;color:#f8f4ff;font-family:Space,sans-serif;padding:52px 60px;position:relative;width:1200px;height:630px;overflow:hidden}.wordmark{font-size:34px;font-weight:700;letter-spacing:-2px}.accent{color:#b77aff}h1{position:relative;font-size:78px;line-height:1.05;letter-spacing:-4px;font-weight:600;margin:62px 0 24px;z-index:2}p{font:14px Inter,sans-serif;color:#bdb3d0;letter-spacing:2px;text-transform:uppercase}.graphic{position:absolute;right:22px;top:76px;width:480px;opacity:.9}.graphic svg{width:100%;height:auto}.bottom{position:absolute;bottom:40px;left:60px;right:60px;border-top:1px solid #392951;padding-top:18px;display:flex;justify-content:space-between;font:12px Inter,sans-serif;color:#bdb3d0}
</style></head><body><div class="wordmark">Curio<span class="accent">X</span></div><h1>Curious Minds.<br>Creating<br><span class="accent">Tomorrow.</span></h1><div class="graphic">${graphic}</div><div class="bottom"><span>Curiosity-driven technology & software</span><span>curiox.in</span></div></body></html>`);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: 'public/social-preview.png' });
await browser.close();
console.log(
  'Original text-wordmark social asset: public/social-preview.png, 1200×630. Visual approval pending; no official logo claimed.',
);
