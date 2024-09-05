import { FastifyPluginAsync } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { validateJwt } from "../../hooks/validateJwt";
import {
  FriendRequestSchema,
  FriendRequestWithUserSchema,
  FriendWithUserSchema,
} from "../../types/friend";
import { UnauthorizedError } from "../../errors/client";
import { listFriendsHandler } from "./handlers/listFriends";
import { ApiErrorSchema } from "../../types/error";
import { listFriendRequestsHandler } from "./handlers/listFriendRequests";
import z from "zod";
import { createFriendRequestHandler } from "./handlers/createFriendRequest";

export const friendsRoutes: FastifyPluginAsync = async (instance) => {
  const app = instance.withTypeProvider<ZodTypeProvider>();
  const database = instance.database;

  app.get(
    "/",
    {
      onRequest: validateJwt(),
      schema: {
        summary: "List user's friends",
        description:
          "Lists user's friends and their user profile with details about them.",
        tags: ["friends"],
        security: [
          {
            jwt: [""],
          },
        ],
        response: {
          "200": FriendWithUserSchema.array().describe(
            "Returns a list of the user's friends, and their user profile.",
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

      const userFriends = await listFriendsHandler({
        database,
        userId,
      });
      return res.send([...userFriends]);
    },
  );

  app.get(
    "/requests",
    {
      onRequest: validateJwt(),
      schema: {
        summary: "List user's friend requests",
        description: "Lists user's friend requests from other users.",
        tags: ["friends"],
        security: [
          {
            jwt: [""],
          },
        ],
        response: {
          "200": FriendRequestWithUserSchema.array().describe(
            "Returns a list of the user's friend requests from other users.",
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

      const userFriendRequests = await listFriendRequestsHandler({
        database,
        userId,
      });
      return res.send([...userFriendRequests]);
    },
  );

  app.post(
    "/requests",
    {
      onRequest: validateJwt(),
      schema: {
        summary: "Creates a new friend request",
        description: "Creates a new friend requests to another user.",
        tags: ["friends"],
        security: [
          {
            jwt: [""],
          },
        ],
        body: z.object({
          friendId: z.string().uuid(),
        }),
        response: {
          "200": FriendRequestSchema,
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

      const { friendId } = req.body;
      const friendRequest = await createFriendRequestHandler({
        database,
        userId,
        friendId,
      });

      return res.status(200).send(friendRequest);
    },
  );
};
