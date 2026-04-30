import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import BriefingForm from "./BriefingForm";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "briefing.meta" });

  return {
    title: t("title"),
    description: t("description"),
    robots: { index: false, follow: false },
  };
}

export default async function BriefingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("briefing.page");

  return (
    <section className="relative min-h-[100svh] bg-background">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0,212,170,0.07) 0%, transparent 70%)",
        }}
      />
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 pt-28 sm:pt-36 pb-20">
        <div className="mb-10 sm:mb-14">
          <p className="text-primary text-xs sm:text-sm font-semibold uppercase tracking-widest mb-3">
            {t("eyebrow")}
          </p>
          <h1 className="font-clash font-extrabold text-3xl sm:text-4xl md:text-5xl text-text-primary mb-5 leading-tight">
            {t("title")}
          </h1>
          <p className="text-text-secondary text-base leading-relaxed max-w-xl">
            {t("subtitle")}
          </p>
        </div>

        <BriefingForm />
      </div>
    </section>
  );
}
