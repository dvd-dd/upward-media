"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: "What We Do", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Contact", href: "/#contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const scrolled = useRef(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    // Initial state: transparent
    gsap.set(header, {
      backgroundColor: "rgba(6, 6, 10, 0)",
      backdropFilter: "blur(0px)",
      borderBottomColor: "rgba(26, 26, 46, 0)",
    });

    const st = ScrollTrigger.create({
      start: "top -80",
      onUpdate: (self) => {
        const shouldBeScrolled = self.progress > 0 || window.scrollY > 80;
        if (shouldBeScrolled === scrolled.current) return;
        scrolled.current = shouldBeScrolled;

        gsap.to(header, {
          backgroundColor: shouldBeScrolled
            ? "rgba(6, 6, 10, 0.8)"
            : "rgba(6, 6, 10, 0)",
          backdropFilter: shouldBeScrolled ? "blur(12px)" : "blur(0px)",
          borderBottomColor: shouldBeScrolled
            ? "rgba(26, 26, 46, 1)"
            : "rgba(26, 26, 46, 0)",
          duration: 0.3,
          ease: "power2.out",
        });
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const hash = href.slice(1); // "/#services" → "#services"

      if (pathname === "/") {
        // Already on homepage — scroll to section directly
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
        window.history.replaceState(null, "", href);
      } else {
        // On another page — client-side navigate to homepage with hash
        router.push(href);
      }
    },
    [pathname, router]
  );

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 border-b border-transparent"
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 text-2xl font-clash">
            <span className="font-extrabold text-primary">UPWARD</span>
            <span className="font-normal text-white">MEDIA</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-text-secondary hover:text-white transition-colors duration-300 font-general-sans text-sm tracking-wide"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/#contact"
              onClick={(e) => handleNavClick(e, "/#contact")}
              className="relative gradient-primary text-background px-7 py-2.5 rounded-full text-sm font-semibold transition-shadow duration-300 hover:shadow-[0_0_24px_rgba(0,212,170,0.45),0_0_60px_rgba(0,212,170,0.15)]"
            >
              Get in Touch
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden relative z-[60] text-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </header>

      {/* Mobile full-screen overlay */}
      <div
        className={`fixed inset-0 z-[55] bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 transition-all duration-500 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {navLinks.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => {
              setIsOpen(false);
              handleNavClick(e, link.href);
            }}
            className="text-3xl font-clash font-bold text-white hover:text-primary transition-colors duration-300"
            style={{
              transitionDelay: isOpen ? `${i * 75}ms` : "0ms",
              transform: isOpen ? "translateY(0)" : "translateY(20px)",
              opacity: isOpen ? 1 : 0,
              transition:
                "color 0.3s, opacity 0.4s ease, transform 0.4s ease",
            }}
          >
            {link.label}
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
            transitionDelay: isOpen ? `${navLinks.length * 75}ms` : "0ms",
            opacity: isOpen ? 1 : 0,
            transition: "opacity 0.4s ease, box-shadow 0.3s",
          }}
        >
          Get in Touch
        </a>
      </div>
    </>
  );
}
