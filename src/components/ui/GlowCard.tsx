import { HTMLAttributes, ReactNode } from "react";

interface GlowCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  color?: "primary" | "accent";
  className?: string;
}

export default function GlowCard({
  children,
  color = "primary",
  className = "",
  ...props
}: GlowCardProps) {
  const hoverBorder =
    color === "primary" ? "hover:border-primary/60" : "hover:border-accent/60";

  const hoverShadow =
    color === "primary"
      ? "hover:shadow-[0_0_20px_rgba(0,212,170,0.15),0_0_60px_rgba(0,212,170,0.05)]"
      : "hover:shadow-[0_0_20px_rgba(139,92,246,0.15),0_0_60px_rgba(139,92,246,0.05)]";

  return (
    <div
      className={`bg-surface border border-border rounded-2xl p-6 transition-all duration-500 ${hoverBorder} ${hoverShadow} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
