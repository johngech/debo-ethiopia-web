import {
  forwardRef,
  type InputHTMLAttributes,
  type ReactNode,
  useId,
} from "react";
import { mergeClassName } from "./mergeClassName";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?:
    | "primary"
    | "secondary"
    | "accent"
    | "info"
    | "success"
    | "warning"
    | "error";
  size?: "lg" | "md" | "sm" | "xs";
  bordered?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  label?: string;
  errorText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant,
      size = "md",
      bordered = true,
      leftIcon,
      rightIcon,
      label,
      id,
      errorText,
      className,
      ...otherProps
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    const wrapperClasses = mergeClassName(
      "input flex items-center gap-2",
      variant && `input-${variant}`,
      size && `input-${size}`,
      bordered && "input-bordered",
      errorText && "input-error",
      className,
    );

    return (
      <div className="form-control w-full">
        {/* Top Label (Optional) */}
        {label && (
          <label htmlFor={inputId} className="label">
            <span className="label-text font-medium">{label}</span>
          </label>
        )}

        {/* The Horizontal Container */}
        <div className={wrapperClasses}>
          {leftIcon && <span className="opacity-70">{leftIcon}</span>}

          <input id={inputId} ref={ref} className="grow" {...otherProps} />

          {rightIcon && <span className="opacity-70">{rightIcon}</span>}
        </div>

        {/* Error Message */}
        {errorText && (
          <label htmlFor={inputId} className="label">
            <span className="label-text-alt text-error">{errorText}</span>
          </label>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
