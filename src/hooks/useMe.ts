import { useQuery } from "@tanstack/react-query";
import apiClient from "@/api/ApiClient";
import type { User } from "@/types/user";

const userMeClient = apiClient<User>("/auth/users/me");

export const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: () => userMeClient.get(),
    staleTime: 5 * 60 * 1000, // cache for 5 min
  });
};
