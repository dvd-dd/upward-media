"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowLeft,
  Car,
  AlertTriangle,
  Clock,
  Search,
  BarChart3,
  Truck,
  MessageSquare,
  Wrench,
  Handshake,
  ShieldCheck,
  DollarSign,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ─── Brand colors ─── */
const blue = "#1F6BFF";
const indigo = "#6D28D9";

/* ─── Data ─── */
const problems = [
  {
    icon: Car,
    title: "Idle Cars",
    description:
      "Clients waiting while shops waste time calling suppliers one by one.",
  },
  {
    icon: AlertTriangle,
    title: "Wrong Parts",
    description:
      "Miscommunication leads to rework, returns, and extra cost for everyone.",
  },
  {
    icon: Clock,
    title: "Slow Process",
    description:
      "Manual ordering slows down the entire workshop workflow.",
  },
];

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Smart Search",
    description:
      "Type the code or model — the system finds compatible parts instantly.",
  },
  {
    icon: BarChart3,
    step: "02",
    title: "Compare Prices",
    description:
      "See offers from verified suppliers side by side, in seconds.",
  },
  {
    icon: Truck,
    step: "03",
    title: "Order & Receive",
    description:
      "Quick confirmation, real-time tracking, delivery on schedule.",
  },
];

const colors = [
  { name: "Primary Blue", hex: "#1F6BFF", text: "white" },
  { name: "Indigo Gradient", hex: "#6D28D9", text: "white" },
  { name: "White", hex: "#FFFFFF", text: "#111827" },
  { name: "Dark Text", hex: "#111827", text: "white" },
];

const voicePillars = [
  {
    icon: MessageSquare,
    title: "Straight to the Point",
    description:
      "No marketing fluff. We speak the language of those who work with greasy hands and need results.",
  },
  {
    icon: Wrench,
    title: "Technical When Needed",
    description:
      "We know part codes, specifications, and compatibility. You don't need to explain the obvious.",
  },
  {
    icon: Handshake,
    title: "Partner, Not Seller",
    description:
      "We're here to make your day easier, not to push product. Your success is our success.",
  },
];

const whyChoose = [
  {
    icon: Clock,
    title: "Save Time",
    description:
      "Fewer calls, less waiting, more cars done by end of day.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Suppliers",
    description:
      "Work only with trusted stores and guaranteed quality.",
  },
  {
    icon: DollarSign,
    title: "Best Price",
    description:
      "Compare real-time offers and choose the best deal.",
  },
];

