import { apiClient } from "../../apiClient";
import {
  ReceivedFriendRequestWithUser,
  ReceivedFriendRequestWithUserSchema,
} from "../../../types/friend";

export const listReceivedFriendRequests = async (): Promise<
  ReceivedFriendRequestWithUser[]
> => {
  try {
    const { data } = await apiClient.get("/friends/requests/received");
    return ReceivedFriendRequestWithUserSchema.array().parse(data);
  } catch (error) {
    console.error("Failed to list received friend requests", error);
    throw error;
  }
};
