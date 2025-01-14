import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from ".";

export const useGetUserProfile = () => {
  return useQuery({
    queryKey: ["profiles", "me"],
    staleTime: 60 * 1000, // 60 Seconds
    queryFn: () => {
      return getUserProfile();
    },
    retry: false,
  });
};
