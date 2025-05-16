import Link, { LinkProps } from "next/link";
import React from "react";

interface TextLinksProps extends LinkProps {
  texto: string;
  iconElement?: React.ReactNode;
}

export default function TextMenu({
  texto,
  href,
  iconElement,
  ...rest
}: TextLinksProps) {
  return (
    <>
      <Link href={href} {...rest} className="no-underline">
        <div className="flex items-center text-2xl text-white no-underline text-left hover:text-gray-400 hover:text-primary">
          {iconElement && <span className="mr-2">{iconElement}</span>}
          {texto}
        </div>
      </Link>
    </>
  );
}
