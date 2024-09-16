import { apiClient } from "../../apiClient";
import {
  SentFriendRequestWithUser,
  SentFriendRequestWithUserSchema,
} from "../../../types/friend";

export const listSentFriendRequests = async (): Promise<
  SentFriendRequestWithUser[]
> => {
  try {
    const { data } = await apiClient.get("/friends/requests/sent");
    return SentFriendRequestWithUserSchema.array().parse(data);
  } catch (error) {
    console.error("Failed to list sent friend requests", error);
    throw error;
  }
};
