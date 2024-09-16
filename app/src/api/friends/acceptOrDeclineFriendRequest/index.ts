import { apiClient } from "../../apiClient";
import { FriendRequest, FriendRequestSchema } from "../../../types/friend";

interface AcceptOrDeclineFriendRequestOptions {
  requestId: string;
  status: "accepted" | "declined";
}

export const acceptOrDeclineFriendRequest = async ({
  requestId,
  status,
}: AcceptOrDeclineFriendRequestOptions): Promise<FriendRequest> => {
  try {
    const { data } = await apiClient.put(`/friends/requests/${requestId}`, {
      status,
    });
    return FriendRequestSchema.parse(data);
  } catch (error) {
    console.error("Failed to accept or decline friend request", error);
    throw error;
  }
};
