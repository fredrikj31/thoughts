import { Input } from "@shadcn-ui/components/ui/input";
import { SentFriendRequestWithUser } from "../../../../../types/friend";
import { Button } from "@shadcn-ui/components/ui/button";

interface SentRequestsTabProps {
  sentFriendRequests: SentFriendRequestWithUser[];
  deleteFriendRequest: ({ requestId }: { requestId: string }) => void;
}

export const SentRequestsTab = ({
  sentFriendRequests,
  deleteFriendRequest,
}: SentRequestsTabProps) => {
  return (
    <div className="flex flex-col gap-4">
      <Input placeholder="Search..." />
      {sentFriendRequests &&
        sentFriendRequests.map((sentFriendRequest) => {
          return (
            <div className="flex flex-row justify-between">
              <div className="flex flex-row gap-4 items-center">
                <div className="size-8 rounded-full bg-zinc-500" />
                <span>
                  {sentFriendRequest.receiver.firstName}{" "}
                  {sentFriendRequest.receiver.lastName} (@
                  {sentFriendRequest.receiver.username})
                </span>
              </div>
              <div className="flex flex-row gap-4">
                <Button
                  className="bg-red-500 hover:bg-red-600"
                  onClick={() =>
                    deleteFriendRequest({
                      requestId: sentFriendRequest.id,
                    })
                  }
                >
                  Cancel
                </Button>
              </div>
            </div>
          );
        })}
    </div>
  );
};
