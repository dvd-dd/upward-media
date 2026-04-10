import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://upwardbr.com";

  const portfolioSlugs = [
    "pecaai",
    "luxor",
    "phoenix",
    "woodframe",
    // "nextmoney",
  ];

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...portfolioSlugs.map((slug) => ({
      url: `${base}/portfolio/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
