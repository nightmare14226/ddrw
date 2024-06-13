"use client";

import { Link } from "react-transition-progress/next";
import { ArrowRightIcon } from "lucide-react";
import { useCallback } from "react";
import { useModeStore } from "../StateProvider";
import { useProgress } from "react-transition-progress";
type LinkProps = {
  href: string;
};

const CustomLink: React.FC<LinkProps> = ({ href }) => {
  const changeTurboMode = useModeStore.use.changeTurboMode();
  const startProgress = useProgress();
  const handleClick = useCallback(() => {
    changeTurboMode();
    startProgress();
  }, [href]);
  return (
    <Link
      className="btn btn-out submit-button"
      href={href}
      onClick={handleClick}
      type="submit"
    >
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
    </Link>
  );
};

export default CustomLink;
