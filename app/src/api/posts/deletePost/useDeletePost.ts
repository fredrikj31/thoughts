import { useMutation } from "@tanstack/react-query";
import { deletePost } from ".";

export const useDeletePost = () => {
  return useMutation({
    mutationFn: ({ postId }: { postId: string }) => {
      return deletePost({ postId });
    },
  });
};
