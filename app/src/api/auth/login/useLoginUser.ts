import { useMutation } from "@tanstack/react-query";
import { loginUser } from ".";
import { User } from "../../../types/user";

export const useLoginUser = () => {
  return useMutation({
    mutationFn: (user: Pick<User, "email" | "password">) => {
      return loginUser(user);
    },
  });
};
