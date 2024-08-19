import axios, { AxiosError } from "axios";
import cookies from "js-cookie";
import { ApiError } from "../../errors";
import { config } from "../../../config";

export const refreshToken = async (): Promise<void> => {
  const refreshToken = cookies.get("refresh_token");
  try {
    await axios.post(
      "/auth/token",
      {
        // Should not use the apiClient, because it has the auth interceptor on it, and will cause infinite loop
        refreshToken,
      },
      {
        baseURL: config.api.baseUrl,
        withCredentials: true,
      },
    );
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 400) {
        throw new ApiError({
          statusCode: 400,
          code: "refresh-token-not-found",
          message: "The refresh token was not found in the request",
        });
      }
    }

    throw new ApiError({
      statusCode: 500,
      code: "unknown-error",
      message: "Unknown error while trying to refresh token.",
    });
  }
};
