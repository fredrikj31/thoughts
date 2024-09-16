import { useMutation } from "@tanstack/react-query";
import { acceptOrDeclineFriendRequest } from ".";

export const useAcceptOrDeclineFriendRequest = () => {
  return useMutation({
    mutationFn: ({
      requestId,
      status,
    }: {
      requestId: string;
      status: "accepted" | "declined";
    }) => {
      return acceptOrDeclineFriendRequest({ requestId, status });
    },
  });
};
