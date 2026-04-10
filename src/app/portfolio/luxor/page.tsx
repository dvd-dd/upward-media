"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowLeft,
  Diamond,
  Star,
  Sparkles,
  Crown,
  Search,
  Heart,
  Quote,
  KeyRound,
  Trophy,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ─── Brand colors ─── */
const gold = "#D4A853";
const dark = "#1A1A1A";

/* ─── Data ─── */
const essenceValues = [
  { icon: Diamond, label: "Exclusivity" },
  { icon: Star, label: "Excellence" },
  { icon: Sparkles, label: "Sophistication" },
  { icon: Crown, label: "Prestige" },
  { icon: Search, label: "Attention to Detail" },
];

const positioning = [
  {
    title: "Luxury",
    description: "Authentic, not ostentatious.",
  },
  {
    title: "Power",
    description: "A presence that commands respect.",
  },
  {
    title: "Status",
    description: "A symbol of achievement.",
  },
  {
    title: "Exclusivity",
    description: "Restricted access by nature.",
  },
];

const personality = [
  {
    title: "Elegant & Confident",
    description:
      "A striking presence without effort. Luxor's confidence is natural, never forced.",
  },
  {
    title: "Selective & Refined",
    description:
      "Every detail is intentional. Every decision is deliberate.",
  },
  {
    title: "Dominant & Authoritative",
    description:
      "Leads by example. True luxury doesn't shout — it simply is.",
  },
];

const colors = [
  { name: "Gold", hex: "#D4A853", text: "white", meaning: "Wealth & Prestige" },
  { name: "Black", hex: "#1A1A1A", text: "white", meaning: "Sophistication & Contrast" },
  { name: "Graphite", hex: "#2D2D2D", text: "white", meaning: "Premium Depth" },
  { name: "White", hex: "#FFFFFF", text: "#1A1A1A", meaning: "Visual Breathing Room" },
];

const slogans = [
  "Exclusivity in every detail.",
  "Where luxury meets excellence.",
  "The standard that defines success.",
];

const brandExperience = [
  {
    icon: KeyRound,
    title: "Privilege",
    description:
      "Access to Luxor is a distinction. Every interaction reinforces that the client is part of a select group.",
  },
  {
    icon: Heart,
    title: "Desire",
    description:
      "Luxor creates desire before the purchase. The brand experience begins long before the first contact with the product.",
  },
  {
    icon: Trophy,
    title: "Achievement",
    description:
      "Owning or accessing Luxor is an achievement. The brand transforms consumption into a symbol of success.",
  },
];

/* ─── Reusable scroll reveal hook ─── */
function useReveal(
  selector: string,
  containerRef: React.RefObject<HTMLElement | null>
) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const triggers: ScrollTrigger[] = [];
    let fallbackTimer: ReturnType<typeof setTimeout>;

    const rafId = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const els = container.querySelectorAll(selector);

        els.forEach((el) => {
          const anim = gsap.fromTo(
            el,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                once: true,
              },
            }
          );
          if (anim.scrollTrigger) {
            triggers.push(anim.scrollTrigger);
          }
        });

        ScrollTrigger.refresh();
        fallbackTimer = setTimeout(() => ScrollTrigger.refresh(), 500);
      });
    });

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(fallbackTimer);
      triggers.forEach((t) => t.kill());
    };
  }, [selector, containerRef]);
}

