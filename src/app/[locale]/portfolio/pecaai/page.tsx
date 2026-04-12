"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
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

const blue = "#1F6BFF";
const indigo = "#6D28D9";

const PROBLEM_ICONS = [Car, AlertTriangle, Clock];
const STEP_ICONS = [Search, BarChart3, Truck];
const COLOR_HEXES = ["#1F6BFF", "#6D28D9", "#FFFFFF", "#111827"];
const VOICE_ICONS = [MessageSquare, Wrench, Handshake];
const WHY_ICONS = [Clock, ShieldCheck, DollarSign];

type TitleDescription = { title: string; description: string };
type ColorEntry = { name: string };

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

export default function PecaAiPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("cases.pecaai");
  const tShared = useTranslations("cases");

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  useReveal("[data-reveal]", pageRef);

  const tags = t.raw("tags") as string[];
  const problems = t.raw("problems") as TitleDescription[];
  const steps = t.raw("steps") as TitleDescription[];
  const colors = t.raw("colors") as ColorEntry[];
  const voicePillars = t.raw("voicePillars") as TitleDescription[];
  const whyChoose = t.raw("whyChoose") as TitleDescription[];

  return (
    <div ref={pageRef} className="bg-background text-text-primary">
      <div className="fixed top-24 left-6 z-40">
        <Link
          href="/#portfolio"
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors bg-surface/80 backdrop-blur-md border border-border rounded-full px-4 py-2"
        >
          <ArrowLeft size={16} />
          {tShared("back")}
        </Link>
      </div>

      {/* HERO */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 70% 55% at 50% 30%, ${blue}15 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 70% 60%, ${indigo}10 0%, transparent 70%)`,
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.04,
            backgroundImage: `linear-gradient(rgba(31,107,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(31,107,255,0.6) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div data-reveal className="relative z-10 opacity-0 max-w-2xl">
          <div className="w-28 h-28 md:w-36 md:h-36 mx-auto mb-8 rounded-3xl overflow-hidden border-2 border-border shadow-[0_0_40px_rgba(31,107,255,0.3)]">
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
            {t("tagline")}
          </p>

          <div className="flex flex-wrap justify-center gap-2">
            {tags.map((tag) => (
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

      {/* ABOUT */}
      <section className="py-24 px-6">
        <div data-reveal className="opacity-0 max-w-3xl mx-auto text-center">
          <p
            className="text-sm font-semibold uppercase tracking-widest mb-4"
            style={{ color: blue }}
          >
            {t("aboutEyebrow")}
          </p>
          <p className="text-text-secondary text-lg md:text-xl leading-relaxed">
            {t("aboutBody")}
          </p>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="py-24 px-6 bg-surface/50">
        <div className="max-w-6xl mx-auto">
          <div data-reveal className="opacity-0 text-center mb-16">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-4"
              style={{ color: blue }}
            >
              {t("problemEyebrow")}
            </p>
            <h2 className="font-clash font-extrabold text-3xl md:text-5xl text-text-primary">
              {t("problemTitle")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {problems.map((p, i) => {
              const Icon = PROBLEM_ICONS[i] ?? Car;
              return (
                <div
                  key={p.title}
                  data-reveal
                  className="opacity-0 bg-surface border border-border rounded-2xl p-8 text-center hover:border-[#1F6BFF40] transition-colors duration-300"
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-5"
                    style={{ backgroundColor: `${blue}15` }}
                  >
                    <Icon size={26} style={{ color: blue }} />
                  </div>
                  <h3 className="font-clash font-bold text-xl text-text-primary mb-3">
                    {p.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {p.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div data-reveal className="opacity-0 text-center mb-16">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-4"
              style={{ color: blue }}
            >
              {t("solutionEyebrow")}
            </p>
            <h2 className="font-clash font-extrabold text-3xl md:text-5xl text-text-primary mb-4">
              {t("solutionTitle")}
            </h2>
            <p className="text-text-secondary text-lg max-w-xl mx-auto">
              {t("solutionSubtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s, i) => {
              const Icon = STEP_ICONS[i] ?? Search;
              const stepNum = String(i + 1).padStart(2, "0");
              return (
                <div key={s.title} data-reveal className="opacity-0 relative">
                  <span
                    className="font-clash font-extrabold text-6xl block mb-4"
                    style={{ color: `${blue}20` }}
                  >
                    {stepNum}
                  </span>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${blue}15` }}
                  >
                    <Icon size={22} style={{ color: blue }} />
                  </div>
                  <h3 className="font-clash font-bold text-xl text-text-primary mb-2">
                    {s.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {s.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div data-reveal className="opacity-0 mt-16 text-center">
            <p
              className="font-clash font-extrabold text-2xl md:text-4xl"
              style={{
                background: `linear-gradient(135deg, ${blue}, ${indigo})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {t("solutionTagline")}
            </p>
          </div>
        </div>
      </section>

      {/* IDENTITY */}
      <section className="py-24 px-6 bg-surface/50">
        <div className="max-w-6xl mx-auto">
          <div data-reveal className="opacity-0 text-center mb-16">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-4"
              style={{ color: blue }}
            >
              {t("identityEyebrow")}
            </p>
            <h2 className="font-clash font-extrabold text-3xl md:text-5xl text-text-primary mb-4">
              {t("identityTitle")}
            </h2>
          </div>

          <div
            data-reveal
            className="opacity-0 grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            {colors.map((c, i) => {
              const hex = COLOR_HEXES[i];
              return (
                <div
                  key={hex}
                  className="rounded-2xl overflow-hidden border border-border"
                >
                  <div
                    className="h-28 md:h-36"
                    style={{ backgroundColor: hex }}
                  />
                  <div className="bg-surface p-4">
                    <p className="text-text-primary text-sm font-semibold">{c.name}</p>
                    <p className="text-text-muted text-xs font-mono">{hex}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            data-reveal
            className="opacity-0 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="bg-surface border border-border rounded-2xl p-8">
              <p
                className="text-sm font-semibold uppercase tracking-widest mb-4"
                style={{ color: blue }}
              >
                {t("typographyLabel")}
              </p>
              <p className="font-clash font-extrabold text-4xl text-text-primary mb-2">
                Inter
              </p>
              <p className="text-text-secondary text-sm leading-relaxed">
                {t("typographyBody")}
              </p>
            </div>
            <div className="bg-surface border border-border rounded-2xl p-8">
              <p
                className="text-sm font-semibold uppercase tracking-widest mb-4"
                style={{ color: blue }}
              >
                {t("approachLabel")}
              </p>
              <p className="font-clash font-bold text-xl text-text-primary mb-2">
                {t("approachTitle")}
              </p>
              <p className="text-text-secondary text-sm leading-relaxed">
                {t("approachBody")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VOICE */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div data-reveal className="opacity-0 text-center mb-16">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-4"
              style={{ color: blue }}
            >
              {t("voiceEyebrow")}
            </p>
            <h2 className="font-clash font-extrabold text-3xl md:text-5xl text-text-primary">
              {t("voiceTitle")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {voicePillars.map((v, i) => {
              const Icon = VOICE_ICONS[i] ?? MessageSquare;
              return (
                <div
                  key={v.title}
                  data-reveal
                  className="opacity-0 bg-surface border border-border rounded-2xl p-8 text-center hover:border-[#1F6BFF40] transition-colors duration-300"
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-5"
                    style={{ backgroundColor: `${indigo}15` }}
                  >
                    <Icon size={26} style={{ color: indigo }} />
                  </div>
                  <h3 className="font-clash font-bold text-xl text-text-primary mb-3">
                    {v.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {v.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="py-24 px-6 bg-surface/50">
        <div className="max-w-6xl mx-auto">
          <div data-reveal className="opacity-0 text-center mb-16">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-4"
              style={{ color: blue }}
            >
              {t("whyEyebrow")}
            </p>
            <h2 className="font-clash font-extrabold text-3xl md:text-5xl text-text-primary">
              {t("whyTitle")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whyChoose.map((w, i) => {
              const Icon = WHY_ICONS[i] ?? Clock;
              return (
                <div
                  key={w.title}
                  data-reveal
                  className="opacity-0 bg-surface border border-border rounded-2xl p-8 text-center hover:border-[#1F6BFF40] transition-colors duration-300"
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-5"
                    style={{ backgroundColor: `${blue}15` }}
                  >
                    <Icon size={26} style={{ color: blue }} />
                  </div>
                  <h3 className="font-clash font-bold text-xl text-text-primary mb-3">
                    {w.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {w.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${blue}10 0%, transparent 70%)`,
          }}
        />

        <div data-reveal className="opacity-0 relative z-10 max-w-2xl mx-auto">
          <h2 className="font-clash font-extrabold text-3xl md:text-5xl text-text-primary mb-6">
            {t("ctaTitle")}
          </h2>
          <p className="text-text-secondary text-lg mb-8">{t("ctaBody")}</p>
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
            {tShared("startProject")}
          </Link>
        </div>
      </section>
    </div>
  );
}
