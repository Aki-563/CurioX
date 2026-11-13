import fs from 'node:fs';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';

const directory = process.argv[2] ?? 'dist';
const expected = [
  'index.html',
  'about/index.html',
  'contact/index.html',
  '404.html',
];
const files = fs
  .readdirSync(directory, { recursive: true })
  .map(String)
  .map((path) => path.replaceAll('\\', '/'));
const htmlFiles = files.filter((path) => path.endsWith('.html')).sort();
assert.deepEqual(htmlFiles, expected.toSorted());
const rows = expected.map((path) => {
  const html = fs.readFileSync(`${directory}/${path}`, 'utf8');
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  const canonical = html.match(
    /<link[^>]*rel="canonical"[^>]*href="([^"]+)"/,
  )?.[1];
  assert(title && canonical, `${path} metadata`);
  const canonicalPath =
    path === '404.html' ? '/404.html' : '/' + path.replace(/index\.html$/, '');
  assert.equal(canonical, `https://curiox.in${canonicalPath}`);
  assert.equal((html.match(/<h1[\s>]/g) ?? []).length, 1);
  assert(
    !/Curiox|Curio-X|Smrithi|unsafe-inline|api[_-]?key|BEGIN PRIVATE KEY/.test(
      html,
    ),
  );
  const json = [
    ...html.matchAll(
      /<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs,
    ),
  ];
  for (const match of json) JSON.parse(match[1]);
  if (path !== '404.html') {
    assert(!html.includes('noindex'));
    assert.equal(json.length, 1);
  } else assert(html.includes('noindex'));
  return {
    path,
    title,
    canonical,
    schemaCount: json.length,
    bytes: Buffer.byteLength(html),
  };
});
assert.equal(new Set(rows.map((row) => row.title)).size, 4);
assert.equal(new Set(rows.map((row) => row.canonical)).size, 4);
const sitemap = fs.readFileSync(`${directory}/sitemap.xml`, 'utf8');
assert.equal((sitemap.match(/<loc>/g) ?? []).length, 3);
assert(!/review|404|smriti|privacy|products/i.test(sitemap));
assert(
  fs
    .readFileSync(`${directory}/robots.txt`, 'utf8')
    .includes('Sitemap: https://curiox.in/sitemap.xml'),
);
const png = fs.readFileSync(`${directory}/social-preview.png`);
assert.equal(png.readUInt32BE(16), 1200);
assert.equal(png.readUInt32BE(20), 630);
const headers = fs.readFileSync(`${directory}/_headers`, 'utf8');
assert(!headers.includes('unsafe-inline') && !headers.includes('unsafe-eval'));
for (const file of files.filter((file) =>
  /\.(html|js|css|xml|txt)$/.test(file),
)) {
  const content = fs.readFileSync(`${directory}/${file}`, 'utf8');
  assert(
    !/(?:sk-[A-Za-z0-9]{20,}|AIza[A-Za-z0-9_-]{20,}|-----BEGIN.*PRIVATE KEY-----)/.test(
      content,
    ),
    `Potential credential in ${file}`,
  );
  if (file.endsWith('.html'))
    for (const match of content.matchAll(
      /<script\b([^>]*)>([\s\S]*?)<\/script>/g,
    )) {
      if (/\bsrc=/.test(match[1]) || !match[2].trim()) continue;
      assert(
        headers.includes(
          `'sha256-${crypto.createHash('sha256').update(match[2]).digest('base64')}'`,
        ),
        `${file} inline script CSP hash missing`,
      );
    }
}
assert(headers.includes('https://:project.pages.dev/*'));
assert(headers.includes('https://:version.:project.pages.dev/*'));
assert(headers.split('\n').every((line) => line.length <= 2000));
for (const font of [
  'space-grotesk-latin.woff2',
  'inter-latin.woff2',
  'SPACE-GROTESK-LICENSE.txt',
  'INTER-LICENSE.txt',
])
  assert(fs.existsSync(`${directory}/fonts/${font}`));
fs.mkdirSync('test-artifacts', { recursive: true });
fs.writeFileSync(
  'test-artifacts/static-audit.json',
  JSON.stringify(
    { directory, rows, files, socialDimensions: [1200, 630], result: 'PASS' },
    null,
    2,
  ),
);
console.log(JSON.stringify(rows, null, 2));
console.log(
  'PASS: four HTML routes, unique metadata, three sitemap URLs, schema syntax, fonts/licenses, social dimensions and preview header patterns. Cloudflare edge behavior NOT_TESTED.',
);
