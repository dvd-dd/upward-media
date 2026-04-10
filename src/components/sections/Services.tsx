"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
import { SERVICES, SERVICE_DETAILS } from "@/lib/constants";
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
    (index: number, cardEl: HTMLElement) => {
      const service = SERVICES[index];
      const details = SERVICE_DETAILS[service.title];
      const Icon = iconMap[service.icon];
      const color: "primary" | "accent" = index % 2 === 0 ? "primary" : "accent";

      setAnchorRect(cardEl.getBoundingClientRect());
      setModalService({
        icon: Icon,
        title: service.title,
        description: service.description,
        fullDescription: details.fullDescription,
        features: details.features,
        color,
      });
      setModalOpen(true);
    },
    []
  );

  return (
    <section id="services" className="relative py-32 bg-background">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 text-center mb-16">
        <TextReveal>
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-4">
            What We Do
          </p>
        </TextReveal>
        <TextReveal delay={0.1}>
          <h2 className="font-clash font-extrabold text-3xl md:text-5xl text-white mb-4">
            Solutions built for growth
          </h2>
        </TextReveal>
        <TextReveal delay={0.2}>
          <p className="text-text-secondary max-w-2xl mx-auto text-base md:text-lg">
            From brand identity to paid ads, we cover every touchpoint of your
            digital presence.
          </p>
        </TextReveal>
      </div>

      {/* Cards grid */}
      <div
        ref={cardsRef}
        className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {SERVICES.map((service, i) => {
          const Icon = iconMap[service.icon];
          const color = i % 2 === 0 ? "primary" : "accent";
          const iconColor =
            color === "primary" ? "text-primary" : "text-accent";

          return (
            <GlowCard
              key={service.title}
              color={color}
              className="opacity-0 flex flex-col p-8"
              data-service-card
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

              <h3 className="font-clash font-bold text-xl text-white mb-3">
                {service.title}
              </h3>

              <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-1">
                {service.description}
              </p>

              <button
                onClick={(e) => {
                  const card = (e.currentTarget as HTMLElement).closest(
                    "[data-service-card]"
                  ) as HTMLElement;
                  openModal(i, card);
                }}
                className={`inline-flex items-center gap-1.5 text-sm font-medium ${iconColor} group cursor-pointer bg-transparent border-none p-0 text-left`}
              >
                Learn more
                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
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
