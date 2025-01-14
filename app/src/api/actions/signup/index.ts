import { apiClient } from "../../apiClient";
import { Profile, ProfileSchema } from "../../../types/profile";

export const signupUser = async (
  user: Omit<Profile, "id">,
): Promise<Profile> => {
  try {
    const { data } = await apiClient.post("/signup", user);
    return ProfileSchema.parse(data);
  } catch (error) {
    console.error("Failed to sign up user", error);
    throw error;
  }
};
