import { useQuery } from "@tanstack/react-query";
import { listPosts } from ".";

export const useListPosts = () => {
  return useQuery({
    queryKey: ["posts"],
    staleTime: 60 * 1000, // 60 Seconds
    queryFn: () => {
      return listPosts();
    },
    retry: false,
  });
};
