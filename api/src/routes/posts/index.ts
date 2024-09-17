import { FastifyPluginAsync } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { validateJwt } from "../../hooks/validateJwt";
import z from "zod";
import { UnauthorizedError } from "../../errors/client";
import { createPostHandler } from "./handlers/createPost";
import { PostSchema } from "../../types/post";
import { ApiErrorSchema } from "../../types/error";

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

      const post = await createPostHandler({ database, userId, content });
      return res.send(post);
    },
  );
};
