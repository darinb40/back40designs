// Lists the site's public pages for search engines (served at /sitemap.xml).
const BASE = "https://www.back40designco.com";

const pages = [
  "",
  "/gallery",
  "/dealership-series",
  "/dealership-series/green-pea-guide",
  "/dealership-series/bingo",
  "/trail-series",
  "/trail/back-40-loop",
  "/trail/back-40-loop-rwb",
  "/trail/little-sugar",
  "/trail/dragon-scales",
  "/lot-stretcher",
  "/privacy",
];

export default function sitemap() {
  return pages.map((path) => ({ url: `${BASE}${path}`, lastModified: new Date() }));
}
