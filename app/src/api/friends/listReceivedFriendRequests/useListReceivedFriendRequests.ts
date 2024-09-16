import { useQuery } from "@tanstack/react-query";
import { listReceivedFriendRequests } from ".";

export const useListReceivedFriendRequests = () => {
  return useQuery({
    queryKey: ["friends", "requests", "received"],
    staleTime: 60 * 1000, // 60 Seconds
    queryFn: () => {
      return listReceivedFriendRequests();
    },
    retry: false,
  });
};
