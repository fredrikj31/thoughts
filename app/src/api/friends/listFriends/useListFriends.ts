import { useQuery } from "@tanstack/react-query";
import { listFriends } from ".";

export const useListFriends = () => {
  return useQuery({
    queryKey: ["friends"],
    staleTime: 60 * 1000, // 60 Seconds
    queryFn: () => {
      return listFriends();
    },
    retry: false,
  });
};
