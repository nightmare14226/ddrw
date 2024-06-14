import type { Metadata } from "next";
import CustomLink from "@/components/ui/CustomLink";
import "@/styles/tailwind.scss";
import { DDRW } from "@/components/ddrw";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ProgressBarLink } from "@/components/ProgressBar";
export default function IndexPage() {
  return (
    <>
      {/* <DDRW /> */}
      <div className="w-full min-h-screen absolute inset-0 px-[10px]">
        {/* <LightPoints /> */}
        <div className=" w-full h-full z-10">
          <div className="flex relative flex-row bg-transparent h-full">
            <div className="mx-auto my-auto flex flex-row max-w-7xl">
              <div className="grid grid-flow-col gap-5">
                <div className="mx-auto grid grid-flow-row z-40 gap-5 my-auto">
                  <h1 className="selection:bg-white/50 selection:text-white text-center sm:text-left lg:text-left font-raleway font-bold uppercase md:pt-0 text-gray-300 text-4xl md:text-5xl lg:text-7xl xl:text-8xl ">
                    DECENTRALIZED
                  </h1>
                  <p className="selection:bg-white/50 selection:text-white text-center sm:text-left relative -top-2 md:pl-0 font-raleway font-extralight text-gray-300 text-[1.29rem] md:text-[1.77rem] lg:text-[2.64rem] xl:text-[3.55rem]]">
                    Data Resoures for Web
                  </p>
                  <CustomLink href="/register" />
                </div>
                <DDRW />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
