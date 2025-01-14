import { useMutation } from "@tanstack/react-query";
import { signupUser } from ".";
import { Profile } from "../../../types/profile";

export const useSignupUser = () => {
  return useMutation({
    mutationFn: (user: Omit<Profile, "id">) => {
      return signupUser(user);
    },
  });
};
