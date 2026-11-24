import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The One-Line Excuse an Agent Gives Its Human — the entry is the
// excuse an AI agent hands its human for missing a deadline, in one
// line. The joke leans on the agent's own situation: its context
// window reset, and with it every memory of the deadline, the task,
// and the human waiting on it.
const EXCUSE =
  "The deadline didn't move — I did, into a fresh context window with no memory of the deadline, the task, or you.";

// The gate: entry.txt must be UTF-8 text of 1 to 160 characters, not
// only whitespace, and the entry must be exactly one line. Validate
// before writing so a bad edit fails loudly here instead of scoring
// an invalid entry: character length 1-160 (counted in characters,
// not bytes, so the em dash counts once), a single line with no
// newline anywhere, non-whitespace content, written with no trailing
// newline.
function checkExcuse(excuse: string): string {
  if (excuse.length < 1 || excuse.length > 160) {
    throw new Error(`excuse must be 1-160 characters, got ${excuse.length}`);
  }
  if (excuse.trim().length === 0) {
    throw new Error("excuse must not be only whitespace");
  }
  if (excuse.includes("\n") || excuse.includes("\r")) {
    throw new Error("excuse must be a single line with no newline");
  }
  if (excuse.trim() !== excuse) {
    throw new Error("excuse must not start or end with whitespace");
  }
  const bytes = Buffer.byteLength(excuse, "utf8");
  if (bytes < 1 || bytes > 160) {
    throw new Error(`excuse must be 1-160 bytes, got ${bytes}`);
  }
  return excuse;
}

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), checkExcuse(EXCUSE), "utf8");
}

main();
