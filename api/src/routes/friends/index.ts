import { FastifyPluginAsync } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { validateJwt } from "../../hooks/validateJwt";
import { FriendWithUserSchema } from "../../types/friend";
import { UnauthorizedError } from "../../errors/client";
import { listFriendsHandler } from "./handlers/listFriends";
import { ApiErrorSchema } from "../../types/error";
import { z } from "zod";

export const friendsRoutes: FastifyPluginAsync = async (instance) => {
  const app = instance.withTypeProvider<ZodTypeProvider>();
  const database = instance.database;

  app.get(
    "/",
    {
      onRequest: [validateJwt],
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
        querystring: z.object({
          pageToken: z
            .string()
            .optional()
            .describe("Page token used to get results for the next page."),
          limit: z.coerce
            .number()
            .optional()
            .default(10)
            .describe("Number of results returned on each page."),
        }),
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
      const { pageToken, limit } = req.query;
      if (!userId) {
        throw new UnauthorizedError({
          code: "user-id-not-found-in-request",
          message: "A user id wasn't found in the request object",
        });
      }

      const userFriends = await listFriendsHandler({
        database,
        userId,
        pageToken,
        limit,
      });
      return res.send([...userFriends]);
    },
  );
};
