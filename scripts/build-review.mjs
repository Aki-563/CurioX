import { spawnSync } from 'node:child_process';
import { writeHeaders } from './headers.mjs';
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
