"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROCESS_KEYS } from "@/lib/constants";
import TextReveal from "@/components/ui/TextReveal";

gsap.registerPlugin(ScrollTrigger);

export default function Process() {
  const t = useTranslations("process");
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const lineMobileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = timelineRef.current;
    const line = lineRef.current;
    const lineMobile = lineMobileRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const nodes = container.querySelectorAll("[data-step-node]");
      const texts = container.querySelectorAll("[data-step-text]");

      // Desktop: horizontal line draws
      if (line) {
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top 70%",
              end: "bottom 60%",
              scrub: 0.5,
            },
          }
        );
      }

      // Mobile: vertical line draws
      if (lineMobile) {
        gsap.fromTo(
          lineMobile,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top 70%",
              end: "bottom 60%",
              scrub: 0.5,
            },
          }
        );
      }

      const inactiveNode = getComputedStyle(document.documentElement)
        .getPropertyValue("--border")
        .trim();

      // Nodes & text light up sequentially
      nodes.forEach((node, i) => {
        const delay = i / nodes.length;

        gsap.fromTo(
          node,
          { scale: 0.5, backgroundColor: inactiveNode },
          {
            scale: 1,
            backgroundColor: "#00D4AA",
            duration: 0.3,
            scrollTrigger: {
              trigger: container,
              start: "top 70%",
              end: "bottom 60%",
              scrub: 0.5,
              onUpdate: (self) => {
                if (self.progress >= delay) {
                  gsap.to(node, {
                    scale: 1,
                    backgroundColor: "#00D4AA",
                    boxShadow: "0 0 16px rgba(0,212,170,0.4)",
                    duration: 0.3,
                  });
                }
              },
            },
          }
        );
      });

      texts.forEach((text, i) => {
        const delay = i / texts.length;

        ScrollTrigger.create({
          trigger: container,
          start: "top 70%",
          end: "bottom 60%",
          scrub: 0.5,
          onUpdate: (self) => {
            if (self.progress >= delay) {
              gsap.to(text, { opacity: 1, y: 0, duration: 0.4 });
            }
          },
        });
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" className="relative py-20 sm:py-32 bg-background overflow-hidden">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center mb-12 sm:mb-20">
        <TextReveal>
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-4">
            {t("eyebrow")}
          </p>
        </TextReveal>
        <TextReveal delay={0.1}>
          <h2 className="font-clash font-extrabold text-3xl xs:text-4xl md:text-5xl text-text-primary mb-4">
            {t("title")}
          </h2>
        </TextReveal>
        <TextReveal delay={0.2}>
          <p className="text-text-secondary max-w-2xl mx-auto text-base md:text-lg">
            {t("subtitle")}
          </p>
        </TextReveal>
      </div>

      {/* Timeline */}
      <div ref={timelineRef} className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* ===== DESKTOP (horizontal) ===== */}
        <div className="hidden lg:block relative">
          {/* Background line */}
          <div className="absolute top-6 left-0 right-0 h-px bg-border" />
          {/* Animated line */}
          <div
            ref={lineRef}
            className="absolute top-6 left-0 right-0 h-px bg-primary origin-left"
            style={{ transform: "scaleX(0)" }}
          />

          <div className="grid grid-cols-6 gap-4">
            {PROCESS_KEYS.map((key, idx) => {
              const number = String(idx + 1).padStart(2, "0");
              return (
                <div key={key} className="relative pt-0">
                  {/* Node dot */}
                  <div
                    data-step-node
                    className="w-12 h-12 rounded-full bg-border border-2 border-background flex items-center justify-center mx-auto relative z-10"
                    style={{ marginTop: "-18px" }}
                  >
                    <span className="text-xs font-bold text-text-primary">
                      {number}
                    </span>
                  </div>

                  {/* Text */}
                  <div
                    data-step-text
                    className="text-center mt-6 opacity-0 translate-y-4"
                  >
                    <h3 className="font-clash font-bold text-text-primary text-base mb-2">
                      {t(`steps.${key}.title`)}
                    </h3>
                    <p className="text-text-muted text-sm leading-relaxed">
                      {t(`steps.${key}.description`)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ===== MOBILE (vertical) ===== */}
        <div className="lg:hidden relative pl-8">
          {/* Background line */}
          <div className="absolute top-0 bottom-0 left-[23px] w-px bg-border" />
          {/* Animated line */}
          <div
            ref={lineMobileRef}
            className="absolute top-0 bottom-0 left-[23px] w-px bg-primary origin-top"
            style={{ transform: "scaleY(0)" }}
          />

          <div className="space-y-10 sm:space-y-12">
            {PROCESS_KEYS.map((key, idx) => {
              const number = String(idx + 1).padStart(2, "0");
              return (
                <div key={key} className="relative flex items-start gap-6">
                  {/* Node dot */}
                  <div
                    data-step-node
                    className="w-12 h-12 rounded-full bg-border border-2 border-background flex items-center justify-center shrink-0 relative z-10 -ml-8"
                  >
                    <span className="text-xs font-bold text-text-primary">
                      {number}
                    </span>
                  </div>

                  {/* Text */}
                  <div data-step-text className="opacity-0 translate-y-4 pt-2">
                    <h3 className="font-clash font-bold text-text-primary text-lg mb-1">
                      {t(`steps.${key}.title`)}
                    </h3>
                    <p className="text-text-muted text-sm leading-relaxed">
                      {t(`steps.${key}.description`)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
