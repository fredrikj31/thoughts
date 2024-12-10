import { FastifyPluginAsync } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { validateJwt } from "../../hooks/validateJwt";
import z from "zod";
import { BadRequestError, UnauthorizedError } from "../../errors/client";
import { createPostHandler } from "./handlers/createPost";
import {
  PostLikeSchema,
  PostSchema,
  PostWithUserSchema,
} from "../../types/post";
import { ApiErrorSchema } from "../../types/error";
import { listPostsHandler } from "./handlers/listPosts";
import { likePostHandler } from "./handlers/likePost";
import { unlikePostHandler } from "./handlers/unlikePost";
import { deletePostHandler } from "./handlers/deletePost";

export const postsRoutes: FastifyPluginAsync = async (instance) => {
  const app = instance.withTypeProvider<ZodTypeProvider>();
  const database = instance.database;

  app.post(
    "/",
    {
      onRequest: validateJwt(),
      schema: {
        summary: "Create a post",
        description: "Create a post for a specific user",
        tags: ["posts"],
        security: [
          {
            jwt: [""],
          },
        ],
        body: z.object({
          content: z.string(),
        }),
        response: {
          "200": PostSchema.describe("Returns newly user created post."),
          "401": ApiErrorSchema.describe(
            "Either is the access token missing, or the user id wasn't found in the access token provided.",
          ),
          "500": ApiErrorSchema.describe(
            "Unknown server error, see logs for more details.",
          ),
        },
      },
    },
    async (req, res) => {
      const userId = req.user?.id;
      if (!userId) {
        throw new UnauthorizedError({
          code: "user-id-not-found-in-request",
          message: "A user id wasn't found in the request object",
        });
      }

      const { content } = req.body;

      const post = await createPostHandler(database, { userId, content });
      return res.send(post);
    },
  );

  app.get(
    "/",
    {
      onRequest: validateJwt(),
      schema: {
        summary: "Lists posts for a specific user",
        description:
          "This endpoint generates the personalized posts feed for the specific user.",
        tags: ["posts"],
        security: [
          {
            jwt: [""],
          },
        ],
        response: {
          "200": PostWithUserSchema.array().describe(
            "Returns posts from user's friends and themselves.",
          ),
          "401": ApiErrorSchema.describe(
            "Either is the access token missing, or the user id wasn't found in the access token provided.",
          ),
          "500": ApiErrorSchema.describe(
            "Unknown server error, see logs for more details.",
          ),
        },
      },
    },
    async (req, res) => {
      const userId = req.user?.id;
      if (!userId) {
        throw new UnauthorizedError({
          code: "user-id-not-found-in-request",
          message: "A user id wasn't found in the request object",
        });
      }

      const posts = await listPostsHandler(database, { userId });
      return res.send(posts);
    },
  );

  app.delete(
    "/:postId",
    {
      onRequest: validateJwt(),
      schema: {
        summary: "Deletes posts for a specific user",
        description: "Deletes a specific post from a user",
        tags: ["posts"],
        security: [
          {
            jwt: [""],
          },
        ],
        params: z.object({
          postId: z.string().uuid(),
        }),
        response: {
          "200": PostSchema.describe("Returns deleted post"),
          "401": ApiErrorSchema.describe(
            "Either is the access token missing, or the user id wasn't found in the access token provided.",
          ),
          "500": ApiErrorSchema.describe(
            "Unknown server error, see logs for more details.",
          ),
        },
      },
    },
    async (req, res) => {
      const userId = req.user?.id;
      if (!userId) {
        throw new UnauthorizedError({
          code: "user-id-not-found-in-request",
          message: "A user id wasn't found in the request object",
        });
      }

      const { postId } = req.params;

      const deletedPost = await deletePostHandler(database, { userId, postId });
      return res.send(deletedPost);
    },
  );

  app.put(
    "/:postId/likes",
    {
      onRequest: validateJwt(),
      schema: {
        summary: "Like/Unlike a specific post",
        description: "Likes/Unlikes a specific post from a user.",
        tags: ["posts"],
        security: [
          {
            jwt: [""],
          },
        ],
        params: z.object({
          postId: z.string().uuid(),
        }),
        body: z.object({
          status: z.enum(["like", "unlike"]),
        }),
        response: {
          "200": PostLikeSchema.describe("Returns like/unlike item."),
          "401": ApiErrorSchema.describe(
            "Either is the access token missing, or the user id wasn't found in the access token provided.",
          ),
          "500": ApiErrorSchema.describe(
            "Unknown server error, see logs for more details.",
          ),
        },
      },
    },
    async (req, res) => {
      const userId = req.user?.id;
      if (!userId) {
        throw new UnauthorizedError({
          code: "user-id-not-found-in-request",
          message: "A user id wasn't found in the request object",
        });
      }

      const { postId } = req.params;
      const { status } = req.body;

      switch (status) {
        case "like": {
          const likedPost = await likePostHandler(database, { postId, userId });
          return res.send(likedPost);
        }
        case "unlike": {
          const unlikedPost = await unlikePostHandler(database, {
            postId,
            userId,
          });
          return res.send(unlikedPost);
        }
        default: {
          throw new BadRequestError({
            code: "invalid-status-type",
            message: "The provided status is not valid",
          });
        }
      }
    },
  );
};
