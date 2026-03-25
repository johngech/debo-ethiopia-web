import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { ImageInput } from "@/components/ui";

interface FormImagePickerProps {
  name: string;
  label?: string;
}

const FormImagePicker = ({ name, label }: FormImagePickerProps) => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const [preview, setPreview] = useState<string | undefined>();

  // Watch the file field to update preview
  const fileList = watch(name);

  useEffect(() => {
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      if (file instanceof File) {
        const url = URL.createObjectURL(file);
        setPreview(url);
        return () => URL.revokeObjectURL(url);
      }
    } else {
      setPreview(undefined);
    }
  }, [fileList]);

  const handleClear = () => {
    setValue(name, null);
    setPreview(undefined);
  };

  return (
    <ImageInput
      label={label}
      errorText={errors[name]?.message as string}
      previewUrl={preview}
      onClear={handleClear}
      {...register(name)}
    />
  );
};

export default FormImagePicker;
