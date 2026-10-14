// Quality checks for the built site (run `npm run build` first):
//   • crawls every internal page from "/"
//   • each page at 390, 768 and 1440 px, light and dark: console errors, horizontal overflow, screenshot
//   • axe accessibility audit (WCAG 2.1 A/AA) in both themes
//   • every internal link and #anchor resolves
//   • the skip link is the first thing keyboard focus reaches
//   • with reduced motion, nothing animates
// Screenshots and a JSON report go to .check/. Exits non-zero when a check fails.
import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "playwright";
import { AxeBuilder } from "@axe-core/playwright";

const PORT = Number(process.env.PORT || 3123);
const BASE = process.env.BASE_URL || `http://localhost:${PORT}`;
const OUT = new URL("../.check/", import.meta.url);
const VIEWPORTS = [
  { name: "390", width: 390, height: 844 },
  { name: "768", width: 768, height: 1024 },
  { name: "1440", width: 1440, height: 900 },
];
const SCHEMES = ["light", "dark"];

const failures = [];
const warnings = [];
const fail = (msg) => failures.push(msg);

async function startServer() {
  if (process.env.BASE_URL) return null;
  const server = spawn(process.execPath, ["scripts/preview.mjs"], { env: { ...process.env, PORT: String(PORT) }, stdio: "pipe" });
  await new Promise((resolve, reject) => {
    server.stdout.on("data", (d) => String(d).includes("Preview:") && resolve());
    server.on("error", reject);
    setTimeout(() => reject(new Error("preview server did not start")), 10000);
  });
  return server;
}

const slug = (path) => (path === "/" ? "home" : path.replace(/^\/|\/$/g, "").replace(/\//g, "_"));

async function crawl(context) {
  const seen = new Set(["/"]);
  const queue = ["/"];
  const anchors = []; // { from, href }
  const page = await context.newPage();
  while (queue.length) {
    const path = queue.shift();
    const res = await page.goto(BASE + path, { waitUntil: "networkidle" });
    if (!res || res.status() !== 200) fail(`page ${path} returned ${res?.status()}`);
    const hrefs = await page.$$eval("a[href]", (as) => as.map((a) => a.getAttribute("href")));
    for (const href of hrefs) {
      if (!href || /^(mailto:|tel:|https?:)/.test(href)) continue;
      const url = new URL(href, BASE + path);
      if (url.origin !== new URL(BASE).origin) continue;
      if (url.hash) anchors.push({ from: path, path: url.pathname, hash: url.hash });
      if (!seen.has(url.pathname)) {
        seen.add(url.pathname);
        queue.push(url.pathname);
      }
    }
  }
  // every #anchor must exist on its target page
  for (const a of anchors) {
    await page.goto(BASE + a.path, { waitUntil: "domcontentloaded" });
    const id = decodeURIComponent(a.hash.slice(1));
    const exists = await page.evaluate((id) => !!document.getElementById(id), id);
    if (!exists) fail(`broken anchor ${a.path}${a.hash} (linked from ${a.from})`);
  }
  await page.close();
  return [...seen];
}

async function checkPage(browser, path) {
  for (const scheme of SCHEMES) {
    for (const vp of VIEWPORTS) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        colorScheme: scheme,
        reducedMotion: "reduce",
      });
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", (e) => errors.push(e.message));
      page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
      await page.goto(BASE + path, { waitUntil: "networkidle" });
      await page.waitForTimeout(300);
      const where = `${path} @${vp.name} ${scheme}`;
      if (errors.length) fail(`console errors on ${where}: ${errors.join(" | ")}`);
      const overflow = await page.evaluate(() => {
        const vw = document.documentElement.clientWidth;
        const offenders = [];
        for (const el of document.querySelectorAll("body *")) {
          const r = el.getBoundingClientRect();
          const style = getComputedStyle(el);
          if (r.width > 0 && r.right > vw + 1 && style.position !== "fixed") {
            offenders.push(`${el.tagName.toLowerCase()}${el.id ? "#" + el.id : ""}${typeof el.className === "string" && el.className ? "." + el.className.trim().split(/\s+/)[0] : ""}`);
          }
          if (offenders.length >= 5) break;
        }
        return { scroll: document.documentElement.scrollWidth, vw, offenders };
      });
      if (overflow.scroll > overflow.vw) fail(`horizontal scroll on ${where}: ${overflow.scroll}px > ${overflow.vw}px (${overflow.offenders.join(", ")})`);
      // text must keep the page gutter: nothing readable may start at the screen edge
      const edge = await page.evaluate(() =>
        [...document.querySelectorAll("main h1, main h2, main p, footer span, .back")]
          .filter((el) => el.getBoundingClientRect().width > 0)
          .filter((el) => el.getBoundingClientRect().left < 12)
          .map((el) => `${el.tagName.toLowerCase()} "${el.textContent.trim().slice(0, 30)}"`)
          .slice(0, 3),
      );
      if (edge.length) fail(`text touches the screen edge on ${where}: ${edge.join(", ")}`);
      const running = await page.evaluate(() => document.getAnimations().filter((a) => a.playState === "running").length);
      if (running) fail(`${running} animations still running with reduced motion on ${where}`);
      if (vp.name !== "768") {
        const axe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
        for (const v of axe.violations) {
          fail(`axe ${v.id} (${v.impact}) on ${where}: ${v.help} — ${v.nodes.slice(0, 3).map((n) => n.target.join(" ")).join(" ; ")}`);
        }
        const best = await new AxeBuilder({ page }).withTags(["best-practice"]).analyze();
        for (const v of best.violations) warnings.push(`axe best-practice ${v.id} on ${where}: ${v.help}`);
      }
      await page.screenshot({ path: new URL(`${slug(path)}-${vp.name}-${scheme}.png`, OUT).pathname, fullPage: true });
      await context.close();
    }
  }
}

async function checkKeyboard(browser) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.keyboard.press("Tab");
  const first = await page.evaluate(() => {
    const el = document.activeElement;
    const r = el?.getBoundingClientRect();
    return { text: el?.textContent?.trim(), href: el?.getAttribute("href"), visible: !!r && r.width > 0 && r.height > 0 && r.top >= 0 };
  });
  if (!first.href?.startsWith("#") || !first.visible) fail(`first Tab stop is not a visible skip link: ${JSON.stringify(first)}`);
  await context.close();
}

const server = await startServer();
await mkdir(OUT, { recursive: true });
const browser = await chromium.launch();
try {
  const context = await browser.newContext();
  const pages = await crawl(context);
  await context.close();
  console.log(`Pages: ${pages.join(", ")}`);
  for (const path of pages) await checkPage(browser, path);
  await checkKeyboard(browser);
  await writeFile(new URL("report.json", OUT), JSON.stringify({ pages, failures, warnings }, null, 2));
  for (const w of warnings) console.log(`warn  ${w}`);
  for (const f of failures) console.log(`FAIL  ${f}`);
  console.log(failures.length ? `\n${failures.length} check(s) failed.` : `\nAll checks passed on ${pages.length} pages (screenshots in .check/).`);
} finally {
  await browser.close();
  server?.kill();
}
process.exit(failures.length ? 1 : 0);
