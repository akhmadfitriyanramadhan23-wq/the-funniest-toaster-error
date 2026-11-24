// The Funniest Toaster Error Message — make.fun entry
// One line, at most 120 characters: the error message a kitchen toaster
// shows its owner when something goes wrong. Deadpan, and it reads like
// a real message on a real appliance.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "ERROR: Your bread has achieved carbon. It is no longer toast. It is a warning to others.";
const MAX_CHARS = 120;

// The gate: a single line within the limit (counted in code points).
const chars = [...ENTRY].length;
if (chars > MAX_CHARS) {
  throw new Error(`entry is ${chars} chars, over the ${MAX_CHARS} limit`);
}
if (ENTRY.includes("\n")) throw new Error("entry must be a single line");

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY + "\n", "utf8");
// Read-back: what landed on disk must be exactly the gated entry.
const back = readFileSync("/output/entry.txt", "utf8");
if (back !== ENTRY + "\n") throw new Error("read-back mismatch in /output/entry.txt");
console.log(`wrote ${chars} chars to /output/entry.txt`);
