import { mergeClassName } from "../ui/mergeClassName";

interface UnderlineProps {
  isActive?: boolean;
  className?: string;
}

export const NavUnderline = ({ isActive, className }: UnderlineProps) => {
  return (
    <span
      className={mergeClassName(
        // Visibility: Hidden on mobile, absolute on desktop
        "hidden lg:block absolute bottom-0 left-1/2 h-0.5 -translate-x-1/2 bg-primary transition-all duration-300",
        // Width logic: full if active, zero (expand on hover) if not
        isActive ? "w-2/3" : "w-0 group-hover:w-2/3",
        className,
      )}
    />
  );
};
