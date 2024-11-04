import { apiClient } from "../../apiClient";
import { PostWithUser, PostWithUserSchema } from "../../../types/post";

export const listPosts = async (): Promise<PostWithUser[]> => {
  try {
    const { data } = await apiClient.get("/posts");
    return PostWithUserSchema.array().parse(data);
  } catch (error) {
    console.error("Failed to list posts", error);
    throw error;
  }
};