/* ─── Page ─── */
export default function LuxorPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  useReveal("[data-reveal]", pageRef);

  return (
    <div ref={pageRef} className="bg-background text-white">
      {/* ───────── Back link ───────── */}
      <div className="fixed top-24 left-6 z-40">
        <Link
          href="/#portfolio"
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-white transition-colors bg-surface/80 backdrop-blur-md border border-border rounded-full px-4 py-2"
        >
          <ArrowLeft size={16} />
          Back to Portfolio
        </Link>
      </div>

      {/* ───────── 1. HERO ───────── */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 70% 55% at 50% 30%, ${gold}15 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 70% 60%, ${dark}30 0%, transparent 70%)`,
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.04,
            backgroundImage: `linear-gradient(${gold}99 1px, transparent 1px), linear-gradient(90deg, ${gold}99 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div data-reveal className="relative z-10 opacity-0 max-w-2xl">
          <div
            className="w-28 h-28 md:w-36 md:h-36 mx-auto mb-8 rounded-3xl overflow-hidden border-2 border-white/10"
            style={{ boxShadow: `0 0 40px ${gold}30` }}
          >
            <Image
              src="/images/portfolio/luxor-logo.jpg"
              alt="Luxor Logo"
              width={144}
              height={144}
              className="w-full h-full object-cover"
              priority
            />
          </div>

          <h1 className="font-clash font-extrabold text-5xl md:text-7xl mb-4">
            <span
              style={{
                background: `linear-gradient(135deg, ${gold}, ${gold}CC)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Luxor
            </span>
          </h1>

          <p className="text-text-secondary text-lg md:text-xl mb-6">
            Exclusivity. Sophistication. Prestige.
          </p>

          <div className="flex flex-wrap justify-center gap-2">
            {["Logo Design", "Luxury", "Branding"].map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1.5 rounded-full border text-text-secondary"
                style={{ borderColor: `${gold}40` }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 2. ABOUT ───────── */}
      <section className="py-24 px-6">
        <div data-reveal className="opacity-0 max-w-3xl mx-auto text-center">
          <p
            className="text-sm font-semibold uppercase tracking-widest mb-4"
            style={{ color: gold }}
          >
            About the Project
          </p>
          <p className="text-text-secondary text-lg md:text-xl leading-relaxed">
            A premium brand built to represent the highest standard — not just
            in products and services, but in experience, status, and perceived
            value. Luxor exists to elevate what it means to live with
            excellence.
          </p>
        </div>
      </section>

      {/* ───────── 3. BRAND ESSENCE ───────── */}
      <section className="py-24 px-6 bg-surface/50">
        <div className="max-w-6xl mx-auto">
          <div data-reveal className="opacity-0 text-center mb-16">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-4"
              style={{ color: gold }}
            >
              Brand Foundations
            </p>
            <h2 className="font-clash font-extrabold text-3xl md:text-5xl text-white">
              The Essence of Luxor
            </h2>
          </div>

          {/* Mission / Vision / Purpose */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                title: "Mission",
                text: "Deliver high-level products and services with excellence and exclusivity in every interaction.",
              },
              {
                title: "Vision",
                text: "Be a global reference in luxury and prestige, recognized for uncompromising quality.",
              },
              {
                title: "Purpose",
                text: "Elevate the standard of experience and sophistication in every consumer interaction.",
              },
            ].map((item) => (
              <div
                key={item.title}
                data-reveal
                className="opacity-0 bg-surface border border-border rounded-2xl p-8 hover:border-[#D4A85340] transition-colors duration-300"
              >
                <h3 className="font-clash font-bold text-xl text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          {/* Values */}
          <div
            data-reveal
            className="opacity-0 flex flex-wrap justify-center gap-4"
          >
            {essenceValues.map((v) => (
              <div
                key={v.label}
                className="flex items-center gap-3 bg-surface border border-border rounded-full px-5 py-3"
              >
                <v.icon size={18} style={{ color: gold }} />
                <span className="text-white text-sm font-medium">
                  {v.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 4. POSITIONING ───────── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div data-reveal className="opacity-0 text-center mb-16">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-4"
              style={{ color: gold }}
            >
              Positioning
            </p>
            <h2 className="font-clash font-extrabold text-3xl md:text-5xl text-white mb-4">
              A brand for those who demand the best
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Luxor is not about selling a product — it&apos;s about offering a
              premium solution with sophistication and high standards that
              transcend functionality.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {positioning.map((p) => (
              <div
                key={p.title}
                data-reveal
                className="opacity-0 bg-surface border border-border rounded-2xl p-6 text-center hover:border-[#D4A85340] transition-colors duration-300"
              >
                <h3
                  className="font-clash font-bold text-lg mb-2"
                  style={{ color: gold }}
                >
                  {p.title}
                </h3>
                <p className="text-text-secondary text-sm">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 5. PERSONALITY ───────── */}
      <section className="py-24 px-6 bg-surface/50">
        <div className="max-w-6xl mx-auto">
          <div data-reveal className="opacity-0 text-center mb-16">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-4"
              style={{ color: gold }}
            >
              Personality
            </p>
            <h2 className="font-clash font-extrabold text-3xl md:text-5xl text-white mb-4">
              If Luxor were a person
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Elegant, confident, selective, refined, and dominant — a presence
              that doesn&apos;t need to shout to be noticed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {personality.map((p) => (
              <div
                key={p.title}
                data-reveal
                className="opacity-0 bg-surface border border-border rounded-2xl p-8 text-center hover:border-[#D4A85340] transition-colors duration-300"
              >
                <h3 className="font-clash font-bold text-xl text-white mb-3">
                  {p.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 6. ARCHETYPES ───────── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div data-reveal className="opacity-0 text-center mb-16">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-4"
              style={{ color: gold }}
            >
              Brand Archetypes
            </p>
            <h2 className="font-clash font-extrabold text-3xl md:text-5xl text-white">
              The archetypes that guide Luxor
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              data-reveal
              className="opacity-0 bg-surface border border-border rounded-2xl p-8 hover:border-[#D4A85340] transition-colors duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <Crown size={24} style={{ color: gold }} />
                <h3 className="font-clash font-bold text-xl text-white">
                  Ruler — Primary Archetype
                </h3>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                The Ruler represents power, control, and status. It&apos;s the
                archetype of authority that sets standards and defines what is
                considered excellent. Luxor doesn&apos;t follow trends — it
                defines them.
              </p>
              <ul className="space-y-2">
                {["Power and control", "Market leadership", "High social status"].map(
                  (item) => (
                    <li
                      key={item}
                      className="text-text-secondary text-sm flex items-center gap-2"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: gold }}
                      />
                      {item}
                    </li>
                  )
                )}
              </ul>
            </div>

            <div
              data-reveal
              className="opacity-0 bg-surface border border-border rounded-2xl p-8 hover:border-[#D4A85340] transition-colors duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <Heart size={24} className="text-rose-400" />
                <h3 className="font-clash font-bold text-xl text-white">
                  Lover — Secondary Archetype
                </h3>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                The Lover brings desire, aesthetics, and sensory experience.
                It&apos;s the archetype that transforms luxury into something
                visceral and emotional. Luxor is not just admired — it is
                desired.
              </p>
              <ul className="space-y-2">
                {[
                  "Desire and attraction",
                  "Refined aesthetics",
                  "Sensory experience",
                ].map((item) => (
                  <li
                    key={item}
                    className="text-text-secondary text-sm flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── 7. BRAND IDENTITY ───────── */}
      <section className="py-24 px-6 bg-surface/50">
        <div className="max-w-6xl mx-auto">
          <div data-reveal className="opacity-0 text-center mb-16">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-4"
              style={{ color: gold }}
            >
              Visual Identity
            </p>
            <h2 className="font-clash font-extrabold text-3xl md:text-5xl text-white mb-4">
              A visual language that speaks for itself
            </h2>
          </div>

          {/* Color palette */}
          <div
            data-reveal
            className="opacity-0 grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            {colors.map((c) => (
              <div
                key={c.hex}
                className="rounded-2xl overflow-hidden border border-border"
              >
                <div
                  className="h-28 md:h-36"
                  style={{ backgroundColor: c.hex }}
                />
                <div className="bg-surface p-4">
                  <p className="text-white text-sm font-semibold">{c.name}</p>
                  <p className="text-text-muted text-xs font-mono">{c.hex}</p>
                  <p className="text-text-muted text-xs mt-1">{c.meaning}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Visual style */}
          <div
            data-reveal
            className="opacity-0 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="bg-surface border border-border rounded-2xl p-8">
              <p
                className="text-sm font-semibold uppercase tracking-widest mb-4"
                style={{ color: gold }}
              >
                Visual Style
              </p>
              <p className="font-clash font-bold text-xl text-white mb-2">
                Minimalist. Elegant. Premium.
              </p>
              <p className="text-text-secondary text-sm leading-relaxed">
                Subtle metallic shines, clean compositions, and dark
                backgrounds with gold elements create premium contrast and
                immediate distinction.
              </p>
            </div>
            <div className="bg-surface border border-border rounded-2xl p-8">
              <p
                className="text-sm font-semibold uppercase tracking-widest mb-4"
                style={{ color: gold }}
              >
                Symbol & Logo
              </p>
              <p className="font-clash font-bold text-xl text-white mb-2">
                Authority through symbolism
              </p>
              <p className="text-text-secondary text-sm leading-relaxed">
                A strong symbol that communicates authority. Dark background
                with golden elements creates premium contrast and immediate
                impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── 8. VERBAL IDENTITY ───────── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div data-reveal className="opacity-0 text-center mb-16">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-4"
              style={{ color: gold }}
            >
              Verbal Identity
            </p>
            <h2 className="font-clash font-extrabold text-3xl md:text-5xl text-white">
              The voice of Luxor
            </h2>
          </div>

          {/* Slogans */}
          <div
            data-reveal
            className="opacity-0 grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            {slogans.map((s) => (
              <div
                key={s}
                className="bg-surface border border-border rounded-2xl p-8 text-center hover:border-[#D4A85340] transition-colors duration-300"
              >
                <Quote
                  size={24}
                  className="mx-auto mb-4"
                  style={{ color: gold }}
                />
                <p className="text-white font-clash font-bold text-lg italic">
                  &ldquo;{s}&rdquo;
                </p>
              </div>
            ))}
          </div>

          {/* Core message */}
          <div
            data-reveal
            className="opacity-0 grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            <div className="bg-surface border border-border rounded-2xl p-8">
              <h3
                className="font-clash font-bold text-lg mb-3"
                style={{ color: gold }}
              >
                What It Says
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Exclusivity, high standards, and differentiation. Every message
                reinforces that Luxor is in a category of its own.
              </p>
            </div>
            <div className="bg-surface border border-border rounded-2xl p-8">
              <h3
                className="font-clash font-bold text-lg mb-3"
                style={{ color: gold }}
              >
                How It Says It
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                With authority and elegance. The tone is sophisticated, direct,
                and confident. No exaggeration — because true luxury doesn&apos;t
                need to shout.
              </p>
            </div>
            <div className="bg-surface border border-border rounded-2xl p-8">
              <h3
                className="font-clash font-bold text-lg mb-3"
                style={{ color: gold }}
              >
                What It Creates
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Desire, status, and belonging. Luxor creates the feeling that
                being part of this universe is an achievement — and rare
                achievements have incomparable value.
              </p>
            </div>
          </div>

          {/* Words used / avoided */}
          <div data-reveal className="opacity-0 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface border border-border rounded-2xl p-8">
              <h3
                className="font-clash font-bold text-lg mb-4"
                style={{ color: gold }}
              >
                Words the brand uses
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Exclusive",
                  "Premium",
                  "Excellence",
                  "High Standard",
                  "Sophisticated",
                  "Prestige",
                  "Refined",
                  "Selective",
                ].map((w) => (
                  <span
                    key={w}
                    className="text-xs px-3 py-1.5 rounded-full border text-white"
                    style={{ borderColor: `${gold}40` }}
                  >
                    {w}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-surface border border-border rounded-2xl p-8">
              <h3 className="font-clash font-bold text-lg mb-4 text-text-muted">
                Words the brand avoids
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Cheap",
                  "Promotion",
                  "Common",
                  "Accessible",
                  "Popular",
                  "Discount",
                ].map((w) => (
                  <span
                    key={w}
                    className="text-xs px-3 py-1.5 rounded-full border border-border text-text-muted line-through"
                  >
                    {w}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── 9. BRAND EXPERIENCE ───────── */}
      <section className="py-24 px-6 bg-surface/50">
        <div className="max-w-6xl mx-auto">
          <div data-reveal className="opacity-0 text-center mb-16">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-4"
              style={{ color: gold }}
            >
              Brand Experience
            </p>
            <h2 className="font-clash font-extrabold text-3xl md:text-5xl text-white mb-4">
              Luxor is not for everyone
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              And that&apos;s the point. Selectivity is a fundamental part of
              Luxor&apos;s value. The brand must be experienced as something
              rare, earned, a privilege of the few.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {brandExperience.map((b) => (
              <div
                key={b.title}
                data-reveal
                className="opacity-0 bg-surface border border-border rounded-2xl p-8 text-center hover:border-[#D4A85340] transition-colors duration-300"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-5"
                  style={{ backgroundColor: `${gold}15` }}
                >
                  <b.icon size={26} style={{ color: gold }} />
                </div>
                <h3 className="font-clash font-bold text-xl text-white mb-3">
                  {b.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {b.description}
                </p>
              </div>
            ))}
          </div>

          {/* Closing quote */}
          <div data-reveal className="opacity-0 mt-16 text-center">
            <blockquote className="max-w-2xl mx-auto">
              <p
                className="font-clash font-extrabold text-2xl md:text-3xl italic"
                style={{
                  background: `linear-gradient(135deg, ${gold}, ${gold}CC)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                &ldquo;Luxor is a symbol of status. It transforms product into
                desire and experience into prestige.&rdquo;
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ───────── 10. CTA ───────── */}
      <section className="py-32 px-6 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${gold}10 0%, transparent 70%)`,
          }}
        />

        <div data-reveal className="opacity-0 relative z-10 max-w-2xl mx-auto">
          <h2 className="font-clash font-extrabold text-3xl md:text-5xl text-white mb-6">
            Interested in a luxury brand like this?
          </h2>
          <p className="text-text-secondary text-lg mb-8">
            Let&apos;s craft a premium identity that elevates your brand to a
            category of its own.
          </p>
          <Link
            href="/#contact"
            className="inline-block px-10 py-4 rounded-full font-semibold text-white text-base transition-shadow duration-300"
            style={{
              background: `linear-gradient(135deg, ${gold}, ${gold}CC)`,
              boxShadow: `0 0 0 rgba(0,0,0,0)`,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${gold}50, 0 0 80px ${gold}20`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 rgba(0,0,0,0)`;
            }}
          >
            Start Your Project
          </Link>
        </div>
      </section>
    </div>
  );
}
