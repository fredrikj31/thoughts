import { apiClient } from "../../apiClient";
import { FriendRequest, FriendRequestSchema } from "../../../types/friend";

interface DeleteFriendRequestOptions {
  requestId: string;
}

export const deleteFriendRequest = async ({
  requestId,
}: DeleteFriendRequestOptions): Promise<FriendRequest> => {
  try {
    const { data } = await apiClient.delete(`/friends/requests/${requestId}`);
    return FriendRequestSchema.parse(data);
  } catch (error) {
    console.error("Failed to delete friend request", error);
    throw error;
  }
};
