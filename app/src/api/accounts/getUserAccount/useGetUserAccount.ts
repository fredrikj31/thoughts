import { useQuery } from "@tanstack/react-query";
import { getUserAccount } from ".";

export const useGetUserAccount = () => {
  return useQuery({
    queryKey: ["accounts", "me"],
    staleTime: 60 * 1000, // 60 Seconds
    queryFn: () => {
      return getUserAccount();
    },
    retry: false,
  });
};
