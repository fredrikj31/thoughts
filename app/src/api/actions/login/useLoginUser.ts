import { useMutation } from "@tanstack/react-query";
import { loginUser } from ".";
import { Profile } from "../../../types/profile";

export const useLoginUser = () => {
  return useMutation({
    mutationFn: (user: Pick<Profile, "email" | "password">) => {
      return loginUser(user);
    },
  });
};
