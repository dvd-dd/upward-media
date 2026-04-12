"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export default function LanguageToggle({
  className = "",
}: {
  className?: string;
}) {
  const locale = useLocale();
  const t = useTranslations("nav");
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchTo = (next: (typeof routing.locales)[number]) => {
    if (next === locale || isPending) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <div
      role="group"
      aria-label={t("languageSwitcher")}
      className={`inline-flex items-center rounded-full border border-border bg-surface/60 backdrop-blur-sm overflow-hidden text-xs font-semibold ${className}`}
    >
      {routing.locales.map((loc) => {
        const active = loc === locale;
        return (
          <button
            key={loc}
            type="button"
            onClick={() => switchTo(loc)}
            aria-pressed={active}
            className={`px-3 py-1.5 transition-colors duration-200 ${
              active
                ? "bg-primary text-background"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            {loc.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
