import type { MetadataRoute } from "next";

/**
 * sitemap.ts
 *
 * Next.js 16 MetadataRoute.Sitemap — served at `/sitemap.xml`.
 *
 * Uses the production domain from the commercial config.
 * Update SITE_URL if the production domain changes.
 */

const SITE_URL = "https://wintervell.com";

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
