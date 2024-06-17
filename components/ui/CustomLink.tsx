"use client";

import { ArrowRightIcon } from "lucide-react";
import { ProgressBarLink } from "../ProgressBar";
type LinkProps = {
  href: string;
};

const CustomLink: React.FC<LinkProps> = ({ href }) => {
  return (
    <ProgressBarLink className="btn btn-out submit-button" href={href}>
      <div>
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
      </div>
    </ProgressBarLink>
  );
};

export default CustomLink;
