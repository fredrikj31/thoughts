import cookies from "js-cookie";
import { apiClient } from "../../apiClient";

export const logoutUser = async (): Promise<void> => {
  const refreshToken = cookies.get("refresh_token");
  try {
    return await apiClient.post("/logout", {
      refreshToken,
    });
  } catch (error) {
    console.error("Failed to logout user", error);
    throw error;
  }
};
