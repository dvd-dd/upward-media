"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface BubbleModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    icon: LucideIcon;
    title: string;
    description: string;
    fullDescription: string;
    features: string[];
    color: "primary" | "accent";
  } | null;
  anchorRect: DOMRect | null;
}

interface Fragment {
  id: number;
  startX: number;
  startY: number;
  dx: number;
  dy: number;
  size: number;
  rotate: number;
  delay: number;
}

/* Sample N points along the perimeter of a rectangle and shoot them
   radially outward from its center. */
function generateFragments(rect: DOMRect, count: number): Fragment[] {
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const w = rect.width;
  const h = rect.height;
  const perim = 2 * (w + h);

  return Array.from({ length: count }, (_, i) => {
    /* Walk around the perimeter at a randomized offset */
    const t = ((i + Math.random() * 0.6) / count) * perim;
    let sx = 0;
    let sy = 0;
    if (t < w) {
      sx = rect.left + t;
      sy = rect.top;
    } else if (t < w + h) {
      sx = rect.left + w;
      sy = rect.top + (t - w);
    } else if (t < 2 * w + h) {
      sx = rect.left + w - (t - w - h);
      sy = rect.top + h;
    } else {
      sx = rect.left;
      sy = rect.top + h - (t - 2 * w - h);
    }

    /* Direction vector from bubble center through this perimeter point */
    const angle = Math.atan2(sy - cy, sx - cx);
    const distance = 160 + Math.random() * 220;
    const dx = Math.cos(angle) * distance;
    /* Slight gravity pull downward */
    const dy = Math.sin(angle) * distance + 40 + Math.random() * 40;

    return {
      id: i,
      startX: sx,
      startY: sy,
      dx,
      dy,
      size: 8 + Math.random() * 22,
      rotate: (Math.random() - 0.5) * 360,
      delay: Math.random() * 0.06,
    };
  });
}

