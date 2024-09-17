import { useMutation } from "@tanstack/react-query";
import { createPost } from ".";

export const useCreatePost = () => {
  return useMutation({
    mutationFn: ({ content }: { content: string }) => {
      return createPost({ content });
    },
  });
};
