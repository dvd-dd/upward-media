"use client";

import { useTranslations } from "next-intl";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const COUNTERS = [
  { key: "projects", endValue: 20, suffix: "+" },
  { key: "brands", endValue: 15, suffix: "+" },
  { key: "custom", endValue: 100, suffix: "%" },
] as const;

export default function SocialProof() {
  const t = useTranslations("socialProof.counters");

  return (
    <section id="social-proof" className="relative py-16 sm:py-24 bg-background">
      {/* Counters */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-3 gap-4 sm:gap-8">
          {COUNTERS.map((c) => (
            <AnimatedCounter
              key={c.key}
              endValue={c.endValue}
              suffix={c.suffix}
              label={t(c.key)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
