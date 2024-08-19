import { useQuery } from "@tanstack/react-query";
import { getLoggedInUser } from ".";

export const useGetLoggedInUser = () => {
  return useQuery({
    queryKey: ["users", "me"],
    queryFn: () => {
      return getLoggedInUser();
    },
  });
};
