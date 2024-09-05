import { CommonQueryMethods } from "slonik";
import { FriendRequest } from "../../../types/friend";
import { getFriendRequestByFriendId } from "../../../services/database/queries/friends/getFriendRequestByFriendId";
import { BadRequestError } from "../../../errors/client";
import { createFriendRequest } from "../../../services/database/queries/friends/createFriendRequest";

interface CreateFriendRequestHandlerOptions {
  database: CommonQueryMethods;
  userId: string;
  friendId: string;
}

export const createFriendRequestHandler = async ({
  database,
  userId,
  friendId,
}: CreateFriendRequestHandlerOptions): Promise<FriendRequest> => {
  // TODO: Maybe extra check for if the user is blocked
  const alreadySentFriendRequest = await getFriendRequestByFriendId(database, {
    userId,
    friendId,
  });
  if (alreadySentFriendRequest.length !== 0) {
    throw new BadRequestError({
      code: "user-already-sent-friend-request",
      message: "User has already sent a friend request to that user",
    });
  }

  const alreadyReceivedFriendRequest = await getFriendRequestByFriendId(
    database,
    { userId: friendId, friendId: userId },
  );
  if (alreadyReceivedFriendRequest.length !== 0) {
    throw new BadRequestError({
      code: "user-already-received-friend-request",
      message: "User has already received a friend request from that user",
    });
  }

  if (userId === friendId) {
    throw new BadRequestError({
      code: "friend-request-matching-user-friend-id",
      message: "User and friend id are matching and therefore invalid",
    });
  }

  const friendRequest = await createFriendRequest(database, {
    userId,
    friendId,
  });

  return friendRequest;
};
