"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
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

const brown = "#B8956A";

const ESSENCE_ICONS = [Target, Compass, Star, Leaf];
const COLOR_HEXES = ["#B8956A", "#2D1B0E", "#F5F0E8", "#FFFDF7"];
const LOGO_ICONS = [TreePine, Droplets, Feather, Layers];

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

export default function WoodFramePage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("cases.woodframe");
  const tShared = useTranslations("cases");

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  useReveal("[data-reveal]", pageRef);

  const tags = t.raw("tags") as string[];
  const essence = t.raw("essence") as TitleText[];
  const positioningTags = t.raw("positioningTags") as string[];
  const personalityTraits = t.raw("personalityTraits") as string[];
  const message = t.raw("message") as TitleText[];
  const colors = t.raw("colors") as ColorEntry[];
  const logoElements = t.raw("logoElements") as TitleDescription[];
  const usedWords = t.raw("usedWords") as string[];
  const avoidedWords = t.raw("avoidedWords") as string[];

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
            background: `radial-gradient(ellipse 70% 55% at 50% 30%, ${brown}15 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 70% 60%, ${brown}10 0%, transparent 70%)`,
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
            className="w-28 h-28 md:w-36 md:h-36 mx-auto mb-8 rounded-3xl overflow-hidden border-2 border-border"
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
            {t("tagline")}
          </p>

          <div className="flex flex-wrap justify-center gap-2">
            {tags.map((tag) => (
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

      {/* ABOUT */}
      <section className="py-24 px-6">
        <div data-reveal className="opacity-0 max-w-3xl mx-auto text-center">
          <p
            className="text-sm font-semibold uppercase tracking-widest mb-4"
            style={{ color: brown }}
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
              style={{ color: brown }}
            >
              {t("essenceEyebrow")}
            </p>
            <h2 className="font-clash font-extrabold text-3xl md:text-5xl text-text-primary">
              {t("essenceTitle")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {essence.map((e, i) => {
              const Icon = ESSENCE_ICONS[i] ?? Target;
              return (
                <div
                  key={e.title}
                  data-reveal
                  className="opacity-0 bg-surface border border-border rounded-2xl p-8 hover:border-[#B8956A40] transition-colors duration-300"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${brown}15` }}
                  >
                    <Icon size={22} style={{ color: brown }} />
                  </div>
                  <h3 className="font-clash font-bold text-xl text-text-primary mb-2">
                    {e.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {e.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* POSITIONING */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div data-reveal className="opacity-0 text-center mb-16">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-4"
              style={{ color: brown }}
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

          <div
            data-reveal
            className="opacity-0 flex flex-wrap justify-center gap-4"
          >
            {positioningTags.map((p) => (
              <span
                key={p}
                className="text-lg px-6 py-3 rounded-full border font-clash font-bold text-text-primary"
                style={{ borderColor: `${brown}60` }}
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* PERSONALITY */}
      <section className="py-24 px-6 bg-surface/50">
        <div className="max-w-6xl mx-auto">
          <div data-reveal className="opacity-0 text-center mb-16">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-4"
              style={{ color: brown }}
            >
              {t("personalityEyebrow")}
            </p>
            <h2 className="font-clash font-extrabold text-3xl md:text-5xl text-text-primary">
              {t("personalityTitle")}
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
                <span className="text-text-primary text-base">{trait}</span>
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
              style={{ color: brown }}
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
              className="opacity-0 bg-surface border border-border rounded-2xl p-8 hover:border-[#B8956A40] transition-colors duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <Paintbrush size={24} style={{ color: brown }} />
                <h3 className="font-clash font-bold text-xl text-text-primary">
                  {t("creatorTitle")}
                </h3>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed">
                {t("creatorBody")}
              </p>
            </div>

            <div
              data-reveal
              className="opacity-0 bg-surface border border-border rounded-2xl p-8 hover:border-[#B8956A40] transition-colors duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <BookOpen size={24} style={{ color: brown }} />
                <h3 className="font-clash font-bold text-xl text-text-primary">
                  {t("sageTitle")}
                </h3>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed">
                {t("sageBody")}
              </p>
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
              style={{ color: brown }}
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

      {/* IDENTITY */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div data-reveal className="opacity-0 text-center mb-16">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-4"
              style={{ color: brown }}
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
            className="opacity-0 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {logoElements.map((l, i) => {
              const Icon = LOGO_ICONS[i] ?? TreePine;
              return (
                <div
                  key={l.title}
                  className="bg-surface border border-border rounded-2xl p-6 text-center hover:border-[#B8956A40] transition-colors duration-300"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                    style={{ backgroundColor: `${brown}15` }}
                  >
                    <Icon size={22} style={{ color: brown }} />
                  </div>
                  <h4 className="font-clash font-bold text-sm text-text-primary mb-1">
                    {l.title}
                  </h4>
                  <p className="text-text-muted text-xs">{l.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* VERBAL */}
      <section className="py-24 px-6 bg-surface/50">
        <div className="max-w-6xl mx-auto">
          <div data-reveal className="opacity-0 text-center mb-16">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-4"
              style={{ color: brown }}
            >
              {t("verbalEyebrow")}
            </p>
            <h2 className="font-clash font-extrabold text-3xl md:text-5xl text-text-primary">
              {t("verbalTitle")}
            </h2>
          </div>

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
              &ldquo;{t("slogan")}&rdquo;
            </p>
          </div>

          <div
            data-reveal
            className="opacity-0 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="bg-surface border border-border rounded-2xl p-8">
              <h3
                className="font-clash font-bold text-lg mb-4"
                style={{ color: brown }}
              >
                {t("usedTitle")}
              </h3>
              <div className="flex flex-wrap gap-2">
                {usedWords.map((w) => (
                  <span
                    key={w}
                    className="text-xs px-3 py-1.5 rounded-full border text-text-primary"
                    style={{ borderColor: `${brown}40` }}
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
        <div data-reveal className="opacity-0 max-w-3xl mx-auto text-center">
          <p
            className="text-sm font-semibold uppercase tracking-widest mb-4"
            style={{ color: brown }}
          >
            {t("closingEyebrow")}
          </p>
          <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-8">
            {t("closingBody")}
          </p>
          <p className="text-text-secondary text-base leading-relaxed italic">
            {t("closingFootnote")}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${brown}10 0%, transparent 70%)`,
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
            {tShared("startProject")}
          </Link>
        </div>
      </section>
    </div>
  );
}
