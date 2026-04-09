"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DIFFERENTIALS } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

const tints = [
  "radial-gradient(circle at 30% 50%, rgba(0,212,170,0.06) 0%, transparent 60%)",
  "radial-gradient(circle at 70% 50%, rgba(139,92,246,0.06) 0%, transparent 60%)",
  "radial-gradient(circle at 40% 60%, rgba(0,212,170,0.06) 0%, transparent 60%)",
  "radial-gradient(circle at 60% 40%, rgba(139,92,246,0.06) 0%, transparent 60%)",
  "radial-gradient(circle at 50% 50%, rgba(0,212,170,0.06) 0%, transparent 60%)",
];

export default function WhyUs() {
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
      const cards = cardsContainer.querySelectorAll("[data-diff-card]");
      const dots = dotsContainer.querySelectorAll("[data-dot]");
      const total = cards.length;

      // Set initial states
      gsap.set(cards, { opacity: 0, y: 30 });
      gsap.set(cards[0], { opacity: 1, y: 0 });
      gsap.set(dots[0], { backgroundColor: "#00D4AA", scale: 1.3 });

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: `+=${total * 100}%`,
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
              gsap.to(dot, { backgroundColor: "#1a1a2e", scale: 1, duration: 0.2 });
            }
          });

          bg.style.background = tints[activeIndex];
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-us"
      className="relative min-h-screen bg-background overflow-hidden"
    >
      {/* Background tint */}
      <div
        ref={bgRef}
        className="absolute inset-0 transition-all duration-700 pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 h-screen flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Left side — pinned title */}
        <div className="lg:w-5/12 text-center lg:text-left pt-24 lg:pt-0">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-4">
            Why Us
          </p>
          <h2 className="font-clash font-extrabold text-3xl md:text-5xl text-white mb-4">
            Why Upward Media
          </h2>
          <p className="text-text-secondary text-base md:text-lg max-w-md mx-auto lg:mx-0">
            We&apos;re not just another agency.
          </p>

          {/* Progress dots (desktop — vertical) */}
          <div
            ref={dotsRef}
            className="hidden lg:flex flex-col items-start gap-3 mt-10"
          >
            {DIFFERENTIALS.map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div
                  data-dot
                  className="w-2.5 h-2.5 rounded-full bg-border transition-all"
                />
                <span className="text-text-muted text-xs">
                  {DIFFERENTIALS[i].title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right side — cycling cards */}
        <div className="lg:w-7/12 relative flex items-center justify-center flex-1 w-full">
          <div ref={cardsContainerRef} className="relative w-full max-w-lg">
            {DIFFERENTIALS.map((diff, i) => (
              <div
                key={diff.title}
                data-diff-card
                className={`${
                  i === 0 ? "" : "absolute inset-0"
                } bg-surface border border-border rounded-2xl p-8 md:p-10`}
              >
                <span className="text-primary font-clash font-bold text-5xl md:text-6xl opacity-20 block mb-4">
                  0{i + 1}
                </span>
                <h3 className="font-clash font-bold text-2xl md:text-3xl text-white mb-4">
                  {diff.title}
                </h3>
                <p className="text-text-secondary text-base md:text-lg leading-relaxed">
                  {diff.description}
                </p>
              </div>
            ))}
          </div>

          {/* Mobile dots (horizontal) */}
          <div className="lg:hidden absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {DIFFERENTIALS.map((_, i) => (
              <div
                key={i}
                data-dot
                className="w-2 h-2 rounded-full bg-border"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
