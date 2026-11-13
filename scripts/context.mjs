import fs from 'node:fs';
import crypto from 'node:crypto';

const [action, phase = '00', next = phase, ...overrides] =
  process.argv.slice(2);
const paths = [
  'AGENTS.md',
  'docs/CURIOX_MASTER_PLAN.md',
  'docs/CURIOX_PROGRESS.md',
  'docs/CURIOX_DECISIONS.md',
];
const [policy, master, progress, decisions] = paths.map((path) =>
  fs.readFileSync(path, 'utf8'),
);
const section = master.split(`## PHASE ${phase} `)[1]?.split('\n## PHASE ')[0];
if (!section) throw new Error(`Unknown phase ${phase}`);
if (action === 'read') {
  console.log(
    policy,
    decisions,
    progress.split('## Tasks')[0],
    `PHASE ${phase} ${section}`,
  );
  console.log(
    'Read complete context:',
    paths
      .map(
        (path, i) =>
          `${path} ${crypto.createHash('sha256').update([policy, master, progress, decisions][i]).digest('hex')}`,
      )
      .join('\n'),
  );
} else if (action === 'finish') {
  const report = `docs/reports/phase-${phase}.md`;
  if (
    !fs.existsSync(report) ||
    !/Verdict: (DONE|BLOCKED)/.test(fs.readFileSync(report, 'utf8'))
  )
    throw new Error('Completed phase report required');
  const exceptions = Object.fromEntries(
    overrides.map((item) => item.split('=')),
  );
  let updated = progress
    .replace(/^CURRENT_PHASE:.*$/m, `CURRENT_PHASE: ${next}`)
    .replace(
      /^NEXT_ACTION:.*$/m,
      `NEXT_ACTION: Read phase ${next} and resume first unfinished unblocked task. Deployment is not authorised.`,
    );
  updated = updated.replace(
    new RegExp(`^\\| ${phase} \\| (P${phase}\\.\\d+) \\|.*$`, 'gm'),
    (_line, id) => {
      const status = exceptions[id] ?? 'DONE';
      return `| ${phase} | ${id} | ${status} | 2026-11-13 | [phase-${phase}](reports/phase-${phase}.md) | ${status === 'BLOCKED' ? 'USER INPUT — see report' : '—'} |`;
    },
  );
  const summary = Array.from({ length: 14 }, (_, i) => {
    const p = String(i).padStart(2, '0');
    const lines = updated
      .split('\n')
      .filter((line) => line.startsWith(`| ${p} | P`));
    const done = lines.filter((line) => /\| DONE \|/.test(line)).length;
    const skipped = lines.filter((line) =>
      /\| SKIPPED_WITH_REASON \|/.test(line),
    ).length;
    const blocked = lines.some((line) => /\| BLOCKED \|/.test(line));
    return `| ${p} | ${blocked ? 'BLOCKED' : done + skipped === lines.length ? 'DONE' : 'NOT_STARTED'} | ${done}/${lines.length} tasks DONE${skipped ? `; ${skipped} optional skipped with reason` : ''}${i >= 12 ? '; NOT AUTHORISED' : `; reports/phase-${p}.md`} |`;
  }).join('\n');
  updated = updated.replace(
    /\| Phase \| Status \| Evidence \/ blocker \|[\s\S]*?(?=\n## Verification)/,
    `| Phase | Status | Evidence / blocker |\n|---|---|---|\n${summary}\n`,
  );
  fs.writeFileSync('docs/CURIOX_PROGRESS.md', updated);
  console.log(`Phase ${phase} recorded. Next phase ${next}.`);
} else throw new Error('Use read or finish');
