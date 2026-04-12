"use client";

import { useCallback } from "react";
import { useTranslations } from "next-intl";
import { Mail, Phone, ExternalLink } from "lucide-react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";

const NAV_KEYS = ["services", "process", "portfolio", "contact"] as const;
const NAV_HREFS: Record<(typeof NAV_KEYS)[number], string> = {
  services: "/#services",
  process: "/#process",
  portfolio: "/#portfolio",
  contact: "/#contact",
};

const SOCIALS = [{ label: "Instagram", href: "#" }];

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tSite = useTranslations("site");
  const pathname = usePathname();
  const router = useRouter();

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
    <footer className="bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-8">
          {/* Column 1 — Brand */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-2xl font-clash mb-4"
            >
              <span className="font-extrabold text-primary">UPWARD</span>
              <span className="font-normal text-text-primary">MEDIA</span>
            </Link>
            <p className="text-primary font-clash font-bold text-sm tracking-wider mb-4">
              {tSite("tagline")}
            </p>
            <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
              {t("tagline")}
            </p>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h4 className="text-text-primary font-semibold text-sm uppercase tracking-wider mb-6">
              {t("quickLinks")}
            </h4>
            <ul className="space-y-3">
              {NAV_KEYS.map((key) => (
                <li key={key}>
                  <a
                    href={NAV_HREFS[key]}
                    onClick={(e) => handleNavClick(e, NAV_HREFS[key])}
                    className="text-text-secondary hover:text-text-primary transition-colors duration-300 text-sm"
                  >
                    {tNav(key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Get in Touch */}
          <div>
            <h4 className="text-text-primary font-semibold text-sm uppercase tracking-wider mb-6">
              {t("getInTouch")}
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:hello@upwardbr.com"
                  className="text-text-secondary hover:text-text-primary transition-colors duration-300 text-sm inline-flex items-center gap-2"
                >
                  <Mail size={16} className="text-primary shrink-0" />
                  hello@upwardbr.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+5535998996851"
                  className="text-text-secondary hover:text-text-primary transition-colors duration-300 text-sm inline-flex items-center gap-2"
                >
                  <Phone size={16} className="text-primary shrink-0" />
                  +55 35 99899-6851
                </a>
              </li>
              <li className="flex items-center gap-3 pt-2">
                {SOCIALS.map((social) => (
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
            {t("copyright", { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
}
