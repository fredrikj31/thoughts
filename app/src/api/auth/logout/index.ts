import { apiClient } from "../../apiClient";

export const logoutUser = async (): Promise<void> => {
  try {
    return await apiClient.post("/auth/logout");
  } catch (error) {
    console.error("Failed to logout user", error);
    throw error;
  }
};
