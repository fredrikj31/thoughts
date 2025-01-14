import { apiClient } from "../../apiClient";
import { Account } from "../../../types/account";

export const loginUser = async (
  user: Pick<Account, "email" | "password">,
): Promise<void> => {
  try {
    await apiClient.post("/login", user);
  } catch (error) {
    console.error("Failed to login user", error);
    throw error;
  }
};
