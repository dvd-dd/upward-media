import type { Metadata } from "next";
import { ReactNode } from "react";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.cases.phoenix" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/portfolio/phoenix`,
      languages: {
        "en-US": "/en/portfolio/phoenix",
        "pt-BR": "/pt/portfolio/phoenix",
        "x-default": "/en/portfolio/phoenix",
      },
    },
    openGraph: {
      type: "article",
      locale: locale === "pt" ? "pt_BR" : "en_US",
      title: t("title"),
      description: t("description"),
      url: `/${locale}/portfolio/phoenix`,
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

export default function PhoenixLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
