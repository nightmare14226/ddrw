import type { Metadata } from "next";
import CustomLink from "@/components/ui/CustomLink";
import "@/styles/tailwind.scss";
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
        <div className=" w-full h-full z-10">
          <div className="flex relative flex-row bg-transparent h-full">
            <div className="mx-auto my-auto flex flex-row max-w-7xl">
              <div className="grid grid-flow-col gap-5">
                <div className="mx-auto grid grid-flow-row z-40 gap-5 my-auto mr-[420px]">
                  <h1 className="selection:bg-white/50 selection:text-white text-left lg:text-left font-raleway font-bold uppercase md:pt-0 text-gray-300 text-4xl md:text-5xl lg:text-7xl xl:text-8xl">
                    DECENTRALIZED
                  </h1>
                  <p className="selection:bg-white/50 selection:text-white text-left relative -top-2 md:pl-0 font-raleway font-extralight text-gray-300 text-[1.29rem] md:text-[1.77rem] lg:text-[2.64rem] xl:text-[3.55rem]]">
                    Data Resoures for Web
                  </p>
                  <CustomLink href="/register" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
