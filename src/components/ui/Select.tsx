import { forwardRef, type SelectHTMLAttributes, useId } from "react";
import { mergeClassName } from "./mergeClassName";

interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  options: SelectOption[];
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
  label?: string;
  errorText?: string;
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      options,
      variant,
      size = "md",
      bordered = true,
      label,
      errorText,
      placeholder,
      className,
      id,
      ...otherProps
    },
    ref,
  ) => {
    const generatedId = useId();
    const selectId = id || generatedId;

    const selectClasses = mergeClassName(
      "select w-full",
      variant && `select-${variant}`,
      size && `select-${size}`,
      bordered && "select-bordered",
      errorText && "select-error",
      className,
    );

    return (
      <div className="form-control w-full">
        {label && (
          <label className="label" htmlFor={selectId}>
            <span className="label-text font-medium">{label}</span>
          </label>
        )}

        <select
          ref={ref}
          id={selectId}
          className={selectClasses}
          defaultValue=""
          {...otherProps}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>

        {errorText && (
          <label className="label" htmlFor={selectId}>
            <span className="label-text-alt text-error">{errorText}</span>
          </label>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";
