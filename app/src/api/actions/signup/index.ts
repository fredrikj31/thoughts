import { z } from "zod";
import { apiClient } from "../../apiClient";
import { Profile, ProfileSchema } from "../../../types/profile";
import { Account, AccountSchema } from "../../../types/account";

export const signupUser = async (
  user: Pick<Account, "email" | "password"> &
    Omit<Profile, "userId" | "createdAt" | "updatedAt" | "deletedAt">,
): Promise<
  Pick<Account, "userId" | "email"> &
    Omit<Profile, "userId" | "createdAt" | "updatedAt" | "deletedAt">
> => {
  try {
    const { data } = await apiClient.post("/signup", user);
    return z
      .object({
        ...AccountSchema.pick({ userId: true, email: true }).shape,
        ...ProfileSchema.omit({
          userId: true,
          createdAt: true,
          updatedAt: true,
          deletedAt: true,
        }).shape,
      })
      .parse(data);
  } catch (error) {
    console.error("Failed to sign up user", error);
    throw error;
  }
};
