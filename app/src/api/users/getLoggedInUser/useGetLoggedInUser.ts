import { useQuery } from "@tanstack/react-query";
import { getLoggedInUser } from ".";

export const useGetLoggedInUser = () => {
  return useQuery({
    queryKey: ["users", "me"],
    staleTime: 60 * 1000, // 60 Seconds
    queryFn: () => {
      return getLoggedInUser();
    },
    retry: false,
  });
};
