"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowLeft,
  Shield,
  Brain,
  Eye,
  Rocket,
  Cpu,
  ShieldCheck,
  Zap,
  RefreshCw,
  Lock,
  Quote,
  Swords,
  BookOpen,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ─── Brand colors ─── */
const purple = "#7C3AED";
const green = "#10B981";

/* ─── Data ─── */
const essence = [
  {
    title: "Segment",
    text: "Security network, Cybersecurity, and Monitoring.",
  },
  {
    title: "Purpose",
    text: "Protect people, data, and systems with intelligence and innovation.",
  },
  {
    title: "Mission",
    text: "Offer reliable, technological security in real time.",
  },
  {
    title: "Vision",
    text: "Be a reference in digital security and advanced protection.",
  },
];

const positioningPillars = [
  { icon: Cpu, title: "High Technology", description: "Cutting-edge solutions" },
  {
    icon: ShieldCheck,
    title: "Intelligent Protection",
    description: "Smart and proactive security",
  },
  {
    icon: Zap,
    title: "Agility & Precision",
    description: "Fast response, accurate results",
  },
  {
    icon: RefreshCw,
    title: "Continuous Evolution",
    description: "Always learning, always improving",
  },
];

const personality = [
  {
    icon: Swords,
    title: "Strategic",
    description:
      "Thinks ahead, anticipates risks, and acts with precision before the problem happens.",
  },
  {
    icon: Brain,
    title: "Intelligent",
    description:
      "Analyzes, learns, and evolves with each new threat — never stagnant.",
  },
  {
    icon: Eye,
    title: "Vigilant",
    description:
      "Present 24/7, with constant attention and immediate response.",
  },
  {
    icon: Rocket,
    title: "Secure & Futuristic",
    description:
      "Transmits confidence with cutting-edge technology and modern language.",
  },
];

const colors = [
  {
    name: "Purple",
    hex: "#7C3AED",
    text: "white",
    meaning: "Technology & Innovation",
  },
  {
    name: "White",
    hex: "#FFFFFF",
    text: "#1A1A1A",
    meaning: "Clarity & Transparency",
  },
  {
    name: "Black",
    hex: "#1A1A1A",
    text: "white",
    meaning: "Security & Strength",
  },
  {
    name: "Graphite",
    hex: "#2D2D2D",
    text: "white",
    meaning: "Solidity & Structure",
  },
];

