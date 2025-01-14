import { apiClient } from "../../apiClient";
import { Profile, ProfileSchema } from "../../../types/profile";

export const getLoggedInUser = async (): Promise<Profile> => {
  try {
    const { data } = await apiClient.get("/users/me");
    return ProfileSchema.parse(data);
  } catch (error) {
    console.error("Failed to get logged in user", error);
    throw error;
  }
};
