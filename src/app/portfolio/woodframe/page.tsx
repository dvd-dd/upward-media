"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowLeft,
  Leaf,
  Target,
  Star,
  Compass,
  Paintbrush,
  BookOpen,
  Quote,
  TreePine,
  Feather,
  Layers,
  Droplets,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ─── Brand colors ─── */
const brown = "#B8956A";
const darkBrown = "#2D1B0E";

/* ─── Data ─── */
const essenceCards = [
  {
    icon: Target,
    title: "Purpose",
    text: "Connect people to nature through design.",
  },
  {
    icon: Compass,
    title: "Mission",
    text: "Create pieces and identities that translate the natural with sophistication.",
  },
  {
    icon: Star,
    title: "Vision",
    text: "Be a reference in contemporary natural design.",
  },
  {
    icon: Leaf,
    title: "Values",
    text: "Naturalness, authenticity, artisanal quality, and refined aesthetics.",
  },
];

const personalityTraits = [
  "Elegant, but not excessive",
  "Calm and self-assured",
  "Sophisticated, yet accessible",
  "Connected with nature",
  "Minimalist by essence",
];

const logoElements = [
  {
    icon: TreePine,
    title: "Organic Texture",
    description: "Connection with real wood",
  },
  {
    icon: Droplets,
    title: "Fluid Shapes",
    description: "Nature in motion",
  },
  {
    icon: Feather,
    title: "Clean Typography",
    description: "Modern sophistication",
  },
  {
    icon: Layers,
    title: "Earthy Tones",
    description: "Premium and nature",
  },
];

