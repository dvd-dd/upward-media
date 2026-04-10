import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "NextMoney — Brand & Business Case Study",
  description:
    "Fintech brand identity for NextMoney. Tax intelligence and business credit in one ecosystem — connecting companies to growth.",
};

export default function NextMoneyLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
