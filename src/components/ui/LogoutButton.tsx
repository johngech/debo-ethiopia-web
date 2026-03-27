import { useQueryClient } from "@tanstack/react-query";
import { type ComponentProps, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "./Button";

interface LogoutButtonProps extends ComponentProps<typeof Button> {}

const LogoutButton = ({ ...props }: LogoutButtonProps) => {
  const { logout } = useAuthStore();
  const client = useQueryClient();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogout = async () => {
    setIsSubmitting(true);
    await logout();
    client.removeQueries({ queryKey: ["me"] });
    setIsSubmitting(false);
  };

  return <Button {...props} isLoading={isSubmitting} onClick={handleLogout} />;
};

export default LogoutButton;
