"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const letters = "UPWARD".split("");

export default function LoadingScreen() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [lastPathname, setLastPathname] = useState(pathname);

  // Detect route change DURING render (synchronous, no flash)
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setVisible(true);
  }

  // Hide after 1.5s
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => setVisible(false), 1500);
    return () => clearTimeout(timer);
  }, [visible, pathname]);

  return (
    <div
      className="fixed inset-0 z-[9998] bg-background flex items-center justify-center"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        visibility: visible ? "visible" : "hidden",
        transition: visible ? "none" : "opacity 500ms ease, visibility 500ms ease",
      }}
      aria-hidden={!visible}
    >
      <div className="flex gap-1">
        {letters.map((letter, i) => (
          <span
            key={i}
            className="font-clash font-extrabold text-4xl md:text-6xl text-primary animate-slide-up"
            style={{
              animationDelay: `${i * 80}ms`,
              animationFillMode: "both",
            }}
          >
            {letter}
          </span>
        ))}
        <span
          className="font-clash font-normal text-4xl md:text-6xl text-white ml-2 animate-fade-in"
          style={{
            animationDelay: "600ms",
            animationFillMode: "both",
          }}
        >
          MEDIA
        </span>
      </div>
    </div>
  );
}
