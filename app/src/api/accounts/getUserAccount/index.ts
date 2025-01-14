import { apiClient } from "../../apiClient";
import { Account, AccountSchema } from "../../../types/account";

export const getUserAccount = async (): Promise<
  Pick<Account, "userId" | "email">
> => {
  try {
    const { data } = await apiClient.get("/accounts/me");
    return AccountSchema.pick({ userId: true, email: true }).parse(data);
  } catch (error) {
    console.error("Failed to get user account details", error);
    throw error;
  }
};
