import { NavLink, type NavLinkProps } from "react-router-dom";
import { mergeClassName } from "./mergeClassName";

interface LinkProps extends NavLinkProps {
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Link = ({
  icon,
  children,
  className,
  ...otherProps
}: LinkProps) => {
  return (
    <NavLink
      className={({ isActive }) =>
        mergeClassName(
          "flex items-center gap-2 transition-all duration-200 ease-in-out rounded-lg",
          "px-3 py-1.5 text-sm font-medium",
          // Dropdown-friendly active states
          isActive
            ? "bg-primary/10 text-primary shadow-sm"
            : "text-base-content/70 hover:text-primary hover:bg-primary/5",
          className,
        )
      }
      {...otherProps}
    >
      {icon}
      {typeof children === "function" ? children : <span>{children}</span>}
    </NavLink>
  );
};
