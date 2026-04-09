"use client";

import { ReactNode } from "react";
import dynamic from "next/dynamic";
import LoadingScreen from "@/components/ui/LoadingScreen";

const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), {
  ssr: false,
});

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      {children}
    </>
  );
}
