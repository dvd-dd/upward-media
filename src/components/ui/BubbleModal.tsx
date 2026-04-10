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

/* ── Fragment generation ── */
function generateFragments(count: number) {
  return Array.from({ length: count }, (_, i) => {
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.8;
    const distance = 120 + Math.random() * 200;
    return {
      id: i,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance + Math.random() * 60,
      size: 6 + Math.random() * 14,
      delay: Math.random() * 0.08,
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
  const contentRef = useRef<HTMLDivElement>(null);

  const fragments = useMemo(() => generateFragments(10), []);

  /* ── Pop then close ── */
  const triggerPop = useCallback(() => {
    if (popping) return;
    setPopping(true);
    setTimeout(() => {
      setPopping(false);
      onClose();
    }, 550);
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

  /* ── Origin point for scale ── */
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
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* ── Bubble fragments (visible only while popping) ── */}
          <AnimatePresence>
            {popping &&
              fragments.map((f) => (
                <motion.div
                  key={f.id}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width: f.size,
                    height: f.size,
                    background: isPrimary
                      ? "linear-gradient(135deg, rgba(0,212,170,0.6), rgba(0,212,170,0.15))"
                      : "linear-gradient(135deg, rgba(139,92,246,0.6), rgba(139,92,246,0.15))",
                    border: `1px solid ${isPrimary ? "rgba(0,212,170,0.4)" : "rgba(139,92,246,0.4)"}`,
                    boxShadow: isPrimary
                      ? "0 0 8px rgba(0,212,170,0.3)"
                      : "0 0 8px rgba(139,92,246,0.3)",
                  }}
                  initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                  animate={{
                    opacity: 0,
                    x: f.x,
                    y: f.y,
                    scale: 0.3,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: f.delay,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              ))}
          </AnimatePresence>

          {/* ── Bubble ── */}
          {!popping && (
            <motion.div
              ref={contentRef}
              className="relative z-10 w-[90vw] max-w-lg max-h-[80vh] overflow-y-auto rounded-3xl"
              style={{
                transformOrigin: `${origin.x} ${origin.y}`,
                background: "rgba(18, 18, 30, 0.88)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.15, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 350,
                damping: 22,
                mass: 0.8,
              }}
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
              <div className="relative p-8 md:p-10">
                {/* Close button */}
                <button
                  onClick={triggerPop}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-text-secondary hover:text-white hover:bg-white/10 transition-colors"
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
                <h3 className="font-clash font-bold text-2xl md:text-3xl text-white mb-4">
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
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
