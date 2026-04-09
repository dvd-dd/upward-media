import type { Metadata } from "next";
import Script from "next/script";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
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

export const metadata: Metadata = {
  title: {
    default: "Upward Media | Performance-Driven Digital Agency",
    template: "%s | Upward Media",
  },
  description:
    "Strategy, design, and technology — built to scale your brand and dominate your market. Web development, branding, digital marketing, and ongoing support.",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Upward Media",
    title: "Upward Media | Performance-Driven Digital Agency",
    description:
      "Strategy, design, and technology — built to scale your brand and dominate your market.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Upward Media | Performance-Driven Digital Agency",
    description:
      "Strategy, design, and technology — built to scale your brand and dominate your market.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Upward Media",
  description:
    "Performance-driven digital agency offering web development, branding, digital marketing, and ongoing support.",
  url: "https://upwardmedia.com.br",
  email: "azevedoesilva_luiz@outlook.com",
  telephone: "+5535989896851",
  sameAs: [],
  serviceType: [
    "Web Development",
    "Branding & Identity",
    "Digital Marketing",
    "Social Media Management",
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${syne.variable} ${dmSans.variable} font-general-sans antialiased bg-background text-white`}
        suppressHydrationWarning
      >
        <Script
          id="json-ld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
        <ClientProviders>
          <SmoothScroll>
            <Header />
            <main>{children}</main>
            <Footer />
            <WhatsAppFloat />
          </SmoothScroll>
        </ClientProviders>
      </body>
    </html>
  );
}
