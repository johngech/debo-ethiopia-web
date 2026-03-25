import { forwardRef, type InputHTMLAttributes, useId } from "react";
import { LuPlus, LuX } from "react-icons/lu";
import { mergeClassName } from "./mergeClassName";

interface MultiImagePickerProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  errorText?: string;
  previews: string[]; // Array of blob URLs
  onRemove: (index: number) => void;
}

export const MultipleImageInput = forwardRef<
  HTMLInputElement,
  MultiImagePickerProps
>(
  (
    { label, errorText, previews, onRemove, className, id, ...otherProps },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    return (
      <div className="form-control w-full">
        {label && (
          <label htmlFor={inputId} className="label">
            <span className="label-text font-medium text-base-content/80">
              {label}
            </span>
          </label>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* 1. Existing Previews */}
          {previews.map((url, index) => (
            <div
              key={url}
              className="relative aspect-square rounded-xl overflow-hidden border border-base-300 group"
            >
              <img
                src={url}
                alt={`upload-${index}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="absolute top-1 right-1 btn btn-circle btn-xs btn-error opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <LuX size={12} />
              </button>
            </div>
          ))}

          {/* 2. The Add Button (The actual input) */}
          <label
            htmlFor={inputId}
            className={mergeClassName(
              "flex flex-col items-center justify-center aspect-square border-2 border-dashed rounded-xl cursor-pointer transition-all hover:bg-base-200",
              errorText
                ? "border-error"
                : "border-base-300 hover:border-primary",
            )}
          >
            <LuPlus size={24} className="opacity-40" />
            <span className="text-[10px] mt-1 uppercase font-bold opacity-40">
              Add More
            </span>
            <input
              id={inputId}
              ref={ref}
              type="file"
              multiple // Crucial attribute
              accept="image/*"
              className="hidden"
              {...otherProps}
            />
          </label>
        </div>

        {errorText && (
          <div className="label">
            <span className="label-text-alt text-error font-semibold">
              {errorText}
            </span>
          </div>
        )}
      </div>
    );
  },
);

MultipleImageInput.displayName = "MultipleImageInput";
