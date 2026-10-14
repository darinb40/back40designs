// Served at /robots.txt; points search engines at the sitemap.
export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://www.back40designco.com/sitemap.xml",
  };
}
