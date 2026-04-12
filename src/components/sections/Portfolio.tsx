"use client";

import { useEffect, useRef, useState, MouseEvent } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ExternalLink } from "lucide-react";
import type { ReactNode } from "react";
import {
  PORTFOLIO_PROJECTS,
  type PortfolioCategory,
  type PortfolioProject,
} from "@/lib/constants";
import { Link } from "@/i18n/navigation";
import TextReveal from "@/components/ui/TextReveal";

gsap.registerPlugin(ScrollTrigger);

function PortfolioCard({ project }: { project: PortfolioProject }) {
  const t = useTranslations("portfolio");
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");
  const isWebsite = project.category === "Website";
  const title = t(`projects.${project.slug}.title`);
  const description = t(`projects.${project.slug}.description`);
  const tags = t.raw(`projects.${project.slug}.tags`) as string[];

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform(
      `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`
    );
  };

  const handleMouseLeave = () => {
    setTransform("");
  };

  const cardInner = (
    <div
      ref={cardRef}
      data-portfolio-card
      className="group relative rounded-2xl overflow-hidden bg-surface border border-border transition-all duration-300 hover:border-primary/40 opacity-0 flex flex-col h-full"
      style={{
        transform: transform || undefined,
        transition: transform
          ? "border-color 0.3s"
          : "transform 0.5s ease, border-color 0.3s",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image */}
      <div
        className={`relative overflow-hidden ${
          isWebsite ? "aspect-video" : "aspect-[4/3]"
        }`}
      >
        <Image
          src={project.image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-background/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3">
          <h3 className="font-clash font-bold text-xl md:text-2xl text-text-primary">
            {title}
          </h3>
          <span className="text-primary text-sm font-medium inline-flex items-center gap-1.5">
            {isWebsite ? t("visitLive") : t("viewProject")}
            {isWebsite ? (
              <ExternalLink
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            ) : (
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            )}
          </span>
        </div>
      </div>

      {/* Info below image */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-clash font-bold text-text-primary text-lg mb-1">
          {title}
        </h3>
        <p className="text-text-muted text-sm mb-3 flex-1">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-full border border-border text-text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  const wrapper: ReactNode =
    isWebsite && project.liveUrl ? (
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        {cardInner}
      </a>
    ) : (
      <Link href={`/portfolio/${project.slug}`} className="block h-full">
        {cardInner}
      </Link>
    );

  return <>{wrapper}</>;
}

const TABS: { key: PortfolioCategory; tKey: "branding" | "website" }[] = [
  { key: "Branding", tKey: "branding" },
  { key: "Website", tKey: "website" },
];

export default function Portfolio() {
  const t = useTranslations("portfolio");
  const gridRef = useRef<HTMLDivElement>(null);
  const hasRevealedRef = useRef(false);
  const [activeTab, setActiveTab] = useState<PortfolioCategory>("Branding");

  const filtered = PORTFOLIO_PROJECTS.filter((p) => p.category === activeTab);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    const cards = el.querySelectorAll("[data-portfolio-card]");
    if (!cards.length) return;

    const common = {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: "power3.out",
    };

    if (hasRevealedRef.current) {
      const anim = gsap.fromTo(cards, { opacity: 0, y: 40 }, common);
      return () => {
        anim.kill();
      };
    }

    const anim = gsap.fromTo(cards, { opacity: 0, y: 60 }, {
      ...common,
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: () => {
          hasRevealedRef.current = true;
        },
      },
    });

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [activeTab]);

  const counts = TABS.reduce<Record<PortfolioCategory, number>>(
    (acc, tab) => {
      acc[tab.key] = PORTFOLIO_PROJECTS.filter(
        (p) => p.category === tab.key
      ).length;
      return acc;
    },
    { Branding: 0, Website: 0 }
  );

  return (
    <section id="portfolio" className="relative py-20 sm:py-32 bg-background">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center mb-12">
        <TextReveal>
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-4">
            {t("eyebrow")}
          </p>
        </TextReveal>
        <TextReveal delay={0.1}>
          <h2 className="font-clash font-extrabold text-3xl xs:text-4xl md:text-5xl text-text-primary mb-4">
            {t("title")}
          </h2>
        </TextReveal>
        <TextReveal delay={0.2}>
          <p className="text-text-secondary max-w-2xl mx-auto text-base md:text-lg">
            {t("subtitle")}
          </p>
        </TextReveal>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-6 flex justify-center gap-2 mb-12">
        {TABS.map((tab) => {
          const active = tab.key === activeTab;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 ${
                active
                  ? "bg-primary text-background shadow-[0_0_20px_rgba(0,212,170,0.35)]"
                  : "bg-surface border border-border text-text-secondary hover:border-primary/40 hover:text-text-primary"
              }`}
            >
              {t(`tabs.${tab.tKey}`)}
              <span
                className={`ml-2 text-xs ${
                  active ? "opacity-70" : "opacity-50"
                }`}
              >
                {counts[tab.key]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div
          key={activeTab}
          ref={gridRef}
          className="max-w-[1600px] mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          {filtered.map((project) => (
            <PortfolioCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <div className="max-w-2xl mx-auto px-6 text-center py-16">
          <p className="text-text-secondary text-base md:text-lg">
            {t("comingSoonTitle")}
          </p>
          <p className="text-text-muted text-sm mt-2">
            {t("comingSoonSubtitle")}
          </p>
        </div>
      )}
    </section>
  );
}
