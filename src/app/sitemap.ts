import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://upwardbr.com";
  const locales = ["en", "pt"] as const;
  const portfolioSlugs = ["pecaai", "luxor", "phoenix", "woodframe"];
  const lastModified = new Date();

  const homeEntries = locales.map((locale) => ({
    url: `${base}/${locale}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 1,
    alternates: {
      languages: {
        "en-US": `${base}/en`,
        "pt-BR": `${base}/pt`,
        "x-default": `${base}/en`,
      },
    },
  }));

  const portfolioEntries = locales.flatMap((locale) =>
    portfolioSlugs.map((slug) => ({
      url: `${base}/${locale}/portfolio/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: {
        languages: {
          "en-US": `${base}/en/portfolio/${slug}`,
          "pt-BR": `${base}/pt/portfolio/${slug}`,
          "x-default": `${base}/en/portfolio/${slug}`,
        },
      },
    }))
  );

  return [...homeEntries, ...portfolioEntries];
}
