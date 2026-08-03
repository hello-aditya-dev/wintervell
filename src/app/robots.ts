import type { MetadataRoute } from "next";

/**
 * robots.ts
 *
 * Next.js 16 MetadataRoute.Robots — served at `/robots.txt`.
 *
 * Allows all crawlers access to the homepage and references the sitemap.
 * Uses the production domain consistent with sitemap.ts.
 */

const SITE_URL = "https://wintervell.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
