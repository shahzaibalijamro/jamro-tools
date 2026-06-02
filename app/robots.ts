import type { MetadataRoute } from "next";

const SITE_URL = "https://jamro-tools.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Reserve room for future non-public areas (admin, API, internal).
        // These don't exist yet but listing them now keeps the rules
        // stable as the site grows.
        disallow: ["/api/", "/admin/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
