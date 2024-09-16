import { Button } from "@shadcn-ui/components/ui/button";
import { SentFriendRequestWithUser } from "../../../types/friend";
import { DateTime } from "luxon";
import { useDeleteFriendRequest } from "../../../api/friends/deleteFriendRequest/useDeleteFriendRequest";
import { useToast } from "@shadcn-ui/components/ui/use-toast";

interface SentFriendRequestListItemProps {
  friendRequest: SentFriendRequestWithUser;
  refetchFriendRequests: () => void;
}

export const SentFriendRequestListItem = ({
  friendRequest,
  refetchFriendRequests,
}: SentFriendRequestListItemProps) => {
  const { toast } = useToast();
  const { mutate: deleteFriendRequest } = useDeleteFriendRequest();

  const deleteFriendRequestAction = () => {
    deleteFriendRequest(
      {
        requestId: friendRequest.id,
      },
      {
        onSuccess: () => {
          toast({
            title: "Deleted friend request ✅",
            description: `Deleted friend request to @${friendRequest.receiver.username}`,
          });
          refetchFriendRequests();
        },
        onError: () => {
          toast({
            title: "Error :(",
            description: `Error while deleting friend request to @${friendRequest.receiver.username}`,
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
          {friendRequest.receiver.firstName} {friendRequest.receiver.lastName}{" "}
          <span className="font-semibold">
            (@{friendRequest.receiver.username})
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
          className="bg-red-400 hover:bg-red-500"
          onClick={deleteFriendRequestAction}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};
