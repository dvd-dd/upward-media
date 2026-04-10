"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowLeft,
  TrendingUp,
  Landmark,
  Layers,
  ShieldCheck,
  Search,
  Briefcase,
  Settings,
  Building2,
  Banknote,
  HandCoins,
  Wheat,
  Factory,
  Warehouse,
  Quote,
  ChevronRight,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ─── Brand colors ─── */
const navy = "#1B2A4A";
const blue = "#2563EB";

/* ─── Data ─── */
const pillars = [
  {
    icon: TrendingUp,
    title: "Grow",
    description: "Expand operations and conquer new markets.",
  },
  {
    icon: Landmark,
    title: "Invest",
    description: "Modernize equipment and infrastructure.",
  },
  {
    icon: Layers,
    title: "Structure",
    description: "Enable strategic medium and long-term projects.",
  },
  {
    icon: ShieldCheck,
    title: "Strengthen",
    description: "Improve cash flow and ensure financial health.",
  },
];

const process = [
  {
    icon: Search,
    step: "01",
    title: "Financial Analysis",
    description:
      "Deep evaluation of cash flow, cost structure, and borrowing capacity.",
  },
  {
    icon: Briefcase,
    step: "02",
    title: "Business Understanding",
    description:
      "Immersion into the operational model, market, and sector-specific challenges.",
  },
  {
    icon: Settings,
    step: "03",
    title: "Custom Structuring",
    description:
      "Designing financial solutions that perfectly fit the identified needs.",
  },
  {
    icon: Building2,
    step: "04",
    title: "Best Institution",
    description:
      "Connecting with banks, funds, and financial institutions ideal for each scenario.",
  },
];

const creditSolutions = [
  {
    icon: Banknote,
    title: "Working Capital",
    description:
      "Resources to maintain and boost daily operations with appropriate terms and rates.",
  },
  {
    icon: Warehouse,
    title: "Real Estate Credit",
    description:
      "Reduced rates using real estate assets as collateral.",
  },
  {
    icon: HandCoins,
    title: "Receivables Advance",
    description:
      "Immediate liquidity through anticipation of installment sales and invoices.",
  },
  {
    icon: Wheat,
    title: "Rural & Agro Credit",
    description:
      "Specialized lines for agribusiness with differentiated conditions.",
  },
  {
    icon: Landmark,
    title: "BNDES Lines",
    description:
      "Access to government development programs with subsidized interest rates.",
  },
  {
    icon: Factory,
    title: "Equipment Financing",
    description:
      "Specific resources for equipment acquisition and industrial modernization.",
  },
];

