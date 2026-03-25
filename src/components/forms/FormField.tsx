import type { ComponentProps } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui";

interface FormFieldProps extends ComponentProps<typeof Input> {
  name: string;
  label?: string;
}

const FormField = ({ name, ...otherProps }: FormFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  // Retrieve the error message if it exists for this specific field
  const error = errors[name]?.message as string | undefined;

  return (
    <Input
      errorText={error}
      {...otherProps} // Standard props (variant, size, placeholder, ...)
      {...register(name)} // RHF props (name, ref, onChange) take precedence
    />
  );
};

export default FormField;
