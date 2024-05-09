import { apiClient } from "../../apiClient";
import { User } from "../../../types/user";

export const loginUser = async (
  user: Pick<User, "email" | "password">,
): Promise<void> => {
  try {
    await apiClient.post("/auth/login", user);
  } catch (error) {
    console.error("Failed to login user", error);
    throw error;
  }
};