const logoElements = [
  { title: "Wing Shape", description: "Protection and total coverage" },
  { title: "The Phoenix", description: "Rebirth and resistance" },
  { title: "Purple Lines", description: "Technology, energy, and innovation" },
  { title: "Clean Visual", description: "Modernity and precision" },
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
export default function PhoenixPage() {
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
            background: `radial-gradient(ellipse 70% 55% at 50% 30%, ${purple}15 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 70% 60%, ${green}10 0%, transparent 70%)`,
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.04,
            backgroundImage: `linear-gradient(${purple}99 1px, transparent 1px), linear-gradient(90deg, ${purple}99 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div data-reveal className="relative z-10 opacity-0 max-w-2xl">
          <div
            className="w-28 h-28 md:w-36 md:h-36 mx-auto mb-8 rounded-3xl overflow-hidden border-2 border-white/10"
            style={{ boxShadow: `0 0 40px ${purple}30` }}
          >
            <Image
              src="/images/portfolio/phoenix-logo.jpg"
              alt="Phoenix Logo"
              width={144}
              height={144}
              className="w-full h-full object-cover"
              priority
            />
          </div>

          <h1 className="font-clash font-extrabold text-5xl md:text-7xl mb-4">
            <span
              style={{
                background: `linear-gradient(135deg, ${purple}, ${green})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Phoenix
            </span>
          </h1>

          <p className="text-text-secondary text-lg md:text-xl mb-6">
            Intelligent Protection. Constant Evolution.
          </p>

          <div className="flex flex-wrap justify-center gap-2">
            {["Branding", "Cybersecurity", "Logo Design"].map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1.5 rounded-full border text-text-secondary"
                style={{ borderColor: `${purple}40` }}
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
            style={{ color: purple }}
          >
            About the Project
          </p>
          <p className="text-text-secondary text-lg md:text-xl leading-relaxed">
            A brand born to protect people, data, and systems — with the
            strength of rebirth and the precision of modern technology. Like the
            phoenix, it represents rebirth, strength, and the ability to
            reinvent itself constantly.
          </p>
        </div>
      </section>

      {/* ───────── 3. BRAND ESSENCE ───────── */}
      <section className="py-24 px-6 bg-surface/50">
        <div className="max-w-6xl mx-auto">
          <div data-reveal className="opacity-0 text-center mb-16">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-4"
              style={{ color: purple }}
            >
              Brand Essence
            </p>
            <h2 className="font-clash font-extrabold text-3xl md:text-5xl text-white">
              The concept behind the name
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {essence.map((e) => (
              <div
                key={e.title}
                data-reveal
                className="opacity-0 bg-surface border border-border rounded-2xl p-8 hover:border-[#7C3AED40] transition-colors duration-300"
              >
                <h3
                  className="font-clash font-bold text-lg mb-3"
                  style={{ color: green }}
                >
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
              style={{ color: purple }}
            >
              Positioning
            </p>
            <h2 className="font-clash font-extrabold text-3xl md:text-5xl text-white mb-4">
              High Technology + Protection + Intelligence
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Phoenix is a security network for companies and people who need
              reliable, intelligent protection — offering advanced technological
              solutions with agility, precision, and constant evolution.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {positioningPillars.map((p) => (
              <div
                key={p.title}
                data-reveal
                className="opacity-0 bg-surface border border-border rounded-2xl p-6 text-center hover:border-[#7C3AED40] transition-colors duration-300"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: `${green}15` }}
                >
                  <p.icon size={22} style={{ color: green }} />
                </div>
                <h3 className="font-clash font-bold text-sm text-white">
                  {p.title}
                </h3>
                <p className="text-text-muted text-xs mt-1">
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
              style={{ color: purple }}
            >
              Personality
            </p>
            <h2 className="font-clash font-extrabold text-3xl md:text-5xl text-white">
              If Phoenix were a person...
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {personality.map((p) => (
              <div
                key={p.title}
                data-reveal
                className="opacity-0 bg-surface border border-border rounded-2xl p-8 hover:border-[#7C3AED40] transition-colors duration-300"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${purple}15` }}
                >
                  <p.icon size={22} style={{ color: purple }} />
                </div>
                <h3 className="font-clash font-bold text-xl text-white mb-2">
                  {p.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {p.description}
                </p>
              </div>
            ))}
          </div>

          <div
            data-reveal
            className="opacity-0 rounded-2xl p-6 text-center"
            style={{ backgroundColor: `${green}15`, border: `1px solid ${green}30` }}
          >
            <p className="text-white text-sm">
              <span className="font-semibold">Tone of voice:</span> Direct,
              Confident, Technical (without being complicated), Modern
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
              style={{ color: purple }}
            >
              Brand Archetypes
            </p>
            <h2 className="font-clash font-extrabold text-3xl md:text-5xl text-white">
              Hero + Sage
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              data-reveal
              className="opacity-0 bg-surface border border-border rounded-2xl p-8 hover:border-[#7C3AED40] transition-colors duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <Shield size={24} style={{ color: green }} />
                <h3 className="font-clash font-bold text-xl text-white">
                  Hero — Primary Archetype
                </h3>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                Phoenix protects, resolves, and faces risks with courage and
                determination. It is present in critical moments to ensure the
                client comes out stronger.
              </p>
              <ul className="space-y-2">
                {[
                  "Protects and resolves",
                  "Faces risks with courage",
                  "Acts with determination",
                ].map((item) => (
                  <li
                    key={item}
                    className="text-text-secondary text-sm flex items-center gap-2"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: green }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div
              data-reveal
              className="opacity-0 bg-surface border border-border rounded-2xl p-8 hover:border-[#7C3AED40] transition-colors duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <BookOpen size={24} style={{ color: purple }} />
                <h3 className="font-clash font-bold text-xl text-white">
                  Sage — Secondary Archetype
                </h3>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                With intelligence, analysis, and precision, Phoenix makes
                data-driven decisions based on knowledge — not reaction, but
                strategy.
              </p>
              <ul className="space-y-2">
                {[
                  "Intelligence and analysis",
                  "Precision and method",
                  "Strategic knowledge",
                ].map((item) => (
                  <li
                    key={item}
                    className="text-text-secondary text-sm flex items-center gap-2"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: purple }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
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
              style={{ color: purple }}
            >
              Core Message
            </p>
            <h2 className="font-clash font-extrabold text-3xl md:text-5xl text-white">
              What Phoenix communicates
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "What It Says",
                text: "Security, technology, protection, and control — with authority and clarity.",
              },
              {
                title: "How It Says It",
                text: "With a direct, confident, and technical tone — modern without being complicated.",
              },
              {
                title: "What It Creates",
                text: "A sense of security, confidence, and total control in the client.",
              },
            ].map((m) => (
              <div
                key={m.title}
                data-reveal
                className="opacity-0 bg-surface border border-border rounded-2xl p-8 hover:border-[#7C3AED40] transition-colors duration-300"
              >
                <h3
                  className="font-clash font-bold text-lg mb-3"
                  style={{ color: green }}
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

      {/* ───────── 8. BRAND IDENTITY ───────── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div data-reveal className="opacity-0 text-center mb-16">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-4"
              style={{ color: purple }}
            >
              Visual Identity
            </p>
            <h2 className="font-clash font-extrabold text-3xl md:text-5xl text-white mb-4">
              A symbol that communicates power
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

          {/* Logo symbolism */}
          <div
            data-reveal
            className="opacity-0 grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            {logoElements.map((l) => (
              <div
                key={l.title}
                className="bg-surface border border-border rounded-2xl p-6 text-center"
              >
                <h4
                  className="font-clash font-bold text-sm mb-1"
                  style={{ color: purple }}
                >
                  {l.title}
                </h4>
                <p className="text-text-muted text-xs">{l.description}</p>
              </div>
            ))}
          </div>

          {/* Visual style callout */}
          <div
            data-reveal
            className="opacity-0 rounded-2xl p-6 text-center"
            style={{ backgroundColor: `${green}15`, border: `1px solid ${green}30` }}
          >
            <p className="text-white text-sm">
              <span className="font-semibold">Style:</span> Futuristic,
              Minimalist, High-tech — with energy lines, digital grids, and
              technological interfaces.
            </p>
          </div>
        </div>
      </section>

      {/* ───────── 9. VERBAL IDENTITY ───────── */}
      <section className="py-24 px-6 bg-surface/50">
        <div className="max-w-6xl mx-auto">
          <div data-reveal className="opacity-0 text-center mb-16">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-4"
              style={{ color: purple }}
            >
              Verbal Identity
            </p>
            <h2 className="font-clash font-extrabold text-3xl md:text-5xl text-white">
              How Phoenix speaks
            </h2>
          </div>

          {/* Slogans */}
          <div
            data-reveal
            className="opacity-0 grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            {[
              "Security that evolves with you.",
              "Intelligent protection in real time.",
              "Reinventing security.",
            ].map((s) => (
              <div
                key={s}
                className="bg-surface border border-border rounded-2xl p-8 text-center hover:border-[#7C3AED40] transition-colors duration-300"
              >
                <Quote
                  size={24}
                  className="mx-auto mb-4"
                  style={{ color: purple }}
                />
                <p className="text-white font-clash font-bold text-lg italic">
                  &ldquo;{s}&rdquo;
                </p>
              </div>
            ))}
          </div>

          {/* Words used / avoided */}
          <div
            data-reveal
            className="opacity-0 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="bg-surface border border-border rounded-2xl p-8">
              <h3
                className="font-clash font-bold text-lg mb-4"
                style={{ color: green }}
              >
                Words the brand uses
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Protection",
                  "Intelligence",
                  "Monitoring",
                  "Network",
                  "Control",
                  "Evolution",
                  "Security",
                ].map((w) => (
                  <span
                    key={w}
                    className="text-xs px-3 py-1.5 rounded-full border text-white"
                    style={{ borderColor: `${green}40` }}
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
                {["Basic", "Too Simple", "Improvisation", "Generic"].map(
                  (w) => (
                    <span
                      key={w}
                      className="text-xs px-3 py-1.5 rounded-full border border-border text-text-muted line-through"
                    >
                      {w}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── 10. CLOSING ───────── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div data-reveal className="opacity-0 text-center mb-12">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-4"
              style={{ color: purple }}
            >
              Closing
            </p>
            <h2 className="font-clash font-extrabold text-3xl md:text-5xl text-white mb-6">
              More than a network — a system that evolves
            </h2>
            <blockquote className="max-w-2xl mx-auto mb-12">
              <p className="text-text-secondary text-lg italic leading-relaxed">
                &ldquo;Phoenix is not just a security network — it&apos;s a
                system that evolves, learns, and continuously protects. It
                transforms security into strategic intelligence.&rdquo;
              </p>
            </blockquote>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: "Protection",
                description: "Continuous and intelligent",
              },
              {
                icon: RefreshCw,
                title: "Evolution",
                description: "Learns and reinvents itself",
              },
              {
                icon: Lock,
                title: "Control",
                description: "Total and in real time",
              },
            ].map((item) => (
              <div
                key={item.title}
                data-reveal
                className="opacity-0 bg-surface border border-border rounded-2xl p-8 text-center hover:border-[#7C3AED40] transition-colors duration-300"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-5"
                  style={{ backgroundColor: `${purple}15` }}
                >
                  <item.icon size={26} style={{ color: purple }} />
                </div>
                <h3 className="font-clash font-bold text-xl text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-text-secondary text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 11. CTA ───────── */}
      <section className="py-32 px-6 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${purple}10 0%, transparent 70%)`,
          }}
        />

        <div data-reveal className="opacity-0 relative z-10 max-w-2xl mx-auto">
          <h2 className="font-clash font-extrabold text-3xl md:text-5xl text-white mb-6">
            Need a brand that commands security and trust?
          </h2>
          <p className="text-text-secondary text-lg mb-8">
            Let&apos;s build an identity that protects, evolves, and positions
            your brand as a leader.
          </p>
          <Link
            href="/#contact"
            className="inline-block px-10 py-4 rounded-full font-semibold text-white text-base transition-shadow duration-300"
            style={{
              background: `linear-gradient(135deg, ${purple}, ${green})`,
              boxShadow: `0 0 0 rgba(0,0,0,0)`,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${purple}50, 0 0 80px ${purple}20`;
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
