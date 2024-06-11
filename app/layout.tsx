import "@/styles/globals.css";

import { Metadata } from "next";
import { Inter } from "next/font/google";

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
            "min-h-screen font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="relative flex min-h-screen flex-col dark:bg-black h-full bg-gradient-to-b from-indigo-700/100  via-indigo-500/90 to-indigo-700/100 z-10 backdrop-blur-[0.7rem]">
              <SiteHeader />
              {/* <RouteChangeListener /> */}
              <div className="hidden dark:block absolute inset-0 w-full h-full blur-sm">
                <LightPoints />
              </div>
              <div className="dark:hidden absolute inset-0 w-full h-full z-0 blur-sm">
                <Ribbons />
              </div>

              <div className="w-full min-h-screen absolute inset-0 ">
                {/* <LightPoints /> */}
                <div className=" w-full h-full z-10">
                  <div className="flex relative flex-row bg-transparent h-full">
                    <div className="mx-auto my-auto flex flex-row max-w-7xl w-full">
                      <div className="grid grid-flow-col w-full">
                        <div className="z-40 mr-0">
                          <DDRW />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
