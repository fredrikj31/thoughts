import { CommonQueryMethods } from "slonik";
import { getFriendRequestById } from "../../../services/database/queries/friends/getFriendRequestById";
import { UnauthorizedError } from "../../../errors/client";
import { updateFriendRequest } from "../../../services/database/queries/friends/updateFriendRequest";
import { FriendRequest } from "../../../types/friend";

interface DeclineFriendRequestHandlerOptions {
  database: CommonQueryMethods;
  userId: string;
  requestId: string;
}

export const declineFriendRequestHandler = async ({
  database,
  userId,
  requestId,
}: DeclineFriendRequestHandlerOptions): Promise<FriendRequest> => {
  const friendRequest = await getFriendRequestById(database, { requestId });

  if (userId !== friendRequest.receiverId) {
    throw new UnauthorizedError({
      code: "decline-friend-request-received-by-another-user",
      message: "The specified friend received was created by another user",
    });
  }

  const updatedFriendRequest = await updateFriendRequest(database, {
    requestId,
    status: "DECLINED",
  });
  return updatedFriendRequest;
};
