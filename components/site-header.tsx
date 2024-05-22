import Link from "next/link";

import { siteConfig } from "@/config/site";
export function SiteHeader() {
  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-20 items-center space-x-4 sm:justify-between sm:space-x-0">
        <h1>DDRW</h1>
      </div>
    </header>
  );
}
