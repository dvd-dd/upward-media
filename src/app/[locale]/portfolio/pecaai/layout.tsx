import type { Metadata } from "next";
import { ReactNode } from "react";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.cases.pecaai" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/portfolio/pecaai`,
      languages: {
        "en-US": "/en/portfolio/pecaai",
        "pt-BR": "/pt/portfolio/pecaai",
        "x-default": "/en/portfolio/pecaai",
      },
    },
    openGraph: {
      type: "article",
      locale: locale === "pt" ? "pt_BR" : "en_US",
      title: t("title"),
      description: t("description"),
      url: `/${locale}/portfolio/pecaai`,
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

export default function PecaAiLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
