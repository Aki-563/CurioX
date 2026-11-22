// Derives web logo, favicon and download-kit files from the approved CURIOX
// master SVGs in src/assets/brand. Geometry is never edited: paths and their
// transforms are copied verbatim; only the background rectangle is dropped and
// the viewBox is tightened to the artwork. Run: node scripts/brand-assets.mjs
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { createRequire } from 'node:module';

const root = path.resolve(import.meta.dirname, '..');
// sharp ships with Astro's image service; resolve it from there instead of
// adding a direct dependency.
const astroRequire = createRequire(
  createRequire(import.meta.url).resolve('astro/package.json'),
);
const sharp = astroRequire('sharp');
const brand = path.join(root, 'src/assets/brand');
const web = path.join(brand, 'web');
const pub = path.join(root, 'public');
const kit = path.join(pub, 'brand');
const ACCENT = '#9351F3';

const read = (file) => fs.readFileSync(path.join(brand, file), 'utf8');

// Exact cubic-Bezier extrema, so the crop is tight and nothing is clipped.
function extrema(p0, p1, p2, p3) {
  const a = -p0 + 3 * p1 - 3 * p2 + p3;
  const b = 2 * (p0 - 2 * p1 + p2);
  const c = p1 - p0;
  const ts = [0, 1];
  if (Math.abs(a) < 1e-12) {
    if (b) ts.push(-c / b);
  } else {
    const disc = b * b - 4 * a * c;
    if (disc >= 0)
      ts.push(
        (-b + Math.sqrt(disc)) / (2 * a),
        (-b - Math.sqrt(disc)) / (2 * a),
      );
  }
  return ts
    .filter((t) => t >= 0 && t <= 1)
    .map(
      (t) =>
        (1 - t) ** 3 * p0 +
        3 * (1 - t) ** 2 * t * p1 +
        3 * (1 - t) * t * t * p2 +
        t ** 3 * p3,
    );
}

function parse(svg) {
  const group = svg.match(
    /<g transform="translate\(([-\d.e]+) ([-\d.e]+)\)" fill="([^"]+)">/,
  );
  return [...svg.matchAll(/<path ([^>]*?)\s*\/>/g)].map(([, attrs]) => {
    const d = attrs.match(/\bd="([^"]+)"/)[1];
    const fill = attrs.match(/fill="([^"]+)"/)?.[1] ?? group?.[3];
    const t = attrs.match(
      /translate\(([-\d.e]+) ([-\d.e]+)\) scale\(([-\d.e]+) ([-\d.e]+)\)/,
    );
    const [tx, ty, sx, sy] = t
      ? t.slice(1).map(Number)
      : [Number(group?.[1] ?? 0), Number(group?.[2] ?? 0), 1, 1];
    const transform = t
      ? t[0]
      : group
        ? `translate(${group[1]} ${group[2]})`
        : '';
    return { d, fill, transform, tx, ty, sx, sy };
  });
}

function bounds(paths) {
  const box = [Infinity, Infinity, -Infinity, -Infinity];
  for (const { d, tx, ty, sx, sy } of paths) {
    const tokens = d.match(/[MCLVHZ]|-?[\d.]+(?:e-?\d+)?/g);
    const xs = [];
    const ys = [];
    let i = 0;
    let x = 0;
    let y = 0;
    let cmd;
    const next = () => Number(tokens[i++]);
    while (i < tokens.length) {
      if (/[A-Z]/.test(tokens[i])) cmd = tokens[i++];
      if (cmd === 'M' || cmd === 'L') [x, y] = [next(), next()];
      else if (cmd === 'H') x = next();
      else if (cmd === 'V') y = next();
      else if (cmd === 'C') {
        const [x1, y1, x2, y2, x3, y3] = [
          next(),
          next(),
          next(),
          next(),
          next(),
          next(),
        ];
        xs.push(...extrema(x, x1, x2, x3));
        ys.push(...extrema(y, y1, y2, y3));
        [x, y] = [x3, y3];
      } else if (cmd === 'Z') continue;
      else throw new Error(`Unsupported path command ${cmd}`);
      xs.push(x);
      ys.push(y);
    }
    for (const v of xs) {
      box[0] = Math.min(box[0], tx + sx * v);
      box[2] = Math.max(box[2], tx + sx * v);
    }
    for (const v of ys) {
      box[1] = Math.min(box[1], ty + sy * v);
      box[3] = Math.max(box[3], ty + sy * v);
    }
  }
  return box;
}

const round = (n) => Math.round(n * 100) / 100;

