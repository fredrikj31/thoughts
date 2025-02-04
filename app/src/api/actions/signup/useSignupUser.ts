import { useMutation } from "@tanstack/react-query";
import { signupUser } from ".";
import { Profile } from "../../../types/profile";
import { Account } from "../../../types/account";

export const useSignupUser = () => {
  return useMutation({
    mutationFn: (
      user: Pick<Account, "email" | "password"> &
        Omit<Profile, "userId" | "createdAt" | "updatedAt" | "deletedAt">,
    ) => {
      return signupUser(user);
    },
  });
};
