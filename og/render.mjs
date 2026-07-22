// Renders OG image candidates (1200×630) from template.html via Puppeteer.
// Runs inside Docker (see docker/run.sh). Never installs Chromium on the host.
//
// Usage:
//   node render.mjs [--seeds 1-24] [--modes light,dark] [--caption "TEXT"] [--out output]
//   node render.mjs --pick 7:dark            # writes ../landing/og-image.jpg

import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";
import { mkdir, writeFile } from "node:fs/promises";
import puppeteer from "puppeteer";

const HERE = dirname(fileURLToPath(import.meta.url));

function parseArgs(argv) {
  const a = {};
  for (let i = 0; i < argv.length; i++) if (argv[i].startsWith("--")) { a[argv[i].slice(2)] = argv[i + 1]; i++; }
  return a;
}
const args = parseArgs(process.argv.slice(2));
const outDir = resolve(HERE, args.out || "output");
const caption = args.caption
  ? args.caption.split("|").map((s) => s.trim())
  : ["GOOD NEIGHBORS · LIVE MOMENTS", "SOSED.PLACE"];
const modes = (args.modes || "light,dark").split(",").map((s) => s.trim()).filter(Boolean);
const style = args.style || "figures"; // figures | facades

function seedList(spec) {
  const m = /^(\d+)-(\d+)$/.exec(spec || "1-12");
  if (m) return Array.from({ length: +m[2] - +m[1] + 1 }, (_, i) => +m[1] + i);
  return (spec || "1").split(",").map(Number);
}

async function main() {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--force-color-profile=srgb",
      "--allow-file-access-from-files"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
  await page.goto("file://" + join(HERE, "template.html"), { waitUntil: "networkidle0" });
  await page.waitForFunction(() => typeof window.__render === "function", { timeout: 10000 });

  async function shot(spec, dest, type) {
    await page.evaluate((s) => window.__render(s), spec);
    await page.evaluate(() => document.fonts.ready);
    await new Promise((r) => setTimeout(r, 60));
    await page.screenshot({ path: dest, type, ...(type === "jpeg" ? { quality: 90 } : {}) });
  }

  if (args.pick) {
    // --pick <seed>:<mode> → final landing/og-image.jpg
    const [seed, mode] = args.pick.split(":");
    const dest = resolve(HERE, "..", "landing", "og-image.jpg");
    await shot({ seed: +seed, mode: mode || "light", style, caption }, dest, "jpeg");
    console.log(`Wrote ${dest} (seed ${seed}, ${mode || "light"}, ${style})`);
  } else {
    const seeds = seedList(args.seeds);
    await mkdir(outDir, { recursive: true });
    const files = [];
    for (const mode of modes) for (const seed of seeds) {
      const name = `og_${style}_${mode}_seed${String(seed).padStart(2, "0")}.png`;
      await shot({ seed, mode, style, caption }, join(outDir, name), "png");
      files.push(name);
      console.log(`  ${name}`);
    }
    const html = `<!doctype html><meta charset="utf-8"><title>sosed OG candidates</title>
<style>body{background:#0d0b0a;color:#f0e7dc;font-family:system-ui,sans-serif;margin:0;padding:24px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(380px,1fr));gap:16px}
figure{margin:0;background:#17130f;border:1px solid #3a2e20;border-radius:10px;overflow:hidden}
img{width:100%;display:block}figcaption{font-size:12px;color:#9a8d7c;padding:8px}</style>
<h1>sosed — OG candidates</h1><div class="grid">${files.map((f) =>
      `<figure><img loading="lazy" src="${f}"><figcaption>${f}</figcaption></figure>`).join("")}</div>`;
    await writeFile(join(outDir, "index.html"), html);
    console.log(`Done. Open ${join(outDir, "index.html")}`);
  }
  await browser.close();
}

main().catch((e) => { console.error(e); process.exit(1); });
