import { useMutation } from "@tanstack/react-query";
import { deleteFriendRequest } from ".";

export const useDeleteFriendRequest = () => {
  return useMutation({
    mutationFn: ({ requestId }: { requestId: string }) => {
      return deleteFriendRequest({ requestId });
    },
  });
};
