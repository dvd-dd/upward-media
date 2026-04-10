"use client";

import { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Phone, ExternalLink } from "lucide-react";

const quickLinks = [
  { label: "What We Do", href: "/#services" },
  { label: "Our Process", href: "/#process" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Contact", href: "/#contact" },
];

const socials = [
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
];

export default function Footer() {
  const pathname = usePathname();
  const router = useRouter();

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const hash = href.slice(1); // "/#services" → "#services"

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
    <footer className="bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Column 1 — Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-1 text-2xl font-clash mb-4">
              <span className="font-extrabold text-primary">UPWARD</span>
              <span className="font-normal text-white">MEDIA</span>
            </Link>
            <p className="text-primary font-clash font-bold text-sm tracking-wider mb-4">
              Strategy. Design. Growth.
            </p>
            <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
              We turn bold ideas into high-performance digital experiences that
              drive real business results.
            </p>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-text-secondary hover:text-white transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Get in Touch */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">
              Get in Touch
            </h4>
            <ul className="space-y-4">
              {/* Email — hidden for now */}
              <li>
                <a
                  href="tel:+5535989896851"
                  className="text-text-secondary hover:text-white transition-colors duration-300 text-sm inline-flex items-center gap-2"
                >
                  <Phone size={16} className="text-primary shrink-0" />
                  +55 35 9899-6851
                </a>
              </li>
              <li className="flex items-center gap-3 pt-2">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-text-secondary hover:text-primary transition-colors duration-300 text-sm"
                  >
                    {social.label}
                    <ExternalLink size={12} />
                  </a>
                ))}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-border">
          <p className="text-text-muted text-xs text-center md:text-left">
            &copy; 2025 Upward Media. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
