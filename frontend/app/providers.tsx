"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const Providers = ({ children }: { children: React.ReactNode }) => (
  <NextUIProvider>
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
    >
      <div>
        <main>{children}</main>
      </div>
    </NextThemesProvider>
  </NextUIProvider>
);

export default Providers;
