import type { ReactNode } from "react";
import { mergeClassName } from "../ui/mergeClassName";

interface NavItemProps {
  children: ReactNode;
  className?: string;
}

export const NavItem = ({ children, className }: NavItemProps) => {
  return (
    <li className="list-none">
      <div
        className={mergeClassName(
          "relative group flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ease-in-out",
          "text-base-content/70 hover:text-primary hover:bg-primary/5",
          className,
        )}
      >
        {children}
      </div>
    </li>
  );
};
