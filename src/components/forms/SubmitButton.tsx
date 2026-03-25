import type { ComponentProps } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui";

interface SubmitButtonProps extends ComponentProps<typeof Button> {
  title: string;
}

const SubmitButton = ({ title, ...otherProps }: SubmitButtonProps) => {
  const {
    formState: { isSubmitting, isValid },
  } = useFormContext();

  return (
    <Button
      type="submit"
      variant="primary"
      isLoading={isSubmitting}
      disabled={!isValid || isSubmitting}
      className="w-full mt-4"
      {...otherProps}
    >
      {title}
    </Button>
  );
};

export default SubmitButton;
