import Link, { LinkProps as NextLinkProps } from "next/link"; 
import React from "react";

// Props específicas do seu componente TextMenu
interface TextMenuOwnProps {
  texto: string;
  iconElement?: React.ReactNode;  
  href: NextLinkProps['href']; 
}


type RemainingLinkProps = Omit<NextLinkProps, 'href'>;
export type TextMenuComponentProps = TextMenuOwnProps & RemainingLinkProps;

export default function TextMenu({
  texto,
  href,         
  iconElement,  
  ...restOfLinkProps 
}: TextMenuComponentProps) {
  return (
    <>      
      <Link href={href} {...restOfLinkProps} className="no-underline">
        <div className="flex items-center text-2xl text-white no-underline text-left hover:text-gray-400 hover:text-primary">
          {iconElement && <span className="mr-2">{iconElement}</span>}
          {texto}
        </div>
      </Link>
    </>
  );
}