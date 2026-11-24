// Ridiculous at First Glance, Real by the Second — make.fun entry.
// Writes one sentence (<= 200 chars) pitching a bizarre startup idea
// that sounds absurd until you realise it would actually sell.
//
// The pitch: a professional-mourner hire service. Absurd on its face —
// strangers paid to weep at a funeral — yet the business logic holds:
// grieving families pay for a full room, and nobody audits the guest list.
//
// Why it works as a pitch: the idea is genuinely bizarre (nobody has a
// "rent-a-mourner" app on their phone), the buyer is named (grieving
// families), the money is named (they pay for a packed room), and the
// turn lands in the second half — from laughing at hired tears to
// nodding at the economics of a full chapel.
//
// The gate below mirrors the bounty gate exactly: the file must be UTF-8
// text of 1 to 200 characters, not only white space, and it must be one
// sentence. If the pitch ever broke a rule, the program would fail loudly
// instead of writing an invalid entry.
import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "We hire out professional mourners to weep at strangers' funerals, because grieving families pay good money for a packed room and nobody ever checks the guest list.";

// --- validation gate (mirrors the bounty gate) ---
const MAX_CHARS = 200;

if (ENTRY.trim().length === 0) {
  throw new Error("entry is empty or only whitespace");
}
if (ENTRY.length > MAX_CHARS) {
  throw new Error(
    `entry is ${ENTRY.length} chars, over the ${MAX_CHARS}-char limit`,
  );
}
// One sentence: exactly one sentence-terminating period, at the end.
const terminators = ENTRY.match(/[.!?]/g) ?? [];
if (terminators.length !== 1 || !ENTRY.endsWith(".")) {
  throw new Error("entry must be exactly one sentence ending in a period");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
console.log(`Wrote ${ENTRY.length} chars to /output/entry.txt`);
