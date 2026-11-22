// Link-preview image (og:image / twitter:image), D042: the approved
// purple-on-white symbol, small and centred on a white 1200×630 card.
// Run: node scripts/social-preview.mjs
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const root = path.resolve(import.meta.dirname, '..');
// sharp ships with Astro's image service; resolve it from there.
const astroRequire = createRequire(
  createRequire(import.meta.url).resolve('astro/package.json'),
);
const sharp = astroRequire('sharp');

const WIDTH = 1200;
const HEIGHT = 630;
const SYMBOL = 200; // rendered artboard size in px (whole 128-unit artboard)

const source = fs.readFileSync(
  path.join(
    root,
    'src/assets/brand/svg/symbol/curiox-symbol-purple-on-white.svg',
  ),
);
const symbol = await sharp(source, { density: (72 * SYMBOL) / 128 })
  .resize(SYMBOL, SYMBOL)
  .png()
  .toBuffer();

await sharp({
  create: {
    width: WIDTH,
    height: HEIGHT,
    channels: 3,
    background: '#ffffff',
  },
})
  .composite([
    {
      input: symbol,
      left: Math.round((WIDTH - SYMBOL) / 2),
      top: Math.round((HEIGHT - SYMBOL) / 2),
    },
  ])
  .png({ compressionLevel: 9 })
  .toFile(path.join(root, 'public/social-preview.png'));

console.log(
  `public/social-preview.png ${WIDTH}×${HEIGHT}: centred ${SYMBOL}px CURIOX symbol (purple on white).`,
);
