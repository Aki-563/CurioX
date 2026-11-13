import { spawnSync } from 'node:child_process';
import { writeHeaders } from './headers.mjs';
const result = spawnSync(
  process.execPath,
  ['node_modules/astro/bin/astro.mjs', 'build'],
  { stdio: 'inherit', env: { ...process.env, ASTRO_TELEMETRY_DISABLED: '1' } },
);
if (result.status === 0) writeHeaders('dist');
process.exitCode = result.status ?? 1;
