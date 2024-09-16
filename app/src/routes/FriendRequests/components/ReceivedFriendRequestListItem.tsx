import { Button } from "@shadcn-ui/components/ui/button";
import { ReceivedFriendRequestWithUser } from "../../../types/friend";
import { DateTime } from "luxon";
import { useAcceptOrDeclineFriendRequest } from "../../../api/friends/acceptOrDeclineFriendRequest/useAcceptOrDeclineFriendRequest";
import { useToast } from "@shadcn-ui/components/ui/use-toast";

interface ReceivedFriendRequestListItemProps {
  friendRequest: ReceivedFriendRequestWithUser;
  refetchFriendRequests: () => void;
}

export const ReceivedFriendRequestListItem = ({
  friendRequest,
  refetchFriendRequests,
}: ReceivedFriendRequestListItemProps) => {
  const { toast } = useToast();
  const { mutate: acceptOrDeclineFriendRequest } =
    useAcceptOrDeclineFriendRequest();

  const acceptFriendRequest = () => {
    acceptOrDeclineFriendRequest(
      {
        requestId: friendRequest.id,
        status: "accepted",
      },
      {
        onSuccess: () => {
          toast({
            title: "Accepted friend request 🎉",
            description: `Accepted friend request from @${friendRequest.sender.username}`,
          });
          refetchFriendRequests();
        },
        onError: () => {
          toast({
            title: "Error :(",
            description: `Error while accepting friend request from @${friendRequest.sender.username}`,
            variant: "destructive",
          });
        },
      },
    );
  };

  const declineFriendRequest = () => {
    acceptOrDeclineFriendRequest(
      {
        requestId: friendRequest.id,
        status: "declined",
      },
      {
        onSuccess: () => {
          toast({
            title: "Declined friend request 😢",
            description: `Declined friend request from @${friendRequest.sender.username}`,
          });
          refetchFriendRequests();
        },
        onError: () => {
          toast({
            title: "Error :(",
            description: `Error while declining friend request from @${friendRequest.sender.username}`,
            variant: "destructive",
          });
        },
      },
    );
  };

  return (
    <div className="w-full h-20 rounded dark:bg-zinc-900 bg-zinc-100 flex flex-row justify-between p-4 items-center">
      <div className="flex flex-col gap-2">
        <span className="text-lg">
          {friendRequest.sender.firstName} {friendRequest.sender.lastName}{" "}
          <span className="font-semibold">
            (@{friendRequest.sender.username})
          </span>
        </span>
        <span>
          Received{" "}
          {DateTime.fromISO(friendRequest.createdAt)
            .setLocale("en")
            .toRelative()}
        </span>
      </div>
      <div className="flex flex-row gap-2">
        <Button
          className="bg-green-400 hover:bg-green-500"
          onClick={acceptFriendRequest}
        >
          Accept
        </Button>
        <Button
          className="bg-red-400 hover:bg-red-500"
          onClick={declineFriendRequest}
        >
          Decline
        </Button>
      </div>
    </div>
  );
};
