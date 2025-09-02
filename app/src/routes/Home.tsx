import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@shadcn-ui/components/ui/card";
import { Navbar } from "../components/Navbar";
import { Post } from "../components/Post";
import { Textarea } from "@shadcn-ui/components/ui/textarea";
import { Button } from "@shadcn-ui/components/ui/button";
import { useState } from "react";
import { useCreatePost } from "../api/posts/createPost/useCreatePost";
import { useToast } from "@shadcn-ui/components/ui/use-toast";
import { useListPosts } from "../api/posts/listPosts/useListPosts";
import { useQueryClient } from "@tanstack/react-query";

export const HomePage = () => {
  const maxPostContentLength = 500;
  const queryClient = useQueryClient();
  const [content, setContent] = useState<string>("");
  const { toast } = useToast();

  const { data: posts } = useListPosts();
  const { mutate: createPost } = useCreatePost();

  const createPostAction = () => {
    if (!content || content.length === 0) {
      toast({
        title: "Empty thoughts?",
        description: "Please fill out the form before posting",
      });
      return;
    }

    createPost(
      { content },
      {
        onError: () => {
          toast({
            title: "Error",
            description: "Error while posting your post",
            variant: "destructive",
          });
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["posts"] });
          toast({
            title: "Success",
            description: "Successfully created your post",
            variant: "default",
          });
          setContent("");
        },
      },
    );
  };

  return (
    <div className="flex flex-col mg:gap-7 gap-4 container">
      <Navbar />
      {/* Create Post Form */}
      <div className="flex self-center max-w-3xl w-full">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Create Post</CardTitle>
            <CardDescription>What's currently on your mind?</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              maxLength={maxPostContentLength}
              placeholder="Lorem Ipsum..."
              value={content}
              onChange={(e) => setContent(e.currentTarget.value)}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <span>
              {content.split("").length} of {maxPostContentLength} characters
            </span>
            <Button onClick={createPostAction}>Post</Button>
          </CardFooter>
        </Card>
      </div>
      {/* Feed */}
      <div className="flex flex-col self-center max-w-3xl w-full gap-4">
        {/* Post */}
        {posts?.map((post) => <Post key={post.id} post={post} />)}
      </div>
    </div>
  );
};
