import { apiClient } from "../../apiClient";
import { Profile, ProfileSchema } from "../../../types/profile";

export const getUserProfile = async (): Promise<
  Omit<Profile, "createdAt" | "updatedAt" | "deletedAt">
> => {
  try {
    const { data } = await apiClient.get("/profiles/me");
    return ProfileSchema.omit({
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
    }).parse(data);
  } catch (error) {
    console.error("Failed to get user profile details", error);
    throw error;
  }
};