const colors = [
  { name: "Navy", hex: "#1B2A4A", text: "white", meaning: "Trust & Authority" },
  { name: "Blue", hex: "#2563EB", text: "white", meaning: "Technology & Growth" },
  { name: "White", hex: "#FFFFFF", text: "#1B2A4A", meaning: "Clarity & Transparency" },
  { name: "Dark", hex: "#0F172A", text: "white", meaning: "Solidity & Security" },
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
export default function NextMoneyPage() {
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
            background: `radial-gradient(ellipse 70% 55% at 50% 30%, ${navy}30 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 70% 60%, ${blue}10 0%, transparent 70%)`,
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.04,
            backgroundImage: `linear-gradient(${blue}99 1px, transparent 1px), linear-gradient(90deg, ${blue}99 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div data-reveal className="relative z-10 opacity-0 max-w-2xl">
          <div
            className="w-28 h-28 md:w-36 md:h-36 mx-auto mb-8 rounded-3xl overflow-hidden border-2 border-white/10"
            style={{ boxShadow: `0 0 40px ${blue}30` }}
          >
            <Image
              src="/images/portfolio/nextmoney-logo.jpeg"
              alt="NextMoney Logo"
              width={144}
              height={144}
              className="w-full h-full object-cover"
              priority
            />
          </div>

          <h1 className="font-clash font-extrabold text-5xl md:text-7xl mb-4">
            <span
              style={{
                background: `linear-gradient(135deg, ${navy}, ${blue})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              NextMoney
            </span>
          </h1>

          <p className="text-text-secondary text-lg md:text-xl mb-6">
            Tax intelligence and business credit in one ecosystem.
          </p>

          <div className="flex flex-wrap justify-center gap-2">
            {["Branding", "Fintech", "Logo Design"].map((tag) => (
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
            NextNumber | NextMoney is a fintech ecosystem connecting companies
            to growth through strategy and security. Born from NextNumber&apos;s
            reputation in tax intelligence, it evolved to also serve as a
            business credit hub — connecting businesses to the right capital, at
            the best market conditions.
          </p>
        </div>
      </section>

      {/* ───────── 3. THE ORIGIN ───────── */}
      <section className="py-24 px-6 bg-surface/50">
        <div className="max-w-6xl mx-auto">
          <div data-reveal className="opacity-0 text-center mb-16">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-4"
              style={{ color: blue }}
            >
              The Origin
            </p>
            <h2 className="font-clash font-extrabold text-3xl md:text-5xl text-white mb-4">
              From tax intelligence to business credit
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              data-reveal
              className="opacity-0 bg-surface border border-border rounded-2xl p-8 hover:border-[#2563EB40] transition-colors duration-300"
            >
              <h3
                className="font-clash font-bold text-xl mb-4"
                style={{ color: blue }}
              >
                NextNumber
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                NextNumber has always been recognized for tax intelligence.
                Over the years, it built a solid reputation in the Brazilian
                market through technical excellence and precision in analysis.
                But the market evolves constantly — and so did they.
              </p>
            </div>

            <div
              data-reveal
              className="opacity-0 bg-surface border border-border rounded-2xl p-8 hover:border-[#2563EB40] transition-colors duration-300"
            >
              <div className="flex items-center gap-2 mb-4">
                <ChevronRight size={20} style={{ color: blue }} />
                <h3
                  className="font-clash font-bold text-xl"
                  style={{ color: blue }}
                >
                  NextMoney
                </h3>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed">
                With a consolidated track record in tax auditing, the company
                expanded strategically — incorporating solutions that connect
                directly to clients&apos; financial needs. NextMoney now serves
                as a business credit hub, connecting companies to the right
                capital.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── 4. BUSINESS PILLARS ───────── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div data-reveal className="opacity-0 text-center mb-16">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-4"
              style={{ color: blue }}
            >
              Business Pillars
            </p>
            <h2 className="font-clash font-extrabold text-3xl md:text-5xl text-white mb-4">
              Four pillars of growth
            </h2>
            <p className="text-text-secondary text-lg max-w-xl mx-auto">
              Always consultative, strategic, and personalized.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pillars.map((p) => (
              <div
                key={p.title}
                data-reveal
                className="opacity-0 bg-surface border border-border rounded-2xl p-8 hover:border-[#2563EB40] transition-colors duration-300"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: `${blue}15` }}
                >
                  <p.icon size={26} style={{ color: blue }} />
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
        </div>
      </section>

      {/* ───────── 5. THE APPROACH ───────── */}
      <section className="py-24 px-6 bg-surface/50">
        <div className="max-w-6xl mx-auto">
          <div data-reveal className="opacity-0 text-center mb-16">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-4"
              style={{ color: blue }}
            >
              The Approach
            </p>
            <h2 className="font-clash font-extrabold text-3xl md:text-5xl text-white mb-4">
              What makes us different
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              No generic solutions. No standard credit. Each operation goes
              through a rigorous, personalized process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {process.map((s) => (
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

          <div data-reveal className="opacity-0 mt-12 text-center">
            <p className="text-text-secondary text-base italic">
              Here, credit adapts to the company — not the other way around.
            </p>
          </div>
        </div>
      </section>

      {/* ───────── 6. CREDIT SOLUTIONS ───────── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div data-reveal className="opacity-0 text-center mb-16">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-4"
              style={{ color: blue }}
            >
              Solutions
            </p>
            <h2 className="font-clash font-extrabold text-3xl md:text-5xl text-white mb-4">
              Credit solutions
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              A wide spectrum of financial solutions, connecting companies to
              the best options available in the Brazilian market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {creditSolutions.map((c) => (
              <div
                key={c.title}
                data-reveal
                className="opacity-0 bg-surface border border-border rounded-2xl p-6 hover:border-[#2563EB40] transition-colors duration-300"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${blue}15` }}
                >
                  <c.icon size={22} style={{ color: blue }} />
                </div>
                <h3 className="font-clash font-bold text-lg text-white mb-2">
                  {c.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {c.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 7. CASE STUDY ───────── */}
      <section className="py-24 px-6 bg-surface/50">
        <div className="max-w-6xl mx-auto">
          <div data-reveal className="opacity-0 text-center mb-16">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-4"
              style={{ color: blue }}
            >
              Case Study
            </p>
            <h2 className="font-clash font-extrabold text-3xl md:text-5xl text-white">
              Structured credit in action
            </h2>
          </div>

          <div
            data-reveal
            className="opacity-0 bg-surface border border-border rounded-2xl p-8 md:p-12 max-w-3xl mx-auto"
          >
            <div className="space-y-8">
              <div>
                <h3
                  className="font-clash font-bold text-lg mb-2"
                  style={{ color: blue }}
                >
                  The Situation
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  An industrial company needed to expand its productive capacity
                  to meet growing demand. The traditional bank offered only a
                  standard working capital line: short term, high interest, with
                  no consideration for the project&apos;s specifics.
                </p>
              </div>

              <div>
                <h3
                  className="font-clash font-bold text-lg mb-2"
                  style={{ color: blue }}
                >
                  The NextMoney Analysis
                </h3>
                <ul className="space-y-2">
                  {[
                    "Projected cash flow evaluation",
                    "Available guarantees (real estate, equipment)",
                    "Corporate structure and governance",
                    "Expansion project objective and viability",
                  ].map((item) => (
                    <li
                      key={item}
                      className="text-text-secondary text-sm flex items-center gap-2"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: blue }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3
                  className="font-clash font-bold text-lg mb-2"
                  style={{ color: blue }}
                >
                  The Result
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-4">
                  Connected the company to the best combination of specialized
                  banks and investment funds:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { value: "40%", label: "Interest rate reduction" },
                    { value: "5 years", label: "Extended term" },
                    { value: "100%", label: "Growth plan enabled" },
                  ].map((r) => (
                    <div
                      key={r.label}
                      className="text-center bg-background/50 rounded-xl p-4"
                    >
                      <p
                        className="font-clash font-extrabold text-2xl"
                        style={{ color: blue }}
                      >
                        {r.value}
                      </p>
                      <p className="text-text-muted text-xs mt-1">{r.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── 8. BRAND IDENTITY ───────── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div data-reveal className="opacity-0 text-center mb-16">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-4"
              style={{ color: blue }}
            >
              Visual Identity
            </p>
            <h2 className="font-clash font-extrabold text-3xl md:text-5xl text-white mb-4">
              The visual system
            </h2>
          </div>

          <div
            data-reveal
            className="opacity-0 grid grid-cols-2 md:grid-cols-4 gap-4"
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
        </div>
      </section>

      {/* ───────── 9. CLOSING QUOTE ───────── */}
      <section className="py-24 px-6 bg-surface/50">
        <div data-reveal className="opacity-0 max-w-3xl mx-auto text-center">
          <Quote size={32} className="mx-auto mb-6" style={{ color: blue }} />
          <p
            className="font-clash font-extrabold text-2xl md:text-3xl mb-8"
            style={{
              background: `linear-gradient(135deg, ${navy}, ${blue})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            &ldquo;The trust and technical excellence you already know in tax
            auditing now expand to a new horizon of possibilities.&rdquo;
          </p>
          <p className="text-text-secondary text-base leading-relaxed">
            With NextMoney, we deliver intelligent, structured, and strategic
            credit. With NextNumber, we maintain the same standard of
            excellence: strategy, method, precision, and absolute clarity.
          </p>
        </div>
      </section>

      {/* ───────── 10. CTA ───────── */}
      <section className="py-32 px-6 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${blue}10 0%, transparent 70%)`,
          }}
        />

        <div data-reveal className="opacity-0 relative z-10 max-w-2xl mx-auto">
          <h2 className="font-clash font-extrabold text-3xl md:text-5xl text-white mb-6">
            Ready to fuel your company&apos;s growth?
          </h2>
          <p className="text-text-secondary text-lg mb-8">
            Let&apos;s build a brand and financial strategy that positions your
            business for the next level.
          </p>
          <Link
            href="/#contact"
            className="inline-block px-10 py-4 rounded-full font-semibold text-white text-base transition-shadow duration-300"
            style={{
              background: `linear-gradient(135deg, ${navy}, ${blue})`,
              boxShadow: `0 0 0 rgba(0,0,0,0)`,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${blue}50, 0 0 80px ${blue}20`;
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
