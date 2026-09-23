// Checks that what is about to be posted is postable.
//
//   every piece rendered: one PNG per slide, nothing missing, nothing extra
//   every PNG at its Instagram size: post 1080×1350, story 1080×1920, square 1080×1080
//   every post has caption.txt: ≤ 2200 characters, ≤ 5 hashtags, both languages
//
// Exits 1 with one line per problem; prints a summary line when clean.

import { readFile, readdir, stat } from "node:fs/promises";
import { join } from "node:path";
import vm from "node:vm";

const SOCIAL = join(process.cwd(), "social");
const SIZE = { post: [1080, 1350], story: [1080, 1920], square: [1080, 1080] };
const CAPTION_MAX = 2200; // Instagram's hard limit
const HASHTAG_MAX = 5; // Instagram's cap since December 2025

const problems = [];
const bad = (piece, msg) => problems.push(`${piece}: ${msg}`);

async function exists(p) { try { await stat(p); return true; } catch { return false; } }

async function loadPost(dir) {
  const ctx = { window: {} };
  vm.runInNewContext(await readFile(join(dir, "post.js"), "utf8"), ctx);
  return ctx.window.POST;
}

// width and height sit at bytes 16–23 of a PNG (the IHDR chunk)
async function pngSize(file) {
  const b = await readFile(file);
  if (b.readUInt32BE(0) !== 0x89504e47) return null;
  return [b.readUInt32BE(16), b.readUInt32BE(20)];
}

let pieces = 0, pngs = 0, captions = 0;
for (const group of ["posts", "stories", "profile"]) {
  let names = [];
  try { names = (await readdir(join(SOCIAL, group))).sort(); } catch { continue; }
  for (const name of names) {
    const dir = join(SOCIAL, group, name);
    if (!(await exists(join(dir, "post.js")))) continue;
    const piece = `${group}/${name}`;
    pieces++;
    const post = await loadPost(dir);
    const out = join(SOCIAL, "out", group, name);
    const files = (await exists(out)) ? (await readdir(out)).filter((f) => f.endsWith(".png")).sort() : [];
    if (files.length !== post.slides.length) bad(piece, `${files.length} PNG for ${post.slides.length} slides — render again`);
    for (let i = 0; i < files.length; i++) {
      const s = post.slides[i] || {};
      const fmt = s.format || post.format || "post";
      const got = await pngSize(join(out, files[i]));
      const want = SIZE[fmt];
      if (!got || got[0] !== want[0] || got[1] !== want[1]) bad(piece, `${files[i]} is ${got ? got.join("×") : "not a PNG"}, want ${want.join("×")} (${fmt})`);
      pngs++;
    }
    if (group !== "posts") continue;
    const capFile = join(dir, "caption.txt");
    if (!(await exists(capFile))) { bad(piece, "caption.txt missing"); continue; }
    const cap = (await readFile(capFile, "utf8")).trim();
    captions++;
    const len = [...cap].length;
    if (len > CAPTION_MAX) bad(piece, `caption is ${len} characters, limit ${CAPTION_MAX}`);
    const tags = cap.match(/#[\p{L}\p{N}_]+/gu) || [];
    if (tags.length > HASHTAG_MAX) bad(piece, `${tags.length} hashtags, limit ${HASHTAG_MAX}`);
    if (!/[а-яё]/i.test(cap) || !/[a-z]{3,}/i.test(cap.replace(/#[^\s]+/g, ""))) bad(piece, "caption is not in both languages");
  }
}

if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}
console.log(`ok: ${pieces} pieces, ${pngs} PNG at Instagram sizes, ${captions} captions within limits`);
