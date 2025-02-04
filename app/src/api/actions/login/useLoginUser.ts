import { useMutation } from "@tanstack/react-query";
import { loginUser } from ".";
import { Account } from "../../../types/account";

export const useLoginUser = () => {
  return useMutation({
    mutationFn: (user: Pick<Account, "email" | "password">) => {
      return loginUser(user);
    },
  });
};
