#!/usr/bin/env node
// Verify the "the documents changed" bar is wired, not just present.
//
// Article 14(2) is signposted by that bar and by nothing else — there is no
// account to mail. The failure mode is silent in both directions:
//
//   markup with no behaviour   the bar ships hidden and never appears. This is
//                              what happened to the DSA queue screen the same
//                              week: built, shipped, unreachable, and the
//                              checklist said "done" for four days.
//   a hand-kept revision       a fourth copy of a date that drifts from the
//                              documents; the bar then announces a revision
//                              nobody made, or stays quiet about a real one.
//
// Neither shows up in a browser on the day it is introduced, which is why this
// is a check and not a habit.
//
// Usage: node check-legal-bar.mjs [path/to/index.html]
import { readFileSync } from "node:fs";

const file = process.argv[2] || new URL("./index.html", import.meta.url).pathname;
const html = readFileSync(file, "utf8");

const problems = [];

// The script tag is the only place behaviour can live; markup ids that never
// appear there are decoration.
const scripts = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)]
  .map((match) => match[1])
  .join("\n");

for (const id of ["legalUpdate", "legalAccept"]) {
  if (!html.includes(`id="${id}"`)) {
    problems.push(`#${id} is missing from the markup`);
  } else if (!scripts.includes(id)) {
    problems.push(`#${id} exists in the markup and is never referenced in a script — dead markup`);
  }
}

// The edition must come from config.js, which the deploy fills from the
// documents' own "Last updated" lines.
if (!/legalRevision/.test(scripts)) {
  problems.push("the bar never reads legalRevision — the edition is not coming from the documents");
}

// A literal date anywhere in the script means somebody kept one by hand again.
const literal = scripts.match(/["']\d{4}-\d{2}-\d{2}["']/);
if (literal) {
  problems.push(`a literal date ${literal[0]} is hard-coded in the script — it will drift from the documents`);
}

// Storing the edition is what makes "seen it" durable; without it the bar
// either never hides or hides forever.
if (!/localStorage\.setItem\(\s*["'][a-z]{2}-legal["']/.test(scripts)) {
  problems.push("the accepted edition is never stored — the bar cannot remember it was seen");
}

// The bar promises "what changed" (Terms §19): its link must open the list of changes,
// and the list must carry a section for the edition the documents announce. Added
// 2026-09-15 — before, the link opened the Terms and the promise had nothing behind it.
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
const landing = dirname(file);
const barLink = html.match(/id="legalUpdate"[\s\S]*?href="([^"]+)"/);
if (!barLink || barLink[1] !== "legal.html?doc=changes") {
  problems.push(`the bar links to ${barLink ? barLink[1] : "nothing"} rather than legal.html?doc=changes — "what changed" is promised and not shown`);
}
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const edition = ["terms_EN.md", "privacy_EN.md"]
  .map((name) => readFileSync(join(landing, "legal", name), "utf8").match(/Last updated: (\d{1,2}) ([A-Z][a-z]+) (\d{4})/))
  .filter(Boolean)
  .map((m) => ({ text: `${m[1]} ${m[2]} ${m[3]}`, key: Number(m[3]) * 10000 + (MONTHS.indexOf(m[2]) + 1) * 100 + Number(m[1]) }))
  .sort((a, b) => b.key - a.key)[0];
const changesFile = join(landing, "legal", "changes_EN.md");
if (!existsSync(changesFile)) {
  problems.push("legal/changes_EN.md is missing — the bar has nothing to show");
} else if (!edition) {
  problems.push("no Last updated date in terms_EN.md or privacy_EN.md");
} else if (!readFileSync(changesFile, "utf8").includes(`## Edition of ${edition.text}`)) {
  problems.push(`legal/changes_EN.md has no "## Edition of ${edition.text}" — the current edition is announced and not described`);
}

if (problems.length) {
  console.error("check-legal-bar: FAIL");
  for (const problem of problems) console.error(`  - ${problem}`);
  process.exit(1);
}
console.log("check-legal-bar: ok — bar is wired, edition comes from config, choice is stored");