const colors = [
  {
    name: "Warm Brown",
    hex: "#B8956A",
    text: "white",
    meaning: "Nature & Premium",
  },
  {
    name: "Dark Wood",
    hex: "#2D1B0E",
    text: "white",
    meaning: "Depth & Elegance",
  },
  {
    name: "Cream",
    hex: "#F5F0E8",
    text: "#2D1B0E",
    meaning: "Lightness & Calm",
  },
  {
    name: "Ivory",
    hex: "#FFFDF7",
    text: "#2D1B0E",
    meaning: "Purity & Balance",
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
export default function WoodFramePage() {
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
            background: `radial-gradient(ellipse 70% 55% at 50% 30%, ${brown}15 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 70% 60%, ${darkBrown}20 0%, transparent 70%)`,
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.04,
            backgroundImage: `linear-gradient(${brown}99 1px, transparent 1px), linear-gradient(90deg, ${brown}99 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div data-reveal className="relative z-10 opacity-0 max-w-2xl">
          <div
            className="w-28 h-28 md:w-36 md:h-36 mx-auto mb-8 rounded-3xl overflow-hidden border-2 border-white/10"
            style={{ boxShadow: `0 0 40px ${brown}30` }}
          >
            <Image
              src="/images/portfolio/woodframe-logo.jpg"
              alt="Wood Frame Logo"
              width={144}
              height={144}
              className="w-full h-full object-cover"
              priority
            />
          </div>

          <h1 className="font-clash font-extrabold text-5xl md:text-7xl mb-4">
            <span
              style={{
                background: `linear-gradient(135deg, ${brown}, ${brown}CC)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Wood Frame
            </span>
          </h1>

          <p className="text-text-secondary text-lg md:text-xl mb-6">
            Design born from nature.
          </p>

          <div className="flex flex-wrap justify-center gap-2">
            {["Logo Design", "Natural", "Branding"].map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1.5 rounded-full border text-text-secondary"
                style={{ borderColor: `${brown}40` }}
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
            style={{ color: brown }}
          >
            About the Project
          </p>
          <p className="text-text-secondary text-lg md:text-xl leading-relaxed">
            A brand that transforms the natural into the sophisticated — with
            calm, clarity, and elegance. Wood Frame brings natural wood design
            to a more sophisticated, modern, and sensorial level. It&apos;s not
            just about wood — it&apos;s about experience, aesthetics, and
            connection with nature.
          </p>
        </div>
      </section>

      {/* ───────── 3. BRAND ESSENCE ───────── */}
      <section className="py-24 px-6 bg-surface/50">
        <div className="max-w-6xl mx-auto">
          <div data-reveal className="opacity-0 text-center mb-16">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-4"
              style={{ color: brown }}
            >
              Brand Foundations
            </p>
            <h2 className="font-clash font-extrabold text-3xl md:text-5xl text-white">
              One idea, one essence
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {essenceCards.map((e) => (
              <div
                key={e.title}
                data-reveal
                className="opacity-0 bg-surface border border-border rounded-2xl p-8 hover:border-[#B8956A40] transition-colors duration-300"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${brown}15` }}
                >
                  <e.icon size={22} style={{ color: brown }} />
                </div>
                <h3 className="font-clash font-bold text-xl text-white mb-2">
                  {e.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {e.text}
                </p>
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
              style={{ color: brown }}
            >
              Positioning
            </p>
            <h2 className="font-clash font-extrabold text-3xl md:text-5xl text-white mb-4">
              Natural. Elegant. Premium.
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              A brand for people who value design, nature, and sophistication —
              offering visual solutions and wood products with premium
              aesthetics and organic connection.
            </p>
          </div>

          <div
            data-reveal
            className="opacity-0 flex flex-wrap justify-center gap-4"
          >
            {["Natural", "Elegant", "Minimalist", "Premium"].map((p) => (
              <span
                key={p}
                className="text-lg px-6 py-3 rounded-full border font-clash font-bold text-white"
                style={{ borderColor: `${brown}60` }}
              >
                {p}
              </span>
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
              style={{ color: brown }}
            >
              Personality
            </p>
            <h2 className="font-clash font-extrabold text-3xl md:text-5xl text-white">
              If Wood Frame were a person...
            </h2>
          </div>

          <div data-reveal className="opacity-0 max-w-2xl mx-auto space-y-4 mb-8">
            {personalityTraits.map((trait) => (
              <div
                key={trait}
                className="flex items-center gap-4 bg-surface border border-border rounded-xl p-5 hover:border-[#B8956A40] transition-colors duration-300"
              >
                <span
                  className="w-8 h-[2px] shrink-0"
                  style={{ backgroundColor: brown }}
                />
                <span className="text-white text-base">{trait}</span>
              </div>
            ))}
          </div>

          <div
            data-reveal
            className="opacity-0 max-w-2xl mx-auto rounded-2xl p-6 text-center"
            style={{
              backgroundColor: `${brown}15`,
              border: `1px solid ${brown}30`,
            }}
          >
            <p className="text-white text-sm">
              <span className="font-semibold">Tone of voice:</span> Light,
              refined, simple — without being basic. Sensorial and clear.
            </p>
          </div>
        </div>
      </section>

      {/* ───────── 6. ARCHETYPES ───────── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div data-reveal className="opacity-0 text-center mb-16">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-4"
              style={{ color: brown }}
            >
              Brand Archetypes
            </p>
            <h2 className="font-clash font-extrabold text-3xl md:text-5xl text-white">
              Creator + Sage
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              data-reveal
              className="opacity-0 bg-surface border border-border rounded-2xl p-8 hover:border-[#B8956A40] transition-colors duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <Paintbrush size={24} style={{ color: brown }} />
                <h3 className="font-clash font-bold text-xl text-white">
                  Creator — Primary Archetype
                </h3>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed">
                Creativity, design, and aesthetics as the driving force. Wood
                Frame creates, transforms, and expresses — always with
                intention and beauty.
              </p>
            </div>

            <div
              data-reveal
              className="opacity-0 bg-surface border border-border rounded-2xl p-8 hover:border-[#B8956A40] transition-colors duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <BookOpen size={24} style={{ color: brown }} />
                <h3 className="font-clash font-bold text-xl text-white">
                  Sage — Secondary Archetype
                </h3>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed">
                Knowledge, authority, and quality. A voice that guides with
                clarity, without arrogance — with depth and confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── 7. CORE MESSAGE ───────── */}
      <section className="py-24 px-6 bg-surface/50">
        <div className="max-w-6xl mx-auto">
          <div data-reveal className="opacity-0 text-center mb-16">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-4"
              style={{ color: brown }}
            >
              Core Message
            </p>
            <h2 className="font-clash font-extrabold text-3xl md:text-5xl text-white">
              What Wood Frame communicates
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "What It Says",
                text: "Design, nature, texture, and aesthetics.",
              },
              {
                title: "How It Says It",
                text: "With calm, clarity, and elegance.",
              },
              {
                title: "What It Creates",
                text: "A sense of comfort, desire, and trust.",
              },
            ].map((m) => (
              <div
                key={m.title}
                data-reveal
                className="opacity-0 bg-surface border border-border rounded-2xl p-8 hover:border-[#B8956A40] transition-colors duration-300"
              >
                <h3
                  className="font-clash font-bold text-lg mb-3"
                  style={{ color: brown }}
                >
                  {m.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {m.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 8. VISUAL IDENTITY ───────── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div data-reveal className="opacity-0 text-center mb-16">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-4"
              style={{ color: brown }}
            >
              Visual Identity
            </p>
            <h2 className="font-clash font-extrabold text-3xl md:text-5xl text-white mb-4">
              A visual language rooted in nature
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

          {/* Logo elements */}
          <div
            data-reveal
            className="opacity-0 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {logoElements.map((l) => (
              <div
                key={l.title}
                className="bg-surface border border-border rounded-2xl p-6 text-center hover:border-[#B8956A40] transition-colors duration-300"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                  style={{ backgroundColor: `${brown}15` }}
                >
                  <l.icon size={22} style={{ color: brown }} />
                </div>
                <h4 className="font-clash font-bold text-sm text-white mb-1">
                  {l.title}
                </h4>
                <p className="text-text-muted text-xs">{l.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 9. VERBAL IDENTITY ───────── */}
      <section className="py-24 px-6 bg-surface/50">
        <div className="max-w-6xl mx-auto">
          <div data-reveal className="opacity-0 text-center mb-16">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-4"
              style={{ color: brown }}
            >
              Verbal Identity
            </p>
            <h2 className="font-clash font-extrabold text-3xl md:text-5xl text-white">
              The voice of Wood Frame
            </h2>
          </div>

          {/* Slogan */}
          <div
            data-reveal
            className="opacity-0 bg-surface border border-border rounded-2xl p-8 text-center mb-12 max-w-xl mx-auto"
          >
            <Quote
              size={24}
              className="mx-auto mb-4"
              style={{ color: brown }}
            />
            <p
              className="font-clash font-extrabold text-2xl md:text-3xl italic"
              style={{
                background: `linear-gradient(135deg, ${brown}, ${brown}CC)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              &ldquo;Natural design, refined living.&rdquo;
            </p>
          </div>

          {/* Words used / avoided */}
          <div
            data-reveal
            className="opacity-0 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="bg-surface border border-border rounded-2xl p-8">
              <h3
                className="font-clash font-bold text-lg mb-4"
                style={{ color: brown }}
              >
                Words the brand uses
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Natural",
                  "Texture",
                  "Essence",
                  "Shape",
                  "Organic",
                  "Balance",
                ].map((w) => (
                  <span
                    key={w}
                    className="text-xs px-3 py-1.5 rounded-full border text-white"
                    style={{ borderColor: `${brown}40` }}
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
                {["Cheap", "Common", "Mass Production"].map((w) => (
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

      {/* ───────── 10. CLOSING ───────── */}
      <section className="py-24 px-6">
        <div data-reveal className="opacity-0 max-w-3xl mx-auto text-center">
          <p
            className="text-sm font-semibold uppercase tracking-widest mb-4"
            style={{ color: brown }}
          >
            A Brand of Perception
          </p>
          <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-8">
            Wood Frame is not just a design brand — it&apos;s a brand of
            perception. It transforms the natural into the sophisticated,
            creating an identity that is both simple and memorable.
          </p>
          <p className="text-text-secondary text-base leading-relaxed italic">
            Everything — from Instagram to the product — must convey calm,
            aesthetics, and quality.
          </p>
        </div>
      </section>

      {/* ───────── 11. CTA ───────── */}
      <section className="py-32 px-6 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${brown}10 0%, transparent 70%)`,
          }}
        />

        <div data-reveal className="opacity-0 relative z-10 max-w-2xl mx-auto">
          <h2 className="font-clash font-extrabold text-3xl md:text-5xl text-white mb-6">
            Looking for a brand rooted in nature and elegance?
          </h2>
          <p className="text-text-secondary text-lg mb-8">
            Let&apos;s craft an identity that blends natural beauty with modern
            sophistication.
          </p>
          <Link
            href="/#contact"
            className="inline-block px-10 py-4 rounded-full font-semibold text-white text-base transition-shadow duration-300"
            style={{
              background: `linear-gradient(135deg, ${brown}, ${brown}CC)`,
              boxShadow: `0 0 0 rgba(0,0,0,0)`,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${brown}50, 0 0 80px ${brown}20`;
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
