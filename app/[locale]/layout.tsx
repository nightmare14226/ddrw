import "@/styles/globals.css";

import { Metadata } from "next";
import { Inter } from "next/font/google";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { fontSans } from "@/lib/fonts";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { TailwindIndicator } from "@/components/tailwind-indicator";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
  },
};

type RootLayoutProps = {
  children: React.ReactNode;
  params: { locale: string };
};

export default async function RootLayout({
  children,
  params: { locale },
}: RootLayoutProps) {
  // Providing all messages to the client
  // side is the easiest way to get started
  return (
    <>
      <html lang={locale} suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen font-sans antialiased bg-[#272a33]",
            fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <div className="flex-1">{children}</div>
            </div>
            <TailwindIndicator />
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