export default function BubbleModal({
  isOpen,
  onClose,
  service,
  anchorRect,
}: BubbleModalProps) {
  const [popping, setPopping] = useState(false);
  const [popRect, setPopRect] = useState<DOMRect | null>(null);
  const [fragments, setFragments] = useState<Fragment[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  /* ── Pop then close ── */
  const triggerPop = useCallback(() => {
    if (popping) return;
    const rect = contentRef.current?.getBoundingClientRect() ?? null;
    if (rect) {
      setPopRect(rect);
      setFragments(generateFragments(rect, 24));
    }
    setPopping(true);
    setTimeout(() => {
      setPopping(false);
      setPopRect(null);
      setFragments([]);
      onClose();
    }, 600);
  }, [onClose, popping]);

  /* ── Keyboard: Escape ── */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") triggerPop();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, triggerPop]);

  /* ── Lock body scroll ── */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isOpen]);

  /* ── Origin point for opening scale ── */
  const origin = useMemo(() => {
    if (!anchorRect) return { x: "50%", y: "50%" };
    const cx = anchorRect.left + anchorRect.width / 2;
    const cy = anchorRect.top + anchorRect.height / 2;
    const vx = (cx / window.innerWidth) * 100;
    const vy = (cy / window.innerHeight) * 100;
    return { x: `${vx}%`, y: `${vy}%` };
  }, [anchorRect]);

  if (!service) return null;

  const Icon = service.icon;
  const isPrimary = service.color === "primary";
  const themeColor = isPrimary ? "0,212,170" : "139,92,246";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* ── Overlay ── */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={triggerPop}
            initial={{ opacity: 0 }}
            animate={{ opacity: popping ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: popping ? 0.45 : 0.25 }}
          />

          {/* ── Bubble ── */}
          <motion.div
            ref={contentRef}
            className="relative z-10 w-[calc(100vw-1.5rem)] xs:w-[90vw] max-w-lg max-h-[85vh] overflow-y-auto rounded-3xl"
            style={{
              transformOrigin: `${origin.x} ${origin.y}`,
              background: "color-mix(in srgb, var(--surface-elevated) 88%, transparent)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid var(--border)",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={
              popping
                ? {
                    scale: [1, 1.08, 1.28],
                    opacity: [1, 1, 0],
                    filter: [
                      "blur(0px) brightness(1)",
                      "blur(1px) brightness(1.15)",
                      "blur(8px) brightness(1.3)",
                    ],
                  }
                : { scale: 1, opacity: 1 }
            }
            exit={{ scale: 1.15, opacity: 0 }}
            transition={
              popping
                ? {
                    duration: 0.55,
                    times: [0, 0.27, 1],
                    ease: [0.22, 1, 0.36, 1],
                  }
                : {
                    type: "spring",
                    stiffness: 350,
                    damping: 22,
                    mass: 0.8,
                  }
            }
          >
            {/* Iridescent sheen overlay */}
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none opacity-[0.07]"
              style={{
                background:
                  "linear-gradient(135deg, #ff6b6b 0%, #feca57 15%, #48dbfb 30%, #ff9ff3 45%, #54a0ff 60%, #5f27cd 75%, #01a3a4 90%, #ff6b6b 100%)",
                backgroundSize: "300% 300%",
                animation: "iridescentShift 4s ease infinite",
              }}
            />

            {/* Bubble highlight (top-left glare) */}
            <div
              className="absolute top-0 left-0 w-1/2 h-1/3 rounded-tl-3xl pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.06) 0%, transparent 70%)",
              }}
            />

            {/* Content */}
            <div className="relative p-6 xs:p-8 md:p-10">
              {/* Close button */}
              <button
                onClick={triggerPop}
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-text-primary/10 transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                  isPrimary ? "bg-primary/10" : "bg-accent/10"
                }`}
              >
                <Icon
                  size={28}
                  className={isPrimary ? "text-primary" : "text-accent"}
                />
              </div>

              {/* Title */}
              <h3 className="font-clash font-bold text-xl xs:text-2xl md:text-3xl text-text-primary mb-4">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-8">
                {service.fullDescription}
              </p>

              {/* Features */}
              <div className="mb-8">
                <p className="text-xs uppercase tracking-widest text-text-muted mb-4 font-semibold">
                  What&apos;s included
                </p>
                <ul className="space-y-3">
                  {service.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-3">
                      <div
                        className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                          isPrimary ? "bg-primary/15" : "bg-accent/15"
                        }`}
                      >
                        <Check
                          size={12}
                          className={
                            isPrimary ? "text-primary" : "text-accent"
                          }
                        />
                      </div>
                      <span className="text-text-secondary text-sm">
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <a
                href="/#contact"
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                  setTimeout(() => {
                    const el = document.querySelector("#contact");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                    window.history.replaceState(null, "", "/#contact");
                  }, 100);
                }}
                className={`inline-flex items-center justify-center w-full px-8 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  isPrimary
                    ? "gradient-primary text-background hover:shadow-[0_0_24px_rgba(0,212,170,0.4)]"
                    : "bg-accent text-white hover:shadow-[0_0_24px_rgba(139,92,246,0.4)]"
                }`}
              >
                Get Started
              </a>
            </div>
          </motion.div>

          {/* ── Pop flash (white burst over the bubble at the moment of pop) ── */}
          <AnimatePresence>
            {popping && popRect && (
              <motion.div
                className="fixed pointer-events-none rounded-full"
                style={{
                  left: popRect.left + popRect.width / 2 - popRect.width / 2,
                  top: popRect.top + popRect.height / 2 - popRect.width / 2,
                  width: popRect.width,
                  height: popRect.width,
                  background: `radial-gradient(circle, rgba(255,255,255,0.35) 0%, rgba(${themeColor},0.12) 35%, transparent 70%)`,
                  mixBlendMode: "screen",
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: [0, 0.9, 0], scale: [0.8, 1.1, 1.4] }}
                transition={{ duration: 0.45, times: [0, 0.3, 1] }}
              />
            )}
          </AnimatePresence>

          {/* ── Bubble fragments (emanating from perimeter) ── */}
          <AnimatePresence>
            {popping &&
              fragments.map((f) => (
                <motion.div
                  key={f.id}
                  className="fixed rounded-full pointer-events-none"
                  style={{
                    left: f.startX - f.size / 2,
                    top: f.startY - f.size / 2,
                    width: f.size,
                    height: f.size,
                    background: `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.55), rgba(${themeColor},0.5) 45%, rgba(${themeColor},0.1) 100%)`,
                    border: `1px solid rgba(${themeColor},0.45)`,
                    boxShadow: `0 0 12px rgba(${themeColor},0.4), inset 0 0 6px rgba(255,255,255,0.3)`,
                  }}
                  initial={{ opacity: 0, x: 0, y: 0, scale: 0.4, rotate: 0 }}
                  animate={{
                    opacity: [0, 1, 1, 0],
                    x: [0, f.dx * 0.3, f.dx],
                    y: [0, f.dy * 0.3, f.dy],
                    scale: [0.4, 1, 0.6],
                    rotate: f.rotate,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: f.delay,
                    times: [0, 0.15, 0.5, 1],
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              ))}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
