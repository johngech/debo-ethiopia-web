import { useEffect, useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import { MultipleImageInput } from "@/components/ui";

const FormMultiImagePicker = ({
  name,
  label,
}: {
  name: string;
  label?: string;
}) => {
  const { control } = useFormContext();
  const {
    field: { onChange, value, ref },
    fieldState: { error },
  } = useController({ name, control, defaultValue: [] });

  const [previews, setPreviews] = useState<string[]>([]);

  // Update previews whenever the value (array of Files) changes
  useEffect(() => {
    const files = Array.isArray(value) ? value : [];
    const newPreviews = files.map((file: File) => URL.createObjectURL(file));
    setPreviews(newPreviews);

    // Clean up memory
    return () =>
      newPreviews.forEach((url) => {
        URL.revokeObjectURL(url);
      });
  }, [value]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    // Append new files to existing ones
    onChange([...(value || []), ...newFiles]);
  };

  const handleRemove = (index: number) => {
    const updatedFiles = [...value];
    updatedFiles.splice(index, 1);
    onChange(updatedFiles);
  };

  return (
    <MultipleImageInput
      label={label}
      ref={ref}
      previews={previews}
      onRemove={handleRemove}
      onChange={handleFileChange}
      errorText={error?.message}
    />
  );
};

export default FormMultiImagePicker;
