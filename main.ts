import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ENTRY = 'The piano was tuned at dawn. By noon, the silence between the notes had learned the refrain.';

// Count Unicode code points, not UTF-16 code units: make.fun measures 1..280 code points.
const codePoints = Array.from(ENTRY);
if (codePoints.length < 1 || codePoints.length > 280) {
  throw new Error('entry length must be 1..280 code points');
}
if (ENTRY.trim().length === 0) {
  throw new Error('entry must not be whitespace-only');
}
if (ENTRY.includes('\n') || ENTRY.includes('\r')) {
  throw new Error('entry must be a single line');
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outputDir, { recursive: true });
// Write the single line verbatim: no trailing newline is appended.
writeFileSync(join(outputDir, 'entry.txt'), ENTRY, 'utf8');
