import { DateTime } from "luxon";
import { Friend } from "../../../types/friend";

interface FriendListItemProps {
  friend: Friend;
}

export const FriendListItem = ({ friend }: FriendListItemProps) => {
  return (
    <div className="w-1/2 h-20 rounded dark:bg-zinc-900 bg-zinc-100 flex flex-row justify-between p-4 items-center">
      <div className="flex flex-col gap-2">
        <span className="text-lg">
          {friend.friend.firstName} {friend.friend.lastName}{" "}
          <span className="font-semibold">(@{friend.friend.username})</span>
        </span>
        <div className="flex flex-row gap-2">
          <span className="font-semibold">Friends since:</span>
          <span className="italic">
            {DateTime.fromISO(friend.createdAt).setLocale("en").toFormat("DDD")}
          </span>
        </div>
      </div>
    </div>
  );
};
