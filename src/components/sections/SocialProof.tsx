"use client";

import AnimatedCounter from "@/components/ui/AnimatedCounter";

const counters = [
  { endValue: 20, suffix: "+", label: "Projects Delivered" },
  { endValue: 15, suffix: "+", label: "Brands Built" },
  { endValue: 100, suffix: "%", label: "Custom Work" },
];

export default function SocialProof() {
  return (
    <section id="social-proof" className="relative py-24 bg-background">
      {/* Counters */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-8">
          {counters.map((c) => (
            <AnimatedCounter
              key={c.label}
              endValue={c.endValue}
              suffix={c.suffix}
              label={c.label}
            />
          ))}
        </div>
      </div>

      {/* Testimonials carousel goes here */}

      {/* Client logos marquee goes here */}
    </section>
  );
}
