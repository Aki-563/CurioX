import fs from 'node:fs';
const css = fs.readFileSync('src/styles/tokens.css', 'utf8');
const tokens = Object.fromEntries(
  [...css.matchAll(/--(color-[\w-]+):\s*(#[\da-f]{3,6});/gi)].map((match) => [
    match[1],
    match[2],
  ]),
);
function luminance(hex) {
  const value =
    hex.length === 4 ? '#' + [...hex.slice(1)].map((c) => c + c).join('') : hex;
  const channels = value
    .slice(1)
    .match(/../g)
    .map((c) => parseInt(c, 16) / 255)
    .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return channels.reduce(
    (sum, v, i) => sum + v * [0.2126, 0.7152, 0.0722][i],
    0,
  );
}
const pairs = [
  ['primary button', 'color-on-primary', 'color-primary-button', 4.5],
  ['primary hover', 'color-on-primary', 'color-primary-button-hover', 4.5],
  ['body', 'color-text', 'color-bg', 4.5],
  ['muted body', 'color-text-muted', 'color-bg', 4.5],
  ['muted panel', 'color-text-muted', 'color-surface', 4.5],
  ['subtle labels', 'color-text-subtle', 'color-bg', 4.5],
  ['link', 'color-link', 'color-bg', 4.5],
  ['selection', 'color-bg', 'color-secondary-soft', 4.5],
  ['focus on button', 'color-secondary-soft', 'color-primary-button', 3],
  ['secondary border', 'color-text-subtle', 'color-bg', 3],
  ['inverted text', 'color-bg', 'color-primary', 4.5],
];
const results = pairs.map(([name, fg, bg, minimum]) => {
  const [a, b] = [luminance(tokens[fg]), luminance(tokens[bg])].sort(
    (x, y) => y - x,
  );
  const ratio = (a + 0.05) / (b + 0.05);
  return {
    name,
    foreground: tokens[fg],
    background: tokens[bg],
    ratio: +ratio.toFixed(3),
    minimum,
    pass: ratio >= minimum,
  };
});
fs.mkdirSync('test-artifacts', { recursive: true });
fs.writeFileSync(
  'test-artifacts/contrast.json',
  JSON.stringify(results, null, 2),
);
console.table(results);
if (results.some((result) => !result.pass)) process.exitCode = 1;
