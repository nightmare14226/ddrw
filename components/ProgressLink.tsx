// app/components/progress-link.tsx
"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useProgress } from "./ProgressBar";
export default function ProgressLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  let router = useRouter();
  let { start, done } = useProgress();

  return (
    <Link
      onClick={async (e) => {
        e.preventDefault();
        start();
        await router.push(href);
        done();
      }}
      href={href}
    >
      {children}
    </Link>
  );
}
