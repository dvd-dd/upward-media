"use client";

import { useLayoutEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DIFFERENTIAL_KEYS } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

const tints = [
  "radial-gradient(circle at 30% 50%, rgba(0,212,170,0.06) 0%, transparent 60%)",
  "radial-gradient(circle at 70% 50%, rgba(139,92,246,0.06) 0%, transparent 60%)",
  "radial-gradient(circle at 40% 60%, rgba(0,212,170,0.06) 0%, transparent 60%)",
  "radial-gradient(circle at 60% 40%, rgba(139,92,246,0.06) 0%, transparent 60%)",
  "radial-gradient(circle at 50% 50%, rgba(0,212,170,0.06) 0%, transparent 60%)",
];

export default function WhyUs() {
  const t = useTranslations("differentials");
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const cardsContainer = cardsContainerRef.current;
    const bg = bgRef.current;
    const dotsContainer = dotsRef.current;
    if (!section || !cardsContainer || !bg || !dotsContainer) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const cards = cardsContainer.querySelectorAll("[data-diff-card]");
        const dots = dotsContainer.querySelectorAll("[data-dot]");
        const total = cards.length;

        let maxH = 0;
        cards.forEach((c) => {
          maxH = Math.max(maxH, (c as HTMLElement).offsetHeight);
        });
        (cardsContainer as HTMLElement).style.height = `${maxH}px`;
        gsap.set(cards, { opacity: 0, y: 30, position: "absolute", inset: 0 });
        gsap.set(cards[0], { opacity: 1, y: 0 });
        const inactiveDot = getComputedStyle(document.documentElement)
          .getPropertyValue("--border-strong")
          .trim();
        gsap.set(dots[0], { backgroundColor: "#00D4AA", scale: 1.3 });

        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: `+=${total * 40}%`,
          pin: true,
          scrub: 0.6,
          onUpdate: (self) => {
            const progress = self.progress;
            const activeIndex = Math.min(
              Math.floor(progress * total),
              total - 1
            );

            cards.forEach((card, i) => {
              if (i === activeIndex) {
                gsap.to(card, { opacity: 1, y: 0, duration: 0.3 });
              } else {
                gsap.to(card, { opacity: 0, y: i < activeIndex ? -20 : 30, duration: 0.3 });
              }
            });

            dots.forEach((dot, i) => {
              if (i === activeIndex) {
                gsap.to(dot, { backgroundColor: "#00D4AA", scale: 1.3, duration: 0.2 });
              } else {
                gsap.to(dot, { backgroundColor: inactiveDot, scale: 1, duration: 0.2 });
              }
            });

            bg.style.background = tints[activeIndex];
          },
        });

        return () => {
          gsap.set(cards, { clearProps: "all" });
          gsap.set(dots, { clearProps: "all" });
          (cardsContainer as HTMLElement).style.height = "";
        };
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-us"
      className="relative lg:min-h-screen bg-background overflow-hidden py-20 lg:py-0"
    >
      {/* Background tint */}
      <div
        ref={bgRef}
        className="absolute inset-0 transition-all duration-700 pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:h-screen flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Left side — pinned title */}
        <div className="lg:w-5/12 text-center lg:text-left lg:pt-0">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-4">
            {t("eyebrow")}
          </p>
          <h2 className="font-clash font-extrabold text-3xl md:text-5xl text-text-primary mb-4">
            {t("title")}
          </h2>
          <p className="text-text-secondary text-base md:text-lg max-w-md mx-auto lg:mx-0">
            {t("subtitle")}
          </p>

          {/* Progress dots (desktop — vertical) */}
          <div
            ref={dotsRef}
            className="hidden lg:flex flex-col items-start gap-3 mt-10"
          >
            {DIFFERENTIAL_KEYS.map((key) => (
              <div key={key} className="flex items-center gap-3">
                <div
                  data-dot
                  className="w-2.5 h-2.5 rounded-full bg-border-strong transition-all"
                />
                <span className="text-text-muted text-xs">
                  {t(`items.${key}.title`)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right side — cycling cards */}
        <div className="lg:w-7/12 relative flex items-center justify-center flex-1 w-full">
          <div ref={cardsContainerRef} className="relative w-full max-w-lg flex flex-col gap-6 lg:block">
            {DIFFERENTIAL_KEYS.map((key, i) => (
              <div
                key={key}
                data-diff-card
                className="bg-surface border border-border rounded-2xl p-6 sm:p-8 md:p-10 shadow-[0_10px_40px_-12px_rgba(15,23,42,0.15),0_2px_8px_-2px_rgba(15,23,42,0.08)] dark:shadow-none dark:border-border"
              >
                <span className="text-primary font-clash font-bold text-4xl sm:text-5xl md:text-6xl opacity-40 dark:opacity-20 block mb-4">
                  0{i + 1}
                </span>
                <h3 className="font-clash font-bold text-2xl md:text-3xl text-text-primary mb-4">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="text-text-secondary text-base md:text-lg leading-relaxed">
                  {t(`items.${key}.description`)}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
