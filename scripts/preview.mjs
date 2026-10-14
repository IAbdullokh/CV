// Serves the static export in ./out exactly as a static host would, with no dependencies.
// Usage: npm run build && npm run preview   (PORT=3101 by default)
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../out/", import.meta.url));
const port = Number(process.env.PORT || 3101);
const base = process.env.BASE_PATH || "";

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".webmanifest": "application/manifest+json",
  ".woff2": "font/woff2",
  ".xml": "application/xml; charset=utf-8",
};

async function resolve(urlPath) {
  const clean = normalize(decodeURIComponent(urlPath.split("?")[0])).replace(/^(\.\.[/\\])+/, "");
  const candidates = [join(root, clean)];
  if (clean.endsWith("/")) candidates.unshift(join(root, clean, "index.html"));
  else candidates.push(join(root, clean, "index.html"), join(root, `${clean}.html`));
  for (const file of candidates) {
    try {
      if ((await stat(file)).isFile()) return file;
    } catch {
      // try the next candidate
    }
  }
  return null;
}

createServer(async (req, res) => {
  let urlPath = req.url || "/";
  if (base && urlPath.startsWith(base)) urlPath = urlPath.slice(base.length) || "/";
  const file = await resolve(urlPath);
  if (!file) {
    const notFound = await readFile(join(root, "404.html")).catch(() => "Not found");
    res.writeHead(404, { "content-type": types[".html"] });
    res.end(notFound);
    return;
  }
  res.writeHead(200, { "content-type": types[extname(file)] || "application/octet-stream" });
  res.end(await readFile(file));
}).listen(port, () => {
  console.log(`Preview: http://localhost:${port}/`);
});
