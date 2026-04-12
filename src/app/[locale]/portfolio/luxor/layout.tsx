import type { Metadata } from "next";
import { ReactNode } from "react";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.cases.luxor" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/portfolio/luxor`,
      languages: {
        "en-US": "/en/portfolio/luxor",
        "pt-BR": "/pt/portfolio/luxor",
        "x-default": "/en/portfolio/luxor",
      },
    },
    openGraph: {
      type: "article",
      locale: locale === "pt" ? "pt_BR" : "en_US",
      title: t("title"),
      description: t("description"),
      url: `/${locale}/portfolio/luxor`,
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

export default function LuxorLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
