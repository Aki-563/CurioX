// Local QA tool, not an adapter or runtime requirement for the static site.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const root = path.resolve('dist');
const port = Number(process.env.CURIOX_PREVIEW_PORT ?? 4322);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
};
function loadRules() {
  const rules = [];
  let current;
  for (const line of fs
    .readFileSync(path.join(root, '_headers'), 'utf8')
    .split(/\r?\n/)) {
    if (!line.trim() || line.trimStart().startsWith('#')) continue;
    if (!/^\s/.test(line)) {
      current = { pattern: line.trim(), headers: {} };
      rules.push(current);
    } else {
      const index = line.indexOf(':');
      current.headers[line.slice(0, index).trim()] = line
        .slice(index + 1)
        .trim();
    }
  }
  return rules;
}
function matches(pattern, url) {
  const source = pattern.startsWith('https://')
    ? `${url.protocol}//${url.host}${url.pathname}`
    : url.pathname;
  const regex = pattern
    .replace(/[.+?^${}()|[\]\\]/g, '\\$&')
    .replace(/:[A-Za-z]\w*/g, '[^./]+')
    .replaceAll('*', '.*');
  return new RegExp(`^${regex}$`).test(source);
}
const server = http.createServer((req, res) => {
  if (!['GET', 'HEAD'].includes(req.method)) {
    res.writeHead(405);
    res.end();
    return;
  }
  let url;
  try {
    url = new URL(req.url, `https://${req.headers.host}`);
  } catch {
    res.writeHead(400);
    res.end();
    return;
  }
  const pathname = decodeURIComponent(url.pathname);
  let file = path.resolve(root, '.' + pathname);
  if (!file.startsWith(root + path.sep) && file !== root) {
    res.writeHead(403);
    res.end();
    return;
  }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
    if (!pathname.endsWith('/')) {
      res.writeHead(308, { Location: pathname + '/' + url.search });
      res.end();
      return;
    }
    file = path.join(file, 'index.html');
  }
  let status = 200;
  if (
    !fs.existsSync(file) ||
    !fs.statSync(file).isFile() ||
    path.basename(file).startsWith('_headers')
  ) {
    file = path.join(root, '404.html');
    status = 404;
  }
  const headers = {
    'Content-Type': types[path.extname(file)] ?? 'application/octet-stream',
    Vary: 'Accept-Encoding',
  };
  for (const rule of loadRules())
    if (matches(rule.pattern, url))
      for (const [name, value] of Object.entries(rule.headers))
        headers[name] = headers[name] ? headers[name] + ', ' + value : value;
  const body = fs.readFileSync(file);
  const compress =
    /text\/|application\/xml|image\/svg/.test(headers['Content-Type']) &&
    /\bgzip\b/.test(req.headers['accept-encoding'] ?? '');
  const output = compress ? zlib.gzipSync(body) : body;
  if (compress) headers['Content-Encoding'] = 'gzip';
  headers['Content-Length'] = output.length;
  res.writeHead(status, headers);
  res.end(req.method === 'HEAD' ? undefined : output);
});
server.listen(port, '127.0.0.1', () =>
  console.log(
    `Local security/compression QA: http://127.0.0.1:${port}/ (dist; not Cloudflare metrics)`,
  ),
);
