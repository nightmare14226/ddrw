import "@/styles/globals.css";

import { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { fontSans } from "@/lib/fonts";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import LightPoints from "@/components/LightPoints";
import Ribbons from "@/components/Ribbons";
import { DDRW } from "@/components/ddrw";
const inter = Inter({ subsets: ["latin"] });
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};
export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
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
            "min-h-screen font-sans antialiased",
            fontSans.variable
          )}
        >
          <NextTopLoader
            color="#2299DD"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={true}
            easing="ease"
            speed={200}
            shadow="0 0 10px #2299DD,0 0 5px #2299DD"
          />
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="relative flex min-h-screen flex-col mainCv dark:bg-black h-full bg-gradient-to-b from-indigo-700/100  via-indigo-500/90 to-indigo-700/100 z-10 backdrop-blur-[0.7rem]">
              <SiteHeader />
              {/* <RouteChangeListener /> */}
              <div className="hidden dark:block absolute inset-0 w-full h-full blur-sm">
                <LightPoints />
              </div>
              <div className="dark:hidden absolute inset-0 w-full h-full z-0 blur-sm">
                <Ribbons />
              </div>
              {children}
            </div>
            <TailwindIndicator />
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
