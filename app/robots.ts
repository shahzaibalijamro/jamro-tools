import type { MetadataRoute } from "next";

const SITE_URL = "https://jamrotools.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Block low-value & system paths for all crawlers
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",
          "/internal/",
          "/temp/",
          "/private/",
          "/api/",
          "/_next/static/",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}