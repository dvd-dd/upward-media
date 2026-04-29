import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { Syne, DM_Sans } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale, getMessages, getTranslations } from "next-intl/server";
import "../globals.css";
import { routing } from "@/i18n/routing";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import SmoothScroll from "@/components/layout/SmoothScroll";
import ClientProviders from "@/components/layout/ClientProviders";

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

const SITE_URL = "https://upwardbr.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.home" });
  const ogLocale = locale === "pt" ? "pt_BR" : "en_US";
  const localePath = `/${locale}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t("title"),
      template: "%s | Upward Media",
    },
    description: t("description"),
    keywords: [
      "digital agency",
      "web development",
      "branding",
      "digital marketing",
      "SEO",
      "social media",
      "landing page",
      "design",
    ],
    authors: [{ name: "Upward Media" }],
    alternates: {
      canonical: localePath,
      languages: {
        "en-US": "/en",
        "pt-BR": "/pt",
        "x-default": "/pt",
      },
    },
    openGraph: {
      type: "website",
      locale: ogLocale,
      alternateLocale: locale === "pt" ? ["en_US"] : ["pt_BR"],
      siteName: "Upward Media",
      title: t("title"),
      description: t("description"),
      url: localePath,
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

const buildJsonLd = (locale: string) =>
  JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Upward Media",
    description:
      locale === "pt"
        ? "Agência digital focada em performance, oferecendo desenvolvimento web, branding, marketing digital e suporte contínuo."
        : "Performance-driven digital agency offering web development, branding, digital marketing, and ongoing support.",
    url: `${SITE_URL}/${locale}`,
    email: "hello@upwardbr.com",
    telephone: "+5535998996851",
    inLanguage: locale === "pt" ? "pt-BR" : "en-US",
    sameAs: [],
    serviceType: [
      "Web Development",
      "Branding & Identity",
      "Digital Marketing",
      "Social Media Management",
    ],
  });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale === "pt" ? "pt-BR" : "en"} suppressHydrationWarning>
      <body
        className={`${syne.variable} ${dmSans.variable} font-general-sans antialiased bg-background text-white`}
        suppressHydrationWarning
      >
        <Script
          id="json-ld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: buildJsonLd(locale) }}
        />
        <NextIntlClientProvider messages={messages}>
          <ClientProviders>
            <SmoothScroll>
              <Header />
              <main>{children}</main>
              <Footer />
              <WhatsAppFloat />
            </SmoothScroll>
          </ClientProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