// Transparent, tightly cropped SVG. Symbol paths use --logo-symbol (default
// accent); wordmark paths use currentColor so the header/footer text colour
// controls them, matching the approved purple + white/black lockups.
function webSvg(paths, pad, { title, symbolFill, wordFill, wordScale = 1 }) {
  const isSymbol = ({ fill }) => fill.toUpperCase() === ACCENT;
  const mark = paths.filter(isSymbol);
  const word = paths.filter((p) => !isSymbol(p));
  const [mx0, my0, mx1, my1] = bounds(mark);
  // Optional web-only wordmark reduction (D041): the lettering is scaled
  // uniformly about its left edge and the symbol's vertical centre, so the
  // symbol, gap and letter proportions are unchanged.
  let wordBox = word.length ? bounds(word) : null;
  let wrap = (body) => body;
  if (wordBox && wordScale !== 1) {
    const ax = wordBox[0];
    const ay = (my0 + my1) / 2;
    const k = wordScale;
    wrap = (body) =>
      `<g transform="translate(${round(ax)} ${round(ay)}) scale(${k}) translate(${round(-ax)} ${round(-ay)})">${body}</g>`;
    wordBox = [
      ax,
      ay + k * (wordBox[1] - ay),
      ax + k * (wordBox[2] - ax),
      ay + k * (wordBox[3] - ay),
    ];
  }
  const boxes = [[mx0, my0, mx1, my1], ...(wordBox ? [wordBox] : [])];
  const x0 = Math.min(...boxes.map((b) => b[0]));
  const y0 = Math.min(...boxes.map((b) => b[1]));
  const x1 = Math.max(...boxes.map((b) => b[2]));
  const y1 = Math.max(...boxes.map((b) => b[3]));
  const vb = [x0 - pad, y0 - pad, x1 - x0 + 2 * pad, y1 - y0 + 2 * pad].map(
    round,
  );
  const draw = (list, fill) =>
    list
      .map(
        ({ d, transform }) =>
          `<path d="${d}" fill="${fill}"${transform ? ` transform="${transform}"` : ''}/>`,
      )
      .join('');
  const body =
    draw(mark, symbolFill) + (word.length ? wrap(draw(word, wordFill)) : '');
  return {
    viewBox: vb,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb.join(' ')}" width="${vb[2]}" height="${vb[3]}"${title ? ` role="img" aria-label="${title}"><title>${title}</title>` : '>'}${body}</svg>
`,
  };
}

fs.mkdirSync(web, { recursive: true });
// Web art comes from the supplied transparent masters (no background rect).
const horizontal = parse(
  read(
    'transparent/svg/horizontal/curiox-horizontal-purple-white-wordmark-transparent.svg',
  ),
);
const symbol = parse(
  read('transparent/svg/symbol/curiox-symbol-purple-transparent.svg'),
);

// 1. Inline logo for header/footer (CSS-controlled colours, no background).
// Web lettering is 78% of the kit size so the symbol leads, as requested.
const WEB_WORDMARK_SCALE = 0.78;
const lockup = webSvg(horizontal, 0, {
  symbolFill: 'var(--logo-symbol, #9351F3)',
  wordFill: 'currentColor',
  wordScale: WEB_WORDMARK_SCALE,
});
fs.writeFileSync(path.join(web, 'curiox-lockup-inline.svg'), lockup.svg);

// 2. Favicon: the supplied transparent purple symbol, copied verbatim (user
// choice, D041). favicon.ico is rendered from the same file below.
const faviconSource = path.join(
  brand,
  'transparent/svg/symbol/curiox-symbol-purple-transparent.svg',
);
const favicon = fs.readFileSync(faviconSource, 'utf8');
fs.copyFileSync(faviconSource, path.join(pub, 'favicon.svg'));

// App icons (Apple touch, manifest) need an opaque square: approved
// white-on-#9351F3 treatment, cropped so the mark stays in the safe zone.
const [sx0, sy0, sx1, sy1] = bounds(symbol);
const side = Math.max(sx1 - sx0, sy1 - sy0);
const cx = (sx0 + sx1) / 2;
const cy = (sy0 + sy1) / 2;
function squareIcon(scale, background, foreground, radius = 0) {
  const box = side * scale;
  const vb = [cx - box / 2, cy - box / 2, box, box].map(round);
  const paths = symbol
    .map(
      ({ d, transform }) =>
        `<path d="${d}" fill="${foreground}" transform="${transform}"/>`,
    )
    .join('');
  const rx = radius ? ` rx="${round(box * radius)}"` : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb.join(' ')}"><rect x="${vb[0]}" y="${vb[1]}" width="${vb[2]}" height="${vb[3]}"${rx} fill="${background}"/>${paths}</svg>\n`;
}
// Maskable/app icons keep the mark inside the 80% safe zone.
const appIcon = squareIcon(1.6, ACCENT, '#FFFFFF');

const png = (svg, size, file) =>
  sharp(Buffer.from(svg), { density: 72 * Math.ceil(size / 64) })
    .resize(size, size)
    .png()
    .toFile(path.join(pub, file));

await png(appIcon, 180, 'apple-touch-icon.png');
await png(appIcon, 192, 'icon-192.png');
await png(appIcon, 512, 'icon-512.png');

