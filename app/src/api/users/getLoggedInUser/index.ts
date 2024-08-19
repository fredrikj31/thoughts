import { apiClient } from "../../apiClient";
import { User, UserSchema } from "../../../types/user";

export const getLoggedInUser = async (): Promise<User> => {
  try {
    const { data } = await apiClient.get("/users/me");
    return UserSchema.parse(data);
  } catch (error) {
    console.error("Failed to get logged in user", error);
    throw error;
  }
};
