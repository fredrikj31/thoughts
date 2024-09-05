import { CommonQueryMethods } from "slonik";
import { FriendRequest } from "../../../types/friend";
import { getFriendRequestById } from "../../../services/database/queries/friends/getFriendRequestById";
import { UnauthorizedError } from "../../../errors/client";
import { deleteFriendRequest } from "../../../services/database/queries/friends/deleteFriendRequest";

interface DeleteFriendRequestHandlerOptions {
  database: CommonQueryMethods;
  userId: string;
  requestId: string;
}

export const deleteFriendRequestHandler = async ({
  database,
  userId,
  requestId,
}: DeleteFriendRequestHandlerOptions): Promise<FriendRequest> => {
  const friendRequest = await getFriendRequestById(database, { requestId });

  if (userId !== friendRequest.senderId) {
    throw new UnauthorizedError({
      code: "friend-request-created-by-another-user",
      message: "The specified friend request was created by another user",
    });
  }

  const deletedFriendRequest = await deleteFriendRequest(database, {
    requestId,
  });
  return deletedFriendRequest;
};
