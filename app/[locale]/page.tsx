import type { Metadata } from "next";
import { DDRW } from "@/components/ddrw";
import LightPoints from "@/components/LightPoints";
import Ribbons from "@/components/Ribbons";
import MatrixProvider from "@/contexts/MatrixContext";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "DDRW",
  description: "Distributed Data Resources and Web",
  openGraph: {
    title: "DDRW",
    type: "website",
    siteName: "DDRW",
    url: "https://ddrw.org/",
    locale: "en",
    description: "Distributed Data Resources and Web.",
    images: [
      {
        type: "image/png",
        width: 100,
        height: 100,
        url: "https://www.ticketshub.ge/opengraph-image.png",
      },
    ],
  },
};

export default function IndexPage() {
  return (
    <>
      {/* <DDRW /> */}
      <div className="w-full min-h-screen absolute inset-0">
        {/* <LightPoints /> */}
        <MatrixProvider>
          <div className="hidden dark:visible w-full h-full">
            <div className="absolute">
              <DDRW />
            </div>
            <div className="backdrop-blur-[0.2rem] w-full h-full blur-sm">
              <LightPoints />
            </div>
          </div>
          <div className="visible dark:invisible h-full bg-black">
            <Ribbons />
          </div>
        </MatrixProvider>
      </div>
    </>
  );
}
