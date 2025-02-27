import { useMutation } from "@tanstack/react-query";
import { uploadProfilePicture } from ".";

export const useUploadProfilePicture = () => {
  return useMutation({
    mutationFn: ({ profilePicture }: { profilePicture: File }) => {
      return uploadProfilePicture({ profilePicture });
    },
  });
};
