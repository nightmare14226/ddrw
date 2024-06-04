import type { Metadata } from "next";
import { DDRW } from "@/components/ddrw";
import LightPoints from "@/components/LightPoints";
import Ribbons from "@/components/Ribbons";
import MainForm from "@/components/MainForm";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
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

                  <Button className="btn-out">
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                    <p className="text-white text-left group-hover:text-white">
                      Присоединиться
                      <span className="absolute right-0 inset-y-0 flex items-center pr-3">
                        <ArrowRightIcon
                          className="h-5 w-5 text-white group-hover:text-white"
                          aria-hidden="true"
                        />
                      </span>
                    </p>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden dark:block absolute inset-0 w-full h-full">
          <LightPoints />
        </div>
        <div className="dark:hidden absolute inset-0 w-full h-full bg-transparent z-0">
          <Ribbons />
        </div>
      </div>
    </>
  );
}
