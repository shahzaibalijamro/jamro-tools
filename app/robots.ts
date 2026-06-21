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
      // OpenAI
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      // Anthropic
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-User", allow: "/" },
      // Perplexity
      { userAgent: "PerplexityBot", allow: "/" },
      // Google
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      // Common Crawl
      { userAgent: "CCBot", allow: "/" },
      // ByteDance
      { userAgent: "Bytespider", allow: "/" },
      // Meta
      { userAgent: "FacebookBot", allow: "/" },
      // Apple
      { userAgent: "AppleBot-Extended", allow: "/" },
      // Amazon
      { userAgent: "Amazonbot", allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}