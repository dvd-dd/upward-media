import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Phoenix — Brand Identity Case Study",
  description:
    "Cybersecurity brand identity for Phoenix. Intelligent protection, constant evolution — a visual system built for digital security.",
};

export default function PhoenixLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
