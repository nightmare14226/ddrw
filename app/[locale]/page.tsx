import type { Metadata } from "next";
import { DDRW } from "@/components/ddrw";
import LightPoints from "@/components/LightPoints";

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
      <DDRW />
      <LightPoints />
    </>
  );
}
