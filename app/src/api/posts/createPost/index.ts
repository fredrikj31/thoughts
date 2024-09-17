import { apiClient } from "../../apiClient";
import { Post, PostSchema } from "../../../types/post";

interface CreatePostOptions {
  content: string;
}

export const createPost = async ({
  content,
}: CreatePostOptions): Promise<Post> => {
  try {
    const { data } = await apiClient.post(`/posts`, {
      content,
    });
    return PostSchema.parse(data);
  } catch (error) {
    console.error("Failed to create post", error);
    throw error;
  }
};