// favicon.ico with 16/32/48 PNG entries (modern ICO format).
const sizes = [16, 32, 48];
const images = await Promise.all(
  sizes.map((s) =>
    sharp(Buffer.from(favicon), { density: 300 }).resize(s, s).png().toBuffer(),
  ),
);
const header = Buffer.alloc(6 + 16 * sizes.length);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
sizes.forEach((s, i) => {
  const e = 6 + 16 * i;
  header.writeUInt8(s, e);
  header.writeUInt8(s, e + 1);
  header.writeUInt16LE(1, e + 4);
  header.writeUInt16LE(32, e + 6);
  header.writeUInt32LE(images[i].length, e + 8);
  header.writeUInt32LE(offset, e + 12);
  offset += images[i].length;
});
fs.writeFileSync(
  path.join(pub, 'favicon.ico'),
  Buffer.concat([header, ...images]),
);

fs.writeFileSync(
  path.join(pub, 'site.webmanifest'),
  `${JSON.stringify(
    {
      name: 'CURIOX',
      short_name: 'CURIOX',
      icons: [
        {
          src: '/icon-192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any maskable',
        },
        {
          src: '/icon-512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
      theme_color: '#050409',
      background_color: '#050409',
      display: 'browser',
    },
    null,
    2,
  )}\n`,
);

// 3. Download kit. public/brand is generated (git-ignored): it is rebuilt
// from the masters in src/assets/brand on every dev/build run, so the logo
// files are stored once. Overview PNG previews are not linked; skip them.
fs.rmSync(kit, { recursive: true, force: true });
fs.mkdirSync(kit, { recursive: true });
for (const dir of ['svg', 'pdf', 'transparent']) {
  fs.cpSync(path.join(brand, dir), path.join(kit, dir), {
    recursive: true,
    filter: (src) => !/overview-\d\.png$/.test(src),
  });
}
for (const file of [
  'curiox-logo-overview.pdf',
  'curiox-complete-logos.pdf',
  'README.txt',
  'OFL-Space-Grotesk.txt',
  'manifest.json',
]) {
  fs.copyFileSync(path.join(brand, file), path.join(kit, file));
}
const zip = path.join(kit, 'curiox-logo-kit.zip');
fs.rmSync(zip, { force: true });
const entries = [
  'svg',
  'transparent',
  'pdf',
  'curiox-logo-overview.pdf',
  'curiox-complete-logos.pdf',
  'README.txt',
  'OFL-Space-Grotesk.txt',
  'manifest.json',
];
fs.writeFileSync(zip, buildZip(kit, entries));

// Minimal ZIP writer using only Node's zlib, so the build needs no `zip`
// binary (Cloudflare Pages images do not ship one) and output is identical
// on every platform. Fixed timestamps keep the archive deterministic.
function buildZip(base, roots) {
  const files = roots
    .flatMap((entry) => {
      const full = path.join(base, entry);
      return fs.statSync(full).isDirectory()
        ? fs
            .readdirSync(full, { recursive: true })
            .map((p) => path.join(entry, String(p)))
            .filter((p) => fs.statSync(path.join(base, p)).isFile())
        : [entry];
    })
    .map((p) => p.split(path.sep).join('/'))
    .sort();
  const DOS_TIME = 0;
  const DOS_DATE = ((2026 - 1980) << 9) | (11 << 5) | 22;
  const locals = [];
  const centrals = [];
  let offset = 0;
  for (const name of files) {
    const data = fs.readFileSync(path.join(base, name));
    const deflated = zlib.deflateRawSync(data, { level: 9 });
    const stored = deflated.length >= data.length;
    const body = stored ? data : deflated;
    const crc = zlib.crc32(data);
    const nameBuf = Buffer.from(name, 'utf8');
    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(0x0800, 6); // UTF-8 names
    local.writeUInt16LE(stored ? 0 : 8, 8);
    local.writeUInt16LE(DOS_TIME, 10);
    local.writeUInt16LE(DOS_DATE, 12);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(body.length, 18);
    local.writeUInt32LE(data.length, 22);
    local.writeUInt16LE(nameBuf.length, 26);
    locals.push(local, nameBuf, body);
    const central = Buffer.alloc(46);
    central.writeUInt32LE(0x02014b50, 0);
    central.writeUInt16LE(20, 4);
    central.writeUInt16LE(20, 6);
    central.writeUInt16LE(0x0800, 8);
    central.writeUInt16LE(stored ? 0 : 8, 10);
    central.writeUInt16LE(DOS_TIME, 12);
    central.writeUInt16LE(DOS_DATE, 14);
    central.writeUInt32LE(crc, 16);
    central.writeUInt32LE(body.length, 20);
    central.writeUInt32LE(data.length, 24);
    central.writeUInt16LE(nameBuf.length, 28);
    central.writeUInt32LE(offset, 42);
    centrals.push(central, nameBuf);
    offset += 30 + nameBuf.length + body.length;
  }
  const centralSize = centrals.reduce((sum, b) => sum + b.length, 0);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(files.length, 8);
  end.writeUInt16LE(files.length, 10);
  end.writeUInt32LE(centralSize, 12);
  end.writeUInt32LE(offset, 16);
  return Buffer.concat([...locals, ...centrals, end]);
}

console.log(
  JSON.stringify({
    lockupViewBox: lockup.viewBox,
    zipBytes: fs.statSync(zip).size,
  }),
);
