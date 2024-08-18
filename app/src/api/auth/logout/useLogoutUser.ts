import { useMutation } from "@tanstack/react-query";
import { logoutUser } from ".";

export const useLogoutUser = () => {
  return useMutation({
    mutationFn: () => {
      return logoutUser();
    },
  });
};
