import { apiClient } from "../../apiClient";
import { Post, PostSchema } from "../../../types/post";

interface DeletePostOptions {
  postId: string;
}

export const deletePost = async ({
  postId,
}: DeletePostOptions): Promise<Post> => {
  try {
    const { data } = await apiClient.delete(`/posts/${postId}`);
    return PostSchema.parse(data);
  } catch (error) {
    console.error("Failed to delete post", error);
    throw error;
  }
};
