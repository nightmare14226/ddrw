import "@/styles/globals.css";

import { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { fontSans } from "@/lib/fonts";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import LightPoints from "@/components/LightPoints";
import { ProgressBar } from "@/components/ProgressBar";
import Ribbons from "@/components/Ribbons";
const inter = Inter({ subsets: ["latin"] });
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export const metadata: Metadata = {
  title: "DDRW – мастерская технологических решений",
  description: "Разработка программ для бизнеса и частных лиц.",
  openGraph: {
    title: "DDRW – мастерская технологических решений",
    type: "website",
    siteName: "DDRW",
    url: "https://www.ddrw.ru/",
    locale: "ru",
    description: "Разработка программ для бизнеса и частных лиц.",
    images: [
      {
        type: "image/png",
        width: 100,
        height: 100,
        url: "https://www.ddrw.ru/photo.png",
      },
    ],
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
        <head>
          <link rel="icon" href="/favicon.iso" sizes="any" />
        </head>
        <body
          className={cn(
            "min-h-screen font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ProgressBar className="fixed top-0 h-1 bg-sky-500 z-50">
              <div>
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
              </div>
            </ProgressBar>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
