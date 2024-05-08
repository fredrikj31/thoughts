import { apiClient } from "../../apiClient";
import { User, UserSchema } from "../../../types/user";

export const signupUser = async (user: User): Promise<User> => {
  try {
    const { data } = await apiClient.post("/auth/signup", user);
    return UserSchema.parse(data);
  } catch (error) {
    console.error("Failed to sign up user", error);
    throw error;
  }
};
