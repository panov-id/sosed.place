// Renders every slide of a piece (post, story set, profile set) to PNG.
//
// A piece is a folder with post.js. kit/page.html loads it, builds the slides
// and raises window.__ready once fonts and images are in. Each .slide element
// is shot on its own, at its own size, into social/out/<piece>/NN.png.
// Also writes a contact sheet per piece and a profile-grid preview.

import { createRequire } from "node:module";
import { createServer } from "node:http";
import { readFile, readdir, mkdir, rm, stat } from "node:fs/promises";
import { join, extname, resolve, sep } from "node:path";

const { chromium } = createRequire("/opt/render/package.json")("playwright");

const REPO = resolve(".");
const SOCIAL = join(REPO, "social");
const OUT = join(SOCIAL, "out");

const TYPES = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8", ".woff2": "font/woff2", ".jpg": "image/jpeg",
  ".png": "image/png", ".svg": "image/svg+xml",
};

function serve() {
  const server = createServer(async (req, res) => {
    const path = decodeURIComponent(new URL(req.url, "http://x").pathname);
    const file = join(REPO, path);
    if (!file.startsWith(REPO)) { res.writeHead(403).end(); return; }
    try {
      const body = await readFile(file);
      res.writeHead(200, { "content-type": TYPES[extname(file)] || "application/octet-stream" }).end(body);
    } catch {
      res.writeHead(404).end();
    }
  });
  return new Promise((ok) => server.listen(0, "127.0.0.1", () => ok(server)));
}

const GROUPS = ["posts", "stories", "profile"];

// a piece name ends up in rm -rf of its out/ folder, so it must be group/name
// and nothing else: "..", "posts/../..", an absolute path are all refused
function pieceArg(a) {
  const p = a.replace(/^social\//, "").replace(/\/$/, "");
  const [group, name, ...rest] = p.split("/");
  if (rest.length || !GROUPS.includes(group) || !/^[\w-]+$/.test(name || ""))
    throw new Error(`not a piece: ${a} (want ${GROUPS.join("|")}/<name>)`);
  if (!resolve(OUT, p).startsWith(OUT + sep)) throw new Error(`not a piece: ${a}`);
  return p;
}

async function pieces(args) {
  if (args.length) return args.map(pieceArg);
  const found = [];
  for (const group of GROUPS) {
    const dir = join(SOCIAL, group);
    let names = [];
    try { names = await readdir(dir); } catch { continue; }
    for (const name of names.sort()) {
      try { await stat(join(dir, name, "post.js")); found.push(`${group}/${name}`); } catch {}
    }
  }
  return found;
}

async function open(page, base, query) {
  await page.goto(`${base}/social/kit/page.html?${query}`);
  await page.waitForFunction(() => window.__ready === true || window.__error, null, { timeout: 30000 });
  const err = await page.evaluate(() => window.__error);
  if (err) throw new Error(`${query}: ${err}`);
}

async function main() {
  const list = await pieces(process.argv.slice(2));
  if (!list.length) throw new Error("nothing to render");

  const server = await serve();
  const base = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
  const problems = [];
  let current = "";
  page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") problems.push(`${current}: ${m.text()}`); });
  page.on("requestfailed", (r) => problems.push(`${current}: request failed: ${r.url()}`));
  page.on("response", (r) => { if (r.status() >= 400) problems.push(`${current}: ${r.status()}: ${r.url()}`); });

  for (const piece of list) {
    current = piece;
    const dir = join(OUT, piece);
    await rm(dir, { recursive: true, force: true });
    await mkdir(dir, { recursive: true });

    await open(page, base, `src=${encodeURIComponent(piece)}`);
    const slides = await page.$$(".slide");
    for (let i = 0; i < slides.length; i++) {
      await slides[i].screenshot({ path: join(dir, `${String(i + 1).padStart(2, "0")}.png`) });
    }

    await open(page, base, `src=${encodeURIComponent(piece)}&sheet=1`);
    await page.locator("body").screenshot({ path: join(OUT, `${piece.replace("/", "__")}.sheet.png`) });
    console.log(`${piece}: ${slides.length} slides`);
  }

  const posts = (await pieces([])).filter((p) => p.startsWith("posts/"));
  if (posts.length) {
    current = "profile-grid";
    await open(page, base, `grid=${encodeURIComponent(posts.join(","))}`);
    await page.locator("body").screenshot({ path: join(OUT, "profile-grid.png") });
  }

  await browser.close();
  server.close();
  if (problems.length) {
    console.error(`browser problems:\n  ${[...new Set(problems)].join("\n  ")}`);
    process.exit(1);
  }
}

main().catch((e) => { console.error(e.message); process.exit(1); });