/* ─── Reusable scroll reveal hook ─── */
function useReveal(selector: string, containerRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const triggers: ScrollTrigger[] = [];
    let fallbackTimer: ReturnType<typeof setTimeout>;

    // Wait for two frames so layout is fully settled before creating triggers
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

        // Fallback refresh for slow devices / late image loads
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
export default function PecaAiPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  // Force scroll to top on mount (before animations)
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
        {/* Gradient background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 70% 55% at 50% 30%, ${blue}15 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 70% 60%, ${indigo}10 0%, transparent 70%)`,
          }}
        />
        {/* Grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.04,
            backgroundImage: `linear-gradient(rgba(31,107,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(31,107,255,0.6) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div data-reveal className="relative z-10 opacity-0 max-w-2xl">
          {/* Logo */}
          <div className="w-28 h-28 md:w-36 md:h-36 mx-auto mb-8 rounded-3xl overflow-hidden border-2 border-white/10 shadow-[0_0_40px_rgba(31,107,255,0.3)]">
            <Image
              src="/images/portfolio/pecaai-logo.jpeg"
              alt="PeçaAí Logo"
              width={144}
              height={144}
              className="w-full h-full object-cover"
              priority
            />
          </div>

          <h1 className="font-clash font-extrabold text-5xl md:text-7xl mb-4">
            <span
              style={{
                background: `linear-gradient(135deg, ${blue}, ${indigo})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              PeçaAí
            </span>
          </h1>

          <p className="text-text-secondary text-lg md:text-xl mb-6">
            Complete Brand Identity — Automotive Parts Marketplace
          </p>

          <div className="flex flex-wrap justify-center gap-2">
            {["Branding", "Visual Identity", "App Design"].map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1.5 rounded-full border text-text-secondary"
                style={{ borderColor: `${blue}40` }}
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
            style={{ color: blue }}
          >
            About the Project
          </p>
          <p className="text-text-secondary text-lg md:text-xl leading-relaxed">
            PeçaAí is a marketplace app designed for auto repair shops — think
            Uber Eats for car parts. We created the complete brand identity from
            scratch, including logo, color system, typography, tone of voice,
            and a full brand deck.
          </p>
        </div>
      </section>

      {/* ───────── 3. THE PROBLEM ───────── */}
      <section className="py-24 px-6 bg-surface/50">
        <div className="max-w-6xl mx-auto">
          <div data-reveal className="opacity-0 text-center mb-16">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-4"
              style={{ color: blue }}
            >
              The Problem
            </p>
            <h2 className="font-clash font-extrabold text-3xl md:text-5xl text-white">
              What was broken
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {problems.map((p) => (
              <div
                key={p.title}
                data-reveal
                className="opacity-0 bg-surface border border-border rounded-2xl p-8 text-center hover:border-[#1F6BFF40] transition-colors duration-300"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-5"
                  style={{ backgroundColor: `${blue}15` }}
                >
                  <p.icon size={26} style={{ color: blue }} />
                </div>
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

      {/* ───────── 4. THE SOLUTION ───────── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div data-reveal className="opacity-0 text-center mb-16">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-4"
              style={{ color: blue }}
            >
              The Solution
            </p>
            <h2 className="font-clash font-extrabold text-3xl md:text-5xl text-white mb-4">
              How it works
            </h2>
            <p className="text-text-secondary text-lg max-w-xl mx-auto">
              Three simple steps that replace dozens of phone calls.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s) => (
              <div key={s.step} data-reveal className="opacity-0 relative">
                <span
                  className="font-clash font-extrabold text-6xl block mb-4"
                  style={{ color: `${blue}20` }}
                >
                  {s.step}
                </span>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${blue}15` }}
                >
                  <s.icon size={22} style={{ color: blue }} />
                </div>
                <h3 className="font-clash font-bold text-xl text-white mb-2">
                  {s.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {s.description}
                </p>
              </div>
            ))}
          </div>

          {/* Tagline */}
          <div data-reveal className="opacity-0 mt-16 text-center">
            <p
              className="font-clash font-extrabold text-2xl md:text-4xl"
              style={{
                background: `linear-gradient(135deg, ${blue}, ${indigo})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Found it. Ordered it. Delivered.
            </p>
          </div>
        </div>
      </section>

      {/* ───────── 5. BRAND IDENTITY ───────── */}
      <section className="py-24 px-6 bg-surface/50">
        <div className="max-w-6xl mx-auto">
          <div data-reveal className="opacity-0 text-center mb-16">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-4"
              style={{ color: blue }}
            >
              Brand Identity
            </p>
            <h2 className="font-clash font-extrabold text-3xl md:text-5xl text-white mb-4">
              The visual system
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
                </div>
              </div>
            ))}
          </div>

          {/* Typography & approach */}
          <div data-reveal className="opacity-0 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface border border-border rounded-2xl p-8">
              <p
                className="text-sm font-semibold uppercase tracking-widest mb-4"
                style={{ color: blue }}
              >
                Typography
              </p>
              <p className="font-clash font-extrabold text-4xl text-white mb-2">
                Inter
              </p>
              <p className="text-text-secondary text-sm leading-relaxed">
                Clean, highly legible, and versatile — perfect for a product
                that needs to communicate quickly and clearly.
              </p>
            </div>
            <div className="bg-surface border border-border rounded-2xl p-8">
              <p
                className="text-sm font-semibold uppercase tracking-widest mb-4"
                style={{ color: blue }}
              >
                Design Approach
              </p>
              <p className="font-clash font-bold text-xl text-white mb-2">
                Clean. Direct. Functional.
              </p>
              <p className="text-text-secondary text-sm leading-relaxed">
                Inspired by the best delivery and marketplace apps. Every
                element is designed to reduce friction and get mechanics back
                to work faster.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── 6. TONE OF VOICE ───────── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div data-reveal className="opacity-0 text-center mb-16">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-4"
              style={{ color: blue }}
            >
              Tone of Voice
            </p>
            <h2 className="font-clash font-extrabold text-3xl md:text-5xl text-white">
              How the brand speaks
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {voicePillars.map((v) => (
              <div
                key={v.title}
                data-reveal
                className="opacity-0 bg-surface border border-border rounded-2xl p-8 text-center hover:border-[#1F6BFF40] transition-colors duration-300"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-5"
                  style={{ backgroundColor: `${indigo}15` }}
                >
                  <v.icon size={26} style={{ color: indigo }} />
                </div>
                <h3 className="font-clash font-bold text-xl text-white mb-3">
                  {v.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 7. WHY CHOOSE ───────── */}
      <section className="py-24 px-6 bg-surface/50">
        <div className="max-w-6xl mx-auto">
          <div data-reveal className="opacity-0 text-center mb-16">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-4"
              style={{ color: blue }}
            >
              Why Choose
            </p>
            <h2 className="font-clash font-extrabold text-3xl md:text-5xl text-white">
              Why choose PeçaAí?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whyChoose.map((w) => (
              <div
                key={w.title}
                data-reveal
                className="opacity-0 bg-surface border border-border rounded-2xl p-8 text-center hover:border-[#1F6BFF40] transition-colors duration-300"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-5"
                  style={{ backgroundColor: `${blue}15` }}
                >
                  <w.icon size={26} style={{ color: blue }} />
                </div>
                <h3 className="font-clash font-bold text-xl text-white mb-3">
                  {w.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {w.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 8. CTA ───────── */}
      <section className="py-32 px-6 text-center relative overflow-hidden">
        {/* Gradient bg */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${blue}10 0%, transparent 70%)`,
          }}
        />

        <div data-reveal className="opacity-0 relative z-10 max-w-2xl mx-auto">
          <h2 className="font-clash font-extrabold text-3xl md:text-5xl text-white mb-6">
            Interested in a brand identity like this?
          </h2>
          <p className="text-text-secondary text-lg mb-8">
            Let&apos;s craft a unique identity that positions your brand for
            growth.
          </p>
          <Link
            href="/#contact"
            className="inline-block px-10 py-4 rounded-full font-semibold text-white text-base transition-shadow duration-300"
            style={{
              background: `linear-gradient(135deg, ${blue}, ${indigo})`,
              boxShadow: `0 0 0 rgba(31,107,255,0)`,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${blue}50, 0 0 80px ${blue}20`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 rgba(31,107,255,0)`;
            }}
          >
            Start Your Project
          </Link>
        </div>
      </section>
    </div>
  );
}
