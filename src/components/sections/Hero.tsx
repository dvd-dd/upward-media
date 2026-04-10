"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { Puzzle, Search, Layers } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
});

const stats = [
  { icon: Puzzle, label: "Custom Solutions" },
  { icon: Search, label: "SEO Optimized" },
  { icon: Layers, label: "Full-Service Agency" },
];

export default function Hero() {
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
      className="relative min-h-screen flex items-center overflow-hidden bg-background"
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
          opacity: 0.05,
          backgroundImage: `
            linear-gradient(rgba(26,26,46,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(26,26,46,1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
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
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-36 pb-16 lg:pt-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <div ref={badgeRef} className="opacity-0 mb-6">
            <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-semibold tracking-wider uppercase">
              Performance-Driven Digital Agency
            </span>
          </div>

          {/* H1 */}
          <h1 className="font-clash font-extrabold text-[2.5rem] leading-[1.1] md:text-[3.5rem] lg:text-[4rem] xl:text-[4.5rem] mb-6">
            <div ref={h1Line1Ref} className="opacity-0">
              We craft digital experiences
            </div>
            <div ref={h1Line2Ref} className="opacity-0 text-gradient-mixed">
              that drive growth
            </div>
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="opacity-0 text-text-secondary text-base md:text-lg max-w-lg mb-8 leading-relaxed"
          >
            Strategy, design, and technology — built to scale your brand and
            dominate your market.
          </p>

          {/* Buttons */}
          <div
            ref={buttonsRef}
            className="opacity-0 flex flex-wrap items-center gap-4 mb-10"
          >
            <MagneticButton
              as="a"
              href="/#contact"
              className="gradient-primary text-background px-8 py-3.5 rounded-full text-sm font-semibold transition-shadow duration-300 hover:shadow-[0_0_24px_rgba(0,212,170,0.45),0_0_60px_rgba(0,212,170,0.15)]"
            >
              Start a Project
            </MagneticButton>
            <MagneticButton
              as="a"
              href="/#portfolio"
              className="px-8 py-3.5 rounded-full text-sm font-semibold border border-primary text-primary hover:bg-primary hover:text-background transition-all duration-300"
            >
              See Our Work
            </MagneticButton>
          </div>

          {/* Stats bar */}
          <div
            ref={statsRef}
            className="opacity-0 flex flex-wrap items-center gap-6 md:gap-8"
          >
            {stats.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 text-text-muted text-xs md:text-sm"
              >
                <Icon size={16} className="text-primary" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
