import { useMutation } from "@tanstack/react-query";
import { signupUser } from ".";
import { User } from "../../../types/user";

export const useSignupUser = () => {
  return useMutation({
    mutationFn: (user: Omit<User, "id">) => {
      return signupUser(user);
    },
  });
};
