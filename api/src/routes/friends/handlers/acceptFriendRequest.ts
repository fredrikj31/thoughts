import { CommonQueryMethods } from "slonik";
import { getFriendRequestById } from "../../../services/database/queries/friends/getFriendRequestById";
import { UnauthorizedError } from "../../../errors/client";
import { updateFriendRequest } from "../../../services/database/queries/friends/updateFriendRequest";
import { createFriend } from "../../../services/database/queries/friends/createFriend";
import { FriendRequest } from "../../../types/friend";

interface AcceptFriendRequestHandlerOptions {
  database: CommonQueryMethods;
  userId: string;
  requestId: string;
}

export const acceptFriendRequestHandler = async ({
  database,
  userId,
  requestId,
}: AcceptFriendRequestHandlerOptions): Promise<FriendRequest> => {
  const friendRequest = await getFriendRequestById(database, { requestId });

  if (userId !== friendRequest.receiverId) {
    throw new UnauthorizedError({
      code: "accept-friend-request-received-by-another-user",
      message: "The specified friend received was created by another user",
    });
  }

  return database.transaction(async (transaction) => {
    const updatedFriendRequest = await updateFriendRequest(transaction, {
      requestId,
      status: "ACCEPTED",
    });

    await createFriend(transaction, {
      userId: friendRequest.senderId,
      friendId: friendRequest.receiverId,
    });
    await createFriend(transaction, {
      userId: friendRequest.receiverId,
      friendId: friendRequest.senderId,
    });

    return updatedFriendRequest;
  });
};
