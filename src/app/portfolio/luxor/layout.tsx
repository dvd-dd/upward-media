import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Luxor — Brand Identity Case Study",
  description:
    "Premium brand identity for Luxor. Exclusivity, sophistication, and prestige — a visual and verbal system built for the highest standard.",
};

export default function LuxorLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
