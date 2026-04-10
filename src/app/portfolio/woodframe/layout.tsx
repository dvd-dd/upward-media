import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Wood Frame — Brand Identity Case Study",
  description:
    "Natural brand identity for Wood Frame. Design born from nature — a visual and verbal system built for contemporary wood design.",
};

export default function WoodFrameLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
