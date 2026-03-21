import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const careersPath = path.join(repoRoot, "src", "data", "careers.ts");
const publicDir = path.join(repoRoot, "public");
const sitemapPath = path.join(publicDir, "sitemap.xml");
const robotsPath = path.join(publicDir, "robots.txt");

const BASE_URL = (process.env.SITE_URL || process.env.VITE_SITE_URL || "https://careerwiki-site.vercel.app").replace(/\/+$/, "");
const today = new Date().toISOString().slice(0, 10);

const readText = (p) => fs.readFileSync(p, "utf8");
const ensureDir = (p) => fs.mkdirSync(p, { recursive: true });

const extractIdsBetween = (text, startMarker, endMarker) => {
  const start = text.indexOf(startMarker);
  if (start === -1) return [];
  const end = endMarker ? text.indexOf(endMarker, start + startMarker.length) : -1;
  const slice = end === -1 ? text.slice(start) : text.slice(start, end);
  const ids = [];
  const re = /\bid:\s*"([^"]+)"/g;
  for (let match; (match = re.exec(slice)); ) {
    ids.push(match[1]);
  }
  return Array.from(new Set(ids));
};

const careersText = readText(careersPath);
const careerIds = extractIdsBetween(careersText, "export const careerFields", "export const faqSections");
const faqIds = extractIdsBetween(careersText, "export const faqSections", null);

const urls = [
  "/",
  "/career-tree",
  ...careerIds.map((id) => `/career/${id}`),
  ...faqIds.map((id) => `/faq/${id}`),
];

const escapeXml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls
    .map((u) => {
      const loc = `${BASE_URL}${u}`;
      return `  <url>\n    <loc>${escapeXml(loc)}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`;
    })
    .join("\n") +
  `\n</urlset>\n`;

const robots = `User-agent: *\nAllow: /\n\nSitemap: ${BASE_URL}/sitemap.xml\n`;

ensureDir(publicDir);
fs.writeFileSync(sitemapPath, sitemap, "utf8");
fs.writeFileSync(robotsPath, robots, "utf8");

console.log(`Wrote ${path.relative(repoRoot, sitemapPath)} with ${urls.length} URLs`);
console.log(`Wrote ${path.relative(repoRoot, robotsPath)}`);
