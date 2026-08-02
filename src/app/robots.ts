import type { MetadataRoute } from "next";

/**
 * robots.ts
 *
 * Next.js 16 MetadataRoute.Robots — served at `/robots.txt`.
 *
 * Allows all crawlers access to the homepage and references the sitemap.
 * The site URL is shared with `src/app/sitemap.ts` — update both (or move
 * into the commercial config) before deploying to production.
 */

// TODO: update to the production WinterVell domain (or move into commercial config).
const SITE_URL = "https://wintervell.example";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
