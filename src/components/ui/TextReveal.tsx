"use client";

import { ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  children: ReactNode;
  delay?: number;
  /** "words" splits text nodes into word spans with overflow-hidden mask reveal.
   *  "block" (default) slides the whole block up. */
  mode?: "block" | "words";
}

export default function TextReveal({
  children,
  delay = 0,
  mode = "block",
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let anim: gsap.core.Tween;

    if (mode === "words") {
      // Wrap each word in a mask container
      const text = el.textContent || "";
      const words = text.split(/\s+/).filter(Boolean);
      el.innerHTML = words
        .map(
          (word) =>
            `<span class="inline-block overflow-hidden"><span class="inline-block word-inner" style="transform:translateY(100%)">${word}</span></span>`
        )
        .join(" ");

      const inners = el.querySelectorAll(".word-inner");

      anim = gsap.to(inners, {
        y: 0,
        duration: 0.6,
        stagger: 0.03,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      });
    } else {
      anim = gsap.fromTo(
        el,
        { opacity: 0, y: 30, clipPath: "inset(100% 0 0 0)" },
        {
          opacity: 1,
          y: 0,
          clipPath: "inset(0% 0 0 0)",
          duration: 0.8,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        }
      );
    }

    return () => {
      anim.scrollTrigger?.kill();
    };
  }, [delay, mode]);

  return (
    <div ref={ref} className={mode === "block" ? "opacity-0" : ""}>
      {children}
    </div>
  );
}
