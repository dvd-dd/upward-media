"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";

gsap.registerPlugin(ScrollTrigger);

const NAV_KEYS = ["services", "process", "portfolio", "contact"] as const;
const NAV_HREFS: Record<(typeof NAV_KEYS)[number], string> = {
  services: "/#services",
  process: "/#process",
  portfolio: "/#portfolio",
  contact: "/#contact",
};

export default function Header() {
  const t = useTranslations("nav");
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const scrolled = useRef(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const st = ScrollTrigger.create({
      start: "top -80",
      onUpdate: (self) => {
        const shouldBeScrolled = self.progress > 0 || window.scrollY > 80;
        if (shouldBeScrolled === scrolled.current) return;
        scrolled.current = shouldBeScrolled;
        header.classList.toggle("header-scrolled", shouldBeScrolled);
        header.classList.toggle("border-border", shouldBeScrolled);
        header.classList.toggle("border-transparent", !shouldBeScrolled);
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const hash = href.slice(1);

      if (pathname === "/") {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
        window.history.replaceState(null, "", href);
      } else {
        router.push(href);
      }
    },
    [pathname, router]
  );

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 border-b border-transparent transition-colors duration-300"
        style={{
          paddingTop: "env(safe-area-inset-top)",
          paddingLeft: "env(safe-area-inset-left)",
          paddingRight: "env(safe-area-inset-right)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <Link
            href="/"
            className="flex flex-col sm:flex-row sm:items-center gap-0 sm:gap-1 text-xl sm:text-2xl font-clash leading-none"
          >
            <span className="font-extrabold text-primary">UPWARD</span>
            <span className="font-normal text-text-primary">MEDIA</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV_KEYS.map((key) => (
              <a
                key={key}
                href={NAV_HREFS[key]}
                onClick={(e) => handleNavClick(e, NAV_HREFS[key])}
                className="text-text-secondary hover:text-text-primary transition-colors duration-300 font-general-sans text-sm tracking-wide"
              >
                {t(key)}
              </a>
            ))}
            <ThemeToggle />
            <LanguageToggle />
            <a
              href="/#contact"
              onClick={(e) => handleNavClick(e, "/#contact")}
              className="relative gradient-primary text-background px-7 py-2.5 rounded-full text-sm font-semibold transition-shadow duration-300 hover:shadow-[0_0_24px_rgba(0,212,170,0.45),0_0_60px_rgba(0,212,170,0.15)]"
            >
              {t("cta")}
            </a>
          </nav>

          <button
            className="lg:hidden relative z-[60] inline-flex items-center justify-center w-11 h-11 rounded-full border border-border-strong bg-surface text-text-primary shadow-sm hover:border-primary transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? t("closeMenu") : t("openMenu")}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[55] bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-6 sm:gap-8 transition-all duration-500 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{
          paddingTop: "calc(env(safe-area-inset-top) + 4rem)",
          paddingBottom: "env(safe-area-inset-bottom)",
          paddingLeft: "env(safe-area-inset-left)",
          paddingRight: "env(safe-area-inset-right)",
        }}
      >
        <button
          onClick={() => setIsOpen(false)}
          aria-label={t("closeMenu")}
          className="absolute right-4 inline-flex items-center justify-center w-11 h-11 rounded-full border border-border-strong bg-surface text-text-primary shadow-sm hover:border-primary transition-colors"
          style={{
            top: "calc(env(safe-area-inset-top) + 1rem)",
          }}
        >
          <X size={22} />
        </button>
        {NAV_KEYS.map((key, i) => (
          <a
            key={key}
            href={NAV_HREFS[key]}
            onClick={(e) => {
              setIsOpen(false);
              handleNavClick(e, NAV_HREFS[key]);
            }}
            className="text-2xl xs:text-3xl font-clash font-bold text-text-primary hover:text-primary transition-colors duration-300"
            style={{
              transitionDelay: isOpen ? `${i * 75}ms` : "0ms",
              transform: isOpen ? "translateY(0)" : "translateY(20px)",
              opacity: isOpen ? 1 : 0,
              transition:
                "color 0.3s, opacity 0.4s ease, transform 0.4s ease",
            }}
          >
            {t(key)}
          </a>
        ))}
        <a
          href="/#contact"
          onClick={(e) => {
            setIsOpen(false);
            handleNavClick(e, "/#contact");
          }}
          className="mt-4 gradient-primary text-background px-10 py-3.5 rounded-full text-lg font-semibold transition-shadow duration-300 hover:shadow-[0_0_24px_rgba(0,212,170,0.45)]"
          style={{
            transitionDelay: isOpen ? `${NAV_KEYS.length * 75}ms` : "0ms",
            opacity: isOpen ? 1 : 0,
            transition: "opacity 0.4s ease, box-shadow 0.3s",
          }}
        >
          {t("cta")}
        </a>
        <div
          className="mt-6 flex items-center gap-4"
          style={{
            transitionDelay: isOpen ? `${(NAV_KEYS.length + 1) * 75}ms` : "0ms",
            opacity: isOpen ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        >
          <ThemeToggle />
          <LanguageToggle />
        </div>
      </div>
    </>
  );
}
