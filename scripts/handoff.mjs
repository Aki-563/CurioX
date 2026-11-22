import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';

const hash = (file) =>
  crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
assert.equal(
  hash('CURIOX_CODEX_MASTER_PLAN.md'),
  hash('docs/CURIOX_MASTER_PLAN.md'),
);
const manifest = JSON.parse(
  fs.readFileSync('test-artifacts/final-build-manifest.json', 'utf8'),
);
for (const [file, expected] of Object.entries(manifest))
  assert.equal(hash(`dist/${file}`), expected);
fs.writeFileSync(
  'docs/CURIOX_RELEASE_MANIFEST.json',
  JSON.stringify(manifest, null, 2) + '\n',
);

const shots = [
  '# CURIOX final screenshot index',
  '',
  '2026-11-13. Actual rendered captures with reduced motion. All75 images are ignored local QA artifacts. User visual approval pending.',
  '',
];
for (const browser of ['Chromium', 'Firefox', 'WebKit']) {
  const prefix = browser === 'Chromium' ? '' : browser.toLowerCase() + '/';
  shots.push(
    `## ${browser}`,
    '',
    '| Route | 320 | 390 | 768 | 1440 | 1920 |',
    '|---|---|---|---|---|---|',
  );
  for (const route of ['home', 'about', 'contact', '404', 'hero']) {
    const links = [320, 390, 768, 1440, 1920].map((width) => {
      const path = `test-artifacts/phase-11/${prefix}${route}-${width}.png`;
      assert(fs.existsSync(path), path);
      return `[${width}](../${path})`;
    });
    shots.push(`| ${route} | ${links.join(' | ')} |`);
  }
  shots.push('');
}
fs.writeFileSync('docs/CURIOX_SCREENSHOTS.md', shots.join('\n'));

const excluded = new Set([
  'node_modules',
  'dist',
  'dist-review',
  'test-artifacts',
  'test-results',
  'playwright-report',
  '.astro',
  '.git',
]);
function inventory(directory = '.') {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (excluded.has(entry.name)) return [];
    const path = directory === '.' ? entry.name : `${directory}/${entry.name}`;
    return entry.isDirectory() ? inventory(path) : [path];
  });
}
const files = [
  ...new Set([...inventory(), 'docs/CURIOX_FILE_INVENTORY.md']),
].sort();
const source = files.filter((file) => file.startsWith('src/'));
const original = 'CURIOX_CODEX_MASTER_PLAN.md';
fs.writeFileSync(
  'docs/CURIOX_FILE_INVENTORY.md',
  [
    '# CURIOX file inventory',
    '',
    `2026-11-13. Root initially contained only ${original}, preserved byte-for-byte. All other ${files.length - 1} listed files were created locally; ${source.length} application source files. No unrelated source overwritten. Generated dependencies/builds/test artifacts excluded.`,
    '',
    '| File | Change |',
    '|---|---|',
    ...files.map(
      (file) =>
        `| [${file}](../${file}) | ${file === original ? 'Original, unchanged' : 'Created'} |`,
    ),
    '',
  ].join('\n'),
);

let progress = fs.readFileSync('docs/CURIOX_PROGRESS.md', 'utf8');
const tasks = [
  ...progress.matchAll(/^\| (\d{2}) \| (P\d{2}\.\d+) \| (\w+) \|/gm),
].filter((match) => Number(match[1]) <= 11);
assert.equal(tasks.length, 125);
const counts = tasks.reduce((result, match) => {
  result[match[3]] = (result[match[3]] ?? 0) + 1;
  return result;
}, {});
assert.deepEqual(counts, { DONE: 123, BLOCKED: 1, SKIPPED_WITH_REASON: 1 });
progress = progress.replace(
  /^NEXT_ACTION:.*$/m,
  'NEXT_ACTION: User review of docs/CURIOX_SCREENSHOTS.md and local RC; official logo/asset approval and approved legal/business copy for P05.10. Resume first newly unblocked local task. Phases12–13 NOT AUTHORISED.',
);
progress = progress.replace(
  /## Verification[\s\S]*?(?=\n## Tasks)/,
  `## Verification\n\nFinal local gate, 2026-11-13:\n- Forced frozen-lockfile reinstall exit0 (364 packages re-added); check exit0,48 files, zero diagnostics.\n- Final lint/format:check exit0; first helper-format failure fixed.\n- build/build:review, static audit/CSP hash/secret scan/contrast exit0.\n- Playwright full suite exit0:90passed,0skipped/unexpected/flaky,72.742s; three engines.\n- 75 final captures; representative all-engine/mobile/tablet/desktop views visually inspected.\n- 18 final Lighthouse runs: all categories100, mobile median LCP0.910–0.913s,CLS0,maxTBT35ms.\n- Dependency audit exit0,zero advisories. Release hashes match measured build; original/copied master hashes match.\n- 123/125 tasks DONE,1optional reveal skip,1legal-content blocker; see phase11/readiness.\n- Actual NVDA/VoiceOver,physical devices,browser-menu zoom,Cloudflare edge NOT_TESTED; limits in QA matrix.\n\n`,
);
fs.writeFileSync('docs/CURIOX_PROGRESS.md', progress);
const result = {
  date: '2026-11-13',
  taskCounts: counts,
  sourceFiles: source.length,
  createdFiles: files.length - 1,
  releaseFiles: Object.keys(manifest).length,
  screenshots: 75,
  masterSHA256: hash(original),
};
fs.writeFileSync(
  'test-artifacts/local-handoff.json',
  JSON.stringify(result, null, 2),
);
console.log(JSON.stringify(result));
