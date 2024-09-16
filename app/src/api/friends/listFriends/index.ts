import { apiClient } from "../../apiClient";
import { Friend, FriendSchema } from "../../../types/friend";

export const listFriends = async (): Promise<Friend[]> => {
  try {
    const { data } = await apiClient.get("/friends");
    return FriendSchema.array().parse(data);
  } catch (error) {
    console.error("Failed to list friends", error);
    throw error;
  }
};
