// Renders a design sheet (social/design/*.svg) to PNG next to it, at the
// SVG's own size, with the kit's fonts loaded.
//
//   social/render/run.sh --svg social/design/cat-sheet.svg

import { createRequire } from "node:module";
import { readFile, writeFile } from "node:fs/promises";
import { resolve, sep } from "node:path";

const { chromium } = createRequire("/opt/render/package.json")("playwright");

const REPO = resolve(".");
const file = resolve(process.argv[2] || "");
if (!file.startsWith(resolve("social/design") + sep) || !file.endsWith(".svg")) {
  console.error("want a path to social/design/<name>.svg");
  process.exit(1);
}

const svg = await readFile(file, "utf8");
const [, w, h] = /width="(\d+)" height="(\d+)"/.exec(svg) || [];
const fonts = await readFile(resolve(REPO, "social/kit/fonts/extra.css"), "utf8");
const landing = await readFile(resolve(REPO, "landing/fonts.css"), "utf8").catch(() => "");

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: +w, height: +h } });
// fonts resolve against file:// paths of the repo
const base = (dir, css) => css.replace(/url\((?!data:)['"]?([^'")]+)['"]?\)/g, (_, u) => `url(file://${resolve(REPO, dir, u)})`);
// a file:// page, not setContent: about:blank may not load file:// fonts
const html = "/tmp/design-sheet.html";
await writeFile(html, `<meta charset="utf-8"><style>${base("social/kit/fonts", fonts)}${base("landing", landing)} body{margin:0}</style>${svg}`);
await page.goto(`file://${html}`, { waitUntil: "load" });
await page.evaluate(() => document.fonts.ready);
// the faces the sheets use, at the weights they use them
const missing = await page.evaluate(() => ['500 20px "Caveat"', '900 20px "Golos Text"', '400 20px "Golos Text"', '500 20px "JetBrains Mono"']
  .filter((f) => !document.fonts.check(f, "Кот")));
if (missing.length) { console.error(`fonts not loaded: ${missing.join(", ")}`); process.exit(1); }
await page.screenshot({ path: file.replace(/\.svg$/, ".png") });
await browser.close();
console.log(`${file.replace(REPO + "/", "")} -> png, ${w}×${h}`);
