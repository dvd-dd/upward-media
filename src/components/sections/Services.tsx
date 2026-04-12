"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Globe,
  Palette,
  TrendingUp,
  Video,
  Headphones,
  ArrowRight,
} from "lucide-react";
import { SERVICE_KEYS, SERVICE_ICONS, type ServiceKey } from "@/lib/constants";
import GlowCard from "@/components/ui/GlowCard";
import TextReveal from "@/components/ui/TextReveal";
import BubbleModal from "@/components/ui/BubbleModal";

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  Globe,
  Palette,
  TrendingUp,
  Video,
  Headphones,
} as const;

interface ModalService {
  icon: (typeof iconMap)[keyof typeof iconMap];
  title: string;
  description: string;
  fullDescription: string;
  features: string[];
  color: "primary" | "accent";
}

export default function Services() {
  const t = useTranslations("services");
  const cardsRef = useRef<HTMLDivElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalService, setModalService] = useState<ModalService | null>(null);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    const el = cardsRef.current;
    if (!el) return;

    const cards = el.querySelectorAll("[data-service-card]");

    const anim = gsap.fromTo(
      cards,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          once: true,
        },
      }
    );

    return () => {
      anim.scrollTrigger?.kill();
    };
  }, []);

  const openModal = useCallback(
    (key: ServiceKey, index: number, cardEl: HTMLElement) => {
      const Icon = iconMap[SERVICE_ICONS[key]];
      const color: "primary" | "accent" = index % 2 === 0 ? "primary" : "accent";
      const features = t.raw(`items.${key}.features`) as string[];

      setAnchorRect(cardEl.getBoundingClientRect());
      setModalService({
        icon: Icon,
        title: t(`items.${key}.title`),
        description: t(`items.${key}.description`),
        fullDescription: t(`items.${key}.fullDescription`),
        features,
        color,
      });
      setModalOpen(true);
    },
    [t]
  );

  return (
    <section id="services" className="relative py-20 sm:py-32 bg-background">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center mb-12 sm:mb-16">
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

      {/* Cards grid */}
      <div
        ref={cardsRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {SERVICE_KEYS.map((key, i) => {
          const Icon = iconMap[SERVICE_ICONS[key]];
          const color = i % 2 === 0 ? "primary" : "accent";
          const iconColor =
            color === "primary" ? "text-primary" : "text-accent";

          return (
            <GlowCard
              key={key}
              color={color}
              className="opacity-0 flex flex-col p-8 cursor-pointer text-left group"
              data-service-card
              role="button"
              tabIndex={0}
              onClick={(e) => {
                openModal(key, i, e.currentTarget as HTMLElement);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openModal(key, i, e.currentTarget as HTMLElement);
                }
              }}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                  color === "primary"
                    ? "bg-primary/10"
                    : "bg-accent/10"
                }`}
              >
                <Icon size={24} className={iconColor} />
              </div>

              <h3 className="font-clash font-bold text-xl text-text-primary mb-3">
                {t(`items.${key}.title`)}
              </h3>

              <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-1">
                {t(`items.${key}.description`)}
              </p>

              <span
                className={`inline-flex items-center gap-1.5 text-sm font-medium ${iconColor}`}
              >
                {t("learnMore")}
                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </span>
            </GlowCard>
          );
        })}
      </div>

      {/* Bubble Modal */}
      <BubbleModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        service={modalService}
        anchorRect={anchorRect}
      />
    </section>
  );
}
