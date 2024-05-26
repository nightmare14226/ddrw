import Link from "next/link";

import { siteConfig } from "@/config/site";
import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import Image from "next/image";

export function SiteHeader() {
  return (
    <header className="header relative z-10 backdrop-blur-[0.2rem] w-full mx-auto pt-0 flex justify-center items-center">
      <nav className="mx-auto header drop-shadow-md px-0 max-w-7xl mt-0 hidden md:block lg:mt-0 w-full">
        <div className="container mx-auto">
          <div className="pt-10 relative flex items-center justify-between h-16">
            <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-transparent">
              <div className="flex items-center flex-shrink-0 px-4 justify-left">
                <Image
                  className="block py-1"
                  src={"./logo-ddrw.svg"}
                  height={48}
                  width={96}
                  alt="logo_ddrw"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 inset-y-0 right-0 items-center sm:static sm:inset-auto">
              <nav className="flex">
                <ThemeToggle />
              </nav>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
