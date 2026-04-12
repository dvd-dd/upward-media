"use client";

import { ReactNode } from "react";
import dynamic from "next/dynamic";
import { ThemeProvider } from "next-themes";
import LoadingScreen from "@/components/ui/LoadingScreen";

const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), {
  ssr: false,
});

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      storageKey="upward-theme"
      disableTransitionOnChange
    >
      <LoadingScreen />
      <CustomCursor />
      {children}
    </ThemeProvider>
  );
}
