import { useMe } from "./useMe";

export const useIsAdmin = () => {
  const { data: user } = useMe();
  return user?.role === "SUPER_ADMIN"; // Admin
};
