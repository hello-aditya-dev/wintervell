import type { MetadataRoute } from "next";

/**
 * sitemap.ts
 *
 * Next.js 16 MetadataRoute.Sitemap — served at `/sitemap.xml`.
 *
 * The commercial config in `src/config/commercial.ts` does not currently
 * export a site URL, so a placeholder is used here. Update this constant
 * (or centralize it in the commercial config) before deploying to production.
 */

// TODO: update to the production WinterVell domain (or move into commercial config).
const SITE_URL = "https://wintervell.example";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
  ];
}
