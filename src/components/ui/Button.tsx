import { type ButtonHTMLAttributes, forwardRef, type ReactNode } from "react";
import { mergeClassName } from "./mergeClassName";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "ghost" | "error";
  size?: "lg" | "md" | "sm" | "xs";
  outline?: boolean;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      outline,
      isLoading,
      leftIcon,
      rightIcon,
      children,
      className,
      ...rest
    },
    ref,
  ) => {
    // Construct daisyUI class string dynamically
    const buttonClasses = mergeClassName(
      "btn",
      `btn-${variant}`,
      `btn-${size}`,
      outline && "btn-outline",
      isLoading && "btn-disabled",
      className, // Allow custom classes from outside
    );

    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={isLoading}
        {...rest}
      >
        {isLoading ? (
          <span className="loading loading-spinner"></span>
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  },
);

Button.displayName = "Button";
