import { spawnSync } from 'node:child_process';
import { writeHeaders } from './headers.mjs';
// Regenerate public/brand, favicons and icons from src/assets/brand first.
const brand = spawnSync(process.execPath, ['scripts/brand-assets.mjs'], {
  stdio: 'inherit',
});
if (brand.status !== 0) process.exit(brand.status ?? 1);
const result = spawnSync(
  process.execPath,
  ['node_modules/astro/bin/astro.mjs', 'build', '--outDir', 'dist-review'],
  {
    stdio: 'inherit',
    env: { ...process.env, CURIOX_REVIEW: '1', ASTRO_TELEMETRY_DISABLED: '1' },
  },
);
if (result.status === 0) writeHeaders('dist-review');
process.exitCode = result.status ?? 1;
