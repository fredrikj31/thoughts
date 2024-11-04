import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@shadcn-ui/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@shadcn-ui/components/ui/card";
import { Link } from "react-router-dom";
import { Heart, MessageSquareText, ThumbsUp } from "lucide-react";
import { PostWithUser } from "../../types/post";
import { formatRelative } from "date-fns";

interface PostProps {
  post: PostWithUser;
}

export const Post = ({ post }: PostProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row items-center gap-2">
          <Avatar className="size-10">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <Link
              to={`/profile/${post.user.username}`}
              className="font-semibold text-base hover:text-zinc-300"
            >
              {post.user.firstName} {post.user.lastName} (@{post.user.username})
            </Link>
            <span className="text-sm text-zinc-400">
              {formatRelative(post.updatedAt ?? post.createdAt, new Date(), {
                weekStartsOn: 1,
              })}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p>{post.content}</p>
        <div className="flex flex-row justify-evenly gap-4 w-full flex-wrap">
          <img
            className="size-full rounded-lg aspect-video flex-[1_0_40%]"
            src="https://placehold.co/250x140"
          />
          <img
            className="size-full rounded-lg aspect-video flex-[1_0_40%]"
            src="https://placehold.co/250x140"
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-row justify-between">
        <div className="flex flex-row gap-2">
          <button className="group">
            <ThumbsUp className="size-6 group-hover:text-zinc-600 dark:group-hover:text-zinc-300" />
          </button>
          <button className="group">
            <Heart className="size-6 group-hover:text-zinc-600 dark:group-hover:text-zinc-300" />
          </button>
        </div>
        <Link to={`/post/uggabugga`} className="group flex flex-row gap-2">
          <MessageSquareText className="size-6 group-hover:text-zinc-600 dark:group-hover:text-zinc-300" />
          <span className="group-hover:text-zinc-600 dark:group-hover:text-zinc-300">
            2 comments
          </span>
        </Link>
      </CardFooter>
    </Card>
  );
};
