import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "PeçaAí — Brand Identity Case Study",
  description:
    "Complete brand identity for PeçaAí, an automotive parts marketplace. Logo, color system, typography, tone of voice, and brand deck.",
};

export default function PecaAiLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
