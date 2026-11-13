import fs from 'node:fs';
import crypto from 'node:crypto';
import path from 'node:path';

export function writeHeaders(directory) {
  const hashes = new Set();
  const inline = [];
  for (const file of fs
    .readdirSync(directory, { recursive: true })
    .map(String)
    .filter((file) => file.endsWith('.html'))) {
    const html = fs.readFileSync(path.join(directory, file), 'utf8');
    for (const match of html.matchAll(
      /<script\b([^>]*)>([\s\S]*?)<\/script>/g,
    )) {
      if (/\bsrc=/.test(match[1]) || !match[2].trim()) continue;
      const hash = `'sha256-${crypto.createHash('sha256').update(match[2]).digest('base64')}'`;
      hashes.add(hash);
      inline.push({
        file,
        bytes: Buffer.byteLength(match[2]),
        hash,
        type: match[1].includes('ld+json') ? 'data' : 'javascript',
      });
    }
    if (/<style\b|\sstyle=/.test(html))
      throw new Error(`Inline style requires explicit CSP review: ${file}`);
  }
  const source = fs.readFileSync('public/_headers', 'utf8');
  const generated = source.replace(
    "script-src 'self';",
    `script-src 'self' ${[...hashes].sort().join(' ')};`,
  );
  if (generated.includes('unsafe-inline')) throw new Error('Unsafe inline CSP');
  if (generated.split('\n').some((line) => line.length > 2000))
    throw new Error('Cloudflare header line length exceeded');
  fs.writeFileSync(path.join(directory, '_headers'), generated);
  fs.mkdirSync('test-artifacts', { recursive: true });
  fs.writeFileSync(
    `test-artifacts/csp-${path.basename(directory)}.json`,
    JSON.stringify({ hashes: [...hashes], inline }, null, 2),
  );
  console.log(
    `Prepared ${directory}/_headers with ${hashes.size} exact inline hashes; no unsafe-inline.`,
  );
}
