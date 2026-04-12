"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedCounterProps {
  endValue: number;
  suffix?: string;
  label: string;
}

export default function AnimatedCounter({
  endValue,
  suffix = "",
  label,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        const obj = { val: 0 };
        gsap.to(obj, {
          val: endValue,
          duration: 2,
          ease: "power2.out",
          onUpdate: () => setDisplay(Math.round(obj.val)),
        });
      },
    });

    return () => {
      st.kill();
    };
  }, [endValue]);

  return (
    <div ref={ref} className="text-center">
      <span className="font-clash font-extrabold text-3xl xs:text-4xl sm:text-5xl md:text-6xl text-primary tabular-nums block">
        {display}
        {suffix}
      </span>
      <p className="text-text-secondary text-xs xs:text-sm md:text-base mt-2 leading-tight">{label}</p>
    </div>
  );
}
