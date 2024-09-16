import { useQuery } from "@tanstack/react-query";
import { listSentFriendRequests } from ".";

export const useListSentFriendRequests = () => {
  return useQuery({
    queryKey: ["friends", "requests", "sent"],
    staleTime: 60 * 1000, // 60 Seconds
    queryFn: () => {
      return listSentFriendRequests();
    },
    retry: false,
  });
};
