"use client";

import { useEffect, useRef, useState, MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { PORTFOLIO_PROJECTS } from "@/lib/constants";
import TextReveal from "@/components/ui/TextReveal";

gsap.registerPlugin(ScrollTrigger);

function PortfolioCard({
  project,
}: {
  project: (typeof PORTFOLIO_PROJECTS)[number];
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");

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

  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="block"
    >
      <div
        ref={cardRef}
        data-portfolio-card
        className="group relative rounded-2xl overflow-hidden bg-surface border border-border transition-all duration-300 hover:border-primary/40 opacity-0"
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
        <div className="relative overflow-hidden aspect-[4/3]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-background/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3">
            <h3 className="font-clash font-bold text-xl md:text-2xl text-white">
              {project.title}
            </h3>
            <span className="text-primary text-sm font-medium inline-flex items-center gap-1.5">
              View Project
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </span>
          </div>
        </div>

        {/* Info below image */}
        <div className="p-5">
          <h3 className="font-clash font-bold text-white text-lg mb-1">
            {project.title}
          </h3>
          <p className="text-text-muted text-sm mb-3">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
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
    </Link>
  );
}

export default function Portfolio() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    const cards = el.querySelectorAll("[data-portfolio-card]");

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

  return (
    <section id="portfolio" className="relative py-32 bg-background">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 text-center mb-16">
        <TextReveal>
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-4">
            Our Work
          </p>
        </TextReveal>
        <TextReveal delay={0.1}>
          <h2 className="font-clash font-extrabold text-3xl md:text-5xl text-white mb-4">
            Projects that speak for themselves
          </h2>
        </TextReveal>
        <TextReveal delay={0.2}>
          <p className="text-text-secondary max-w-2xl mx-auto text-base md:text-lg">
            A selection of brands and experiences we&apos;ve crafted.
          </p>
        </TextReveal>
      </div>

      {/* Grid */}
      <div
        ref={gridRef}
        className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {PORTFOLIO_PROJECTS.map((project) => (
          <PortfolioCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
