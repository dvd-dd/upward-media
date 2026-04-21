"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { Puzzle, Search, Layers } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
});

const STAT_KEYS = [
  { key: "custom", icon: Puzzle },
  { key: "seo", icon: Search },
  { key: "fullService", icon: Layers },
] as const;

export default function Hero() {
  const t = useTranslations("hero");
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const h1Line1Ref = useRef<HTMLDivElement>(null);
  const h1Line2Ref = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Badge — fade + slide down
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.2
      );

      // H1 line 1 — clip-path mask reveal + slide up
      tl.fromTo(
        h1Line1Ref.current,
        { opacity: 0, y: 40, clipPath: "inset(100% 0 0 0)" },
        { opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)", duration: 0.8 },
        0.4
      );

      // H1 line 2
      tl.fromTo(
        h1Line2Ref.current,
        { opacity: 0, y: 40, clipPath: "inset(100% 0 0 0)" },
        { opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)", duration: 0.8 },
        0.6
      );

      // Subtitle
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        0.8
      );

      // Buttons
      tl.fromTo(
        buttonsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        1.0
      );

      // Stats
      tl.fromTo(
        statsRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        1.2
      );

      // 3D scene
      tl.fromTo(
        sceneRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1 },
        0.4
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100svh] flex items-center overflow-hidden bg-background"
    >
      {/* --- Background layers --- */}

      {/* Radial gradient glow from top */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0,212,170,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Grid lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,212,170,0.09) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,170,0.09) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, #000 30%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, #000 30%, transparent 85%)",
        }}
      />

      {/* --- 3D Scene (right side on desktop, behind text on mobile) --- */}
      <div
        ref={sceneRef}
        className="absolute inset-0 lg:left-[45%] opacity-0"
        style={{ zIndex: 1 }}
      >
        <div className="w-full h-full opacity-30 lg:opacity-100">
          {!isMobile && (
            <Suspense fallback={null}>
              <HeroScene />
            </Suspense>
          )}
        </div>
      </div>

      {/* --- Text content --- */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 w-full pt-28 sm:pt-36 pb-12 sm:pb-16 lg:pt-32 pointer-events-none">
        <div className="max-w-3xl pointer-events-auto">
          {/* Badge */}
          <div ref={badgeRef} className="opacity-0 mb-5 sm:mb-6">
            <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-[10px] sm:text-xs font-semibold tracking-wider uppercase">
              {t("badge")}
            </span>
          </div>

          {/* H1 */}
          <h1 className="font-clash font-extrabold text-[clamp(1.875rem,8vw,2.5rem)] leading-[1.1] md:text-[3.5rem] lg:text-[4rem] xl:text-[4.5rem] mb-5 sm:mb-6 break-words">
            <div ref={h1Line1Ref} className="opacity-0 text-text-primary">
              {t("titleLine1")}
            </div>
            <div ref={h1Line2Ref} className="opacity-0 text-gradient-mixed">
              {t("titleLine2")}
            </div>
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="opacity-0 text-text-secondary text-sm sm:text-base md:text-lg max-w-lg mb-7 sm:mb-8 leading-relaxed"
          >
            {t("subtitle")}
          </p>

          {/* Buttons */}
          <div
            ref={buttonsRef}
            className="opacity-0 flex flex-col xs:flex-row xs:flex-wrap items-stretch xs:items-center gap-3 xs:gap-4 mb-8 sm:mb-10"
          >
            <MagneticButton
              as="a"
              href="/#contact"
              wrapperClassName="block xs:inline-block w-full xs:w-auto"
              className="block w-full xs:inline-block xs:w-auto gradient-primary text-background px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-sm font-semibold text-center transition-shadow duration-300 hover:shadow-[0_0_24px_rgba(0,212,170,0.45),0_0_60px_rgba(0,212,170,0.15)]"
            >
              {t("ctaPrimary")}
            </MagneticButton>
            <MagneticButton
              as="a"
              href="/#portfolio"
              wrapperClassName="block xs:inline-block w-full xs:w-auto"
              className="block w-full xs:inline-block xs:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-sm font-semibold text-center border border-primary text-primary hover:bg-primary hover:text-background transition-all duration-300"
            >
              {t("ctaSecondary")}
            </MagneticButton>
          </div>

          {/* Stats bar */}
          <div
            ref={statsRef}
            className="opacity-0 flex flex-wrap items-center gap-x-5 gap-y-2 sm:gap-x-6 md:gap-8"
          >
            {STAT_KEYS.map(({ key, icon: Icon }) => (
              <div
                key={key}
                className="flex items-center gap-1.5 sm:gap-2 text-text-muted text-[11px] sm:text-xs md:text-sm whitespace-nowrap"
              >
                <Icon size={14} className="text-primary shrink-0" />
                <span>{t(`stats.${key}`)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
