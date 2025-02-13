import { ThemeToggle } from "@/components/theme-toggle";
import Image from "next/image";
import RocketToggle from "./rocket-toggle";
import { ListToggle } from "./ListToggle";

export function SiteHeader() {
  return (
    <header className="header relative z-10 w-full mx-auto pt-0 flex justify-center items-center h-15">
      <nav className="mx-auto header drop-shadow-md px-0 max-w-7xl mt-0 block lg:mt-0 w-full">
        <div className="pt-10 relative flex items-center justify-between h-16 mx-[30px]">
          <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-transparent">
            <div className="flex items-center flex-shrink-0 px-4 justify-left z-30">
              <Image
                className="block py-1"
                src={"./logo-ddrw.svg"}
                height={48}
                width={96}
                alt="logo_ddrw"
              />
              <div className="pl-1 pt-0 hidden dark:block">
                <RocketToggle />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 inset-y-0 right-0 items-center sm:static sm:inset-auto">
            <nav className="flex flex-row gap-5">
              <ThemeToggle />
              <ListToggle />
            </nav>
          </div>
        </div>
      </nav>
    </header>
  );
}
