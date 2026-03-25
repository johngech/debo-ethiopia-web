import { forwardRef, type InputHTMLAttributes, useId } from "react";
import { LuImagePlus, LuX } from "react-icons/lu";
import { mergeClassName } from "@/components/ui";

interface ImagePickerProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  errorText?: string;
  previewUrl?: string;
  onClear?: () => void;
}

export const ImageInput = forwardRef<HTMLInputElement, ImagePickerProps>(
  (
    { label, errorText, previewUrl, onClear, className, id, ...otherProps },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    return (
      <div className="form-control w-full">
        {label && (
          <label htmlFor={inputId} className="label">
            <span className="label-text font-medium">{label}</span>
          </label>
        )}

        <div
          className={mergeClassName(
            "relative group flex flex-col items-center justify-center w-full h-44 border-2 border-dashed rounded-xl transition-all overflow-hidden",
            errorText
              ? "border-error bg-error/5"
              : "border-base-300 hover:border-primary bg-base-200/50",
            className,
          )}
        >
          {previewUrl ? (
            // Preview State
            <div className="relative w-full h-full">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={onClear}
                className="absolute top-2 right-2 btn btn-circle btn-xs btn-error shadow-lg"
              >
                <LuX size={14} />
              </button>
            </div>
          ) : (
            // Empty State
            <label
              htmlFor={inputId}
              className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
            >
              <LuImagePlus
                size={32}
                className="opacity-40 group-hover:text-primary group-hover:opacity-100 transition-all"
              />
              <span className="mt-2 text-xs opacity-60">
                Click to upload image
              </span>
            </label>
          )}

          <input
            id={inputId}
            ref={ref}
            type="file"
            accept="image/*"
            className="hidden"
            {...otherProps}
          />
        </div>

        {errorText && (
          <div className="label">
            <span className="label-text-alt text-error font-medium">
              {errorText}
            </span>
          </div>
        )}
      </div>
    );
  },
);

ImageInput.displayName = "ImageInput";
