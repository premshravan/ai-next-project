"use client";
import * as react from "react";
import { ThemeProvider as NextThemeseProvider } from "next-themes";
export function ThemeProvider({ children, ...props }) {
  return <NextThemeseProvider {...props}>{children}</NextThemeseProvider>;
}

 