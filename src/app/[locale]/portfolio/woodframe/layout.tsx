import type { Metadata } from "next";
import { ReactNode } from "react";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.cases.woodframe" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/portfolio/woodframe`,
      languages: {
        "en-US": "/en/portfolio/woodframe",
        "pt-BR": "/pt/portfolio/woodframe",
        "x-default": "/en/portfolio/woodframe",
      },
    },
    openGraph: {
      type: "article",
      locale: locale === "pt" ? "pt_BR" : "en_US",
      title: t("title"),
      description: t("description"),
      url: `/${locale}/portfolio/woodframe`,
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

export default function WoodFrameLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
