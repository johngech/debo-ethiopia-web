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
      className={({ isActive, ...restProps }) =>
        mergeClassName(
          "btn btn-ghost btn-sm normal-case gap-2",
          isActive && "btn-active bg-base-200", // daisyUI active state
          typeof className === "function"
            ? className({ isActive: isActive, ...restProps })
            : className,
        )
      }
      {...otherProps}
    >
      {icon && <span className="text-lg">{icon}</span>}
      {children}
    </NavLink>
  );
};
