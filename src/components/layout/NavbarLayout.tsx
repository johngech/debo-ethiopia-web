import type { ReactNode } from "react";
import { mergeClassName } from "../ui/mergeClassName";

interface NavbarLayoutProps {
  startContent?: ReactNode;
  centerContent?: ReactNode;
  endContent?: ReactNode;
  sticky?: boolean;
  glass?: boolean;
  className?: string;
}

export const NavbarLayout = ({
  startContent,
  centerContent,
  endContent,
  sticky = true,
  glass = true,
  className,
}: NavbarLayoutProps) => {
  return (
    <header
      className={mergeClassName(
        "navbar bg-base-100 border-b border-base-300 px-4",
        sticky && "sticky top-0 z-30",
        glass && "bg-opacity-90 backdrop-blur",
        className,
      )}
    >
      {/* Start Content: Breadcrumbs, Mobile Toggles, Logo, or Title
       */}
      {startContent && <div className="navbar-start gap-2">{startContent}</div>}

      {/* Center Content: Main Nav Links or Search
       */}
      {centerContent && (
        <div className="navbar-center hidden lg:flex gap-1">
          {centerContent}
        </div>
      )}

      {/* End Content: Profile, Notifications, Theme Toggles
       */}
      {endContent && <div className="navbar-end gap-2">{endContent}</div>}
    </header>
  );
};
