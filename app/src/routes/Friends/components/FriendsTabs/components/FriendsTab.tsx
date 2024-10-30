import { Input } from "@shadcn-ui/components/ui/input";
import { Friend } from "../../../../../types/friend";

interface FriendsTabProps {
  friends: Friend[];
}

export const FriendsTab = ({ friends }: FriendsTabProps) => {
  return (
    <div className="flex flex-col gap-4">
      <Input placeholder="Search..." />
      {friends &&
        friends.map((friend) => {
          return (
            <div className="flex flex-row items-center gap-4">
              <div className="size-8 rounded-full bg-zinc-500" />
              <span>
                {friend.friend.firstName} {friend.friend.lastName}
              </span>
            </div>
          );
        })}
    </div>
  );
};
