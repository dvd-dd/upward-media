"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
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

const purple = "#7C3AED";
const green = "#10B981";

const PILLAR_ICONS = [Cpu, ShieldCheck, Zap, RefreshCw];
const PERSONALITY_ICONS = [Swords, Brain, Eye, Rocket];
const COLOR_HEXES = ["#7C3AED", "#FFFFFF", "#1A1A1A", "#2D2D2D"];
const CLOSING_ICONS = [Shield, RefreshCw, Lock];

type TitleText = { title: string; text: string };
type TitleDescription = { title: string; description: string };
type ColorEntry = { name: string; meaning: string };

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

export default function PhoenixPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("cases.phoenix");
  const tShared = useTranslations("cases");

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  useReveal("[data-reveal]", pageRef);

  const tags = t.raw("tags") as string[];
  const essence = t.raw("essence") as TitleText[];
  const pillars = t.raw("pillars") as TitleDescription[];
  const personality = t.raw("personality") as TitleDescription[];
  const heroItems = t.raw("heroItems") as string[];
  const sageItems = t.raw("sageItems") as string[];
  const message = t.raw("message") as TitleText[];
  const colors = t.raw("colors") as ColorEntry[];
  const logoElements = t.raw("logoElements") as TitleDescription[];
  const slogans = t.raw("slogans") as string[];
  const usedWords = t.raw("usedWords") as string[];
  const avoidedWords = t.raw("avoidedWords") as string[];
  const closing = t.raw("closing") as TitleDescription[];

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
            className="w-28 h-28 md:w-36 md:h-36 mx-auto mb-8 rounded-3xl overflow-hidden border-2 border-border"
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
            {t("tagline")}
          </p>

          <div className="flex flex-wrap justify-center gap-2">
            {tags.map((tag) => (
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

      {/* ABOUT */}
      <section className="py-24 px-6">
        <div data-reveal className="opacity-0 max-w-3xl mx-auto text-center">
          <p
            className="text-sm font-semibold uppercase tracking-widest mb-4"
            style={{ color: purple }}
          >
            {t("aboutEyebrow")}
          </p>
          <p className="text-text-secondary text-lg md:text-xl leading-relaxed">
            {t("aboutBody")}
          </p>
        </div>
      </section>

      {/* ESSENCE */}
      <section className="py-24 px-6 bg-surface/50">
        <div className="max-w-6xl mx-auto">
          <div data-reveal className="opacity-0 text-center mb-16">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-4"
              style={{ color: purple }}
            >
              {t("essenceEyebrow")}
            </p>
            <h2 className="font-clash font-extrabold text-3xl md:text-5xl text-text-primary">
              {t("essenceTitle")}
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

      {/* POSITIONING */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div data-reveal className="opacity-0 text-center mb-16">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-4"
              style={{ color: purple }}
            >
              {t("positioningEyebrow")}
            </p>
            <h2 className="font-clash font-extrabold text-3xl md:text-5xl text-text-primary mb-4">
              {t("positioningTitle")}
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              {t("positioningSubtitle")}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {pillars.map((p, i) => {
              const Icon = PILLAR_ICONS[i] ?? Cpu;
              return (
                <div
                  key={p.title}
                  data-reveal
                  className="opacity-0 bg-surface border border-border rounded-2xl p-6 text-center hover:border-[#7C3AED40] transition-colors duration-300"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: `${green}15` }}
                  >
                    <Icon size={22} style={{ color: green }} />
                  </div>
                  <h3 className="font-clash font-bold text-sm text-text-primary">
                    {p.title}
                  </h3>
                  <p className="text-text-muted text-xs mt-1">{p.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PERSONALITY */}
      <section className="py-24 px-6 bg-surface/50">
        <div className="max-w-6xl mx-auto">
          <div data-reveal className="opacity-0 text-center mb-16">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-4"
              style={{ color: purple }}
            >
              {t("personalityEyebrow")}
            </p>
            <h2 className="font-clash font-extrabold text-3xl md:text-5xl text-text-primary">
              {t("personalityTitle")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {personality.map((p, i) => {
              const Icon = PERSONALITY_ICONS[i] ?? Brain;
              return (
                <div
                  key={p.title}
                  data-reveal
                  className="opacity-0 bg-surface border border-border rounded-2xl p-8 hover:border-[#7C3AED40] transition-colors duration-300"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${purple}15` }}
                  >
                    <Icon size={22} style={{ color: purple }} />
                  </div>
                  <h3 className="font-clash font-bold text-xl text-text-primary mb-2">
                    {p.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {p.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div
            data-reveal
            className="opacity-0 rounded-2xl p-6 text-center"
            style={{ backgroundColor: `${green}15`, border: `1px solid ${green}30` }}
          >
            <p className="text-text-primary text-sm">
              <span className="font-semibold">{t("toneLabel")}</span>{" "}
              {t("toneBody")}
            </p>
          </div>
        </div>
      </section>

      {/* ARCHETYPES */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div data-reveal className="opacity-0 text-center mb-16">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-4"
              style={{ color: purple }}
            >
              {t("archetypesEyebrow")}
            </p>
            <h2 className="font-clash font-extrabold text-3xl md:text-5xl text-text-primary">
              {t("archetypesTitle")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              data-reveal
              className="opacity-0 bg-surface border border-border rounded-2xl p-8 hover:border-[#7C3AED40] transition-colors duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <Shield size={24} style={{ color: green }} />
                <h3 className="font-clash font-bold text-xl text-text-primary">
                  {t("heroTitle")}
                </h3>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                {t("heroBody")}
              </p>
              <ul className="space-y-2">
                {heroItems.map((item) => (
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
                <h3 className="font-clash font-bold text-xl text-text-primary">
                  {t("sageTitle")}
                </h3>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                {t("sageBody")}
              </p>
              <ul className="space-y-2">
                {sageItems.map((item) => (
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

      {/* CORE MESSAGE */}
      <section className="py-24 px-6 bg-surface/50">
        <div className="max-w-6xl mx-auto">
          <div data-reveal className="opacity-0 text-center mb-16">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-4"
              style={{ color: purple }}
            >
              {t("messageEyebrow")}
            </p>
            <h2 className="font-clash font-extrabold text-3xl md:text-5xl text-text-primary">
              {t("messageTitle")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {message.map((m) => (
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

      {/* IDENTITY */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div data-reveal className="opacity-0 text-center mb-16">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-4"
              style={{ color: purple }}
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
                    <p className="text-text-muted text-xs mt-1">{c.meaning}</p>
                  </div>
                </div>
              );
            })}
          </div>

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

          <div
            data-reveal
            className="opacity-0 rounded-2xl p-6 text-center"
            style={{ backgroundColor: `${green}15`, border: `1px solid ${green}30` }}
          >
            <p className="text-text-primary text-sm">
              <span className="font-semibold">{t("styleLabel")}</span>{" "}
              {t("styleBody")}
            </p>
          </div>
        </div>
      </section>

      {/* VERBAL */}
      <section className="py-24 px-6 bg-surface/50">
        <div className="max-w-6xl mx-auto">
          <div data-reveal className="opacity-0 text-center mb-16">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-4"
              style={{ color: purple }}
            >
              {t("verbalEyebrow")}
            </p>
            <h2 className="font-clash font-extrabold text-3xl md:text-5xl text-text-primary">
              {t("verbalTitle")}
            </h2>
          </div>

          <div
            data-reveal
            className="opacity-0 grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            {slogans.map((s) => (
              <div
                key={s}
                className="bg-surface border border-border rounded-2xl p-8 text-center hover:border-[#7C3AED40] transition-colors duration-300"
              >
                <Quote
                  size={24}
                  className="mx-auto mb-4"
                  style={{ color: purple }}
                />
                <p className="text-text-primary font-clash font-bold text-lg italic">
                  &ldquo;{s}&rdquo;
                </p>
              </div>
            ))}
          </div>

          <div
            data-reveal
            className="opacity-0 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="bg-surface border border-border rounded-2xl p-8">
              <h3
                className="font-clash font-bold text-lg mb-4"
                style={{ color: green }}
              >
                {t("usedTitle")}
              </h3>
              <div className="flex flex-wrap gap-2">
                {usedWords.map((w) => (
                  <span
                    key={w}
                    className="text-xs px-3 py-1.5 rounded-full border text-text-primary"
                    style={{ borderColor: `${green}40` }}
                  >
                    {w}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-surface border border-border rounded-2xl p-8">
              <h3 className="font-clash font-bold text-lg mb-4 text-text-muted">
                {t("avoidedTitle")}
              </h3>
              <div className="flex flex-wrap gap-2">
                {avoidedWords.map((w) => (
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

      {/* CLOSING */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div data-reveal className="opacity-0 text-center mb-12">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-4"
              style={{ color: purple }}
            >
              {t("closingEyebrow")}
            </p>
            <h2 className="font-clash font-extrabold text-3xl md:text-5xl text-text-primary mb-6">
              {t("closingTitle")}
            </h2>
            <blockquote className="max-w-2xl mx-auto mb-12">
              <p className="text-text-secondary text-lg italic leading-relaxed">
                &ldquo;{t("closingQuote")}&rdquo;
              </p>
            </blockquote>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {closing.map((item, i) => {
              const Icon = CLOSING_ICONS[i] ?? Shield;
              return (
                <div
                  key={item.title}
                  data-reveal
                  className="opacity-0 bg-surface border border-border rounded-2xl p-8 text-center hover:border-[#7C3AED40] transition-colors duration-300"
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-5"
                    style={{ backgroundColor: `${purple}15` }}
                  >
                    <Icon size={26} style={{ color: purple }} />
                  </div>
                  <h3 className="font-clash font-bold text-xl text-text-primary mb-2">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary text-sm">
                    {item.description}
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
            background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${purple}10 0%, transparent 70%)`,
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
            {tShared("startProject")}
          </Link>
        </div>
      </section>
    </div>
  );
}
