import { FastifyPluginAsync } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { ProfileSchema } from "../../types/profiles";
import { validateJwt } from "../../hooks/validateJwt";
import { UnauthorizedError } from "../../errors/client";
import { getUserProfileByIdHandler } from "./handlers/getUserProfileById";
import { getUserProfileByUsernameHandler } from "./handlers/getUserProfileByUsername";

export const profilesRoutes: FastifyPluginAsync = async (instance) => {
  const app = instance.withTypeProvider<ZodTypeProvider>();
  const database = instance.database;

  app.get(
    "/me",
    {
      onRequest: validateJwt(),
      schema: {
        summary: "Get user information",
        description: "Gets logged in users information",
        tags: ["profiles"],
        security: [
          {
            jwt: [""],
          },
        ],
        response: {
          "200": ProfileSchema.omit({
            createdAt: true,
            updatedAt: true,
            deletedAt: true,
          }),
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

      const user = await getUserProfileByIdHandler({ database, userId });
      return res.send(user);
    },
  );

  app.get(
    "/:username",
    {
      onRequest: validateJwt(),
      schema: {
        summary: "Get user profile information",
        description: "Gets specific user profile information",
        tags: ["profiles"],
        security: [
          {
            jwt: [""],
          },
        ],
        params: z.object({
          username: z.string(),
        }),
        response: {
          "200": ProfileSchema.omit({
            createdAt: true,
            updatedAt: true,
            deletedAt: true,
          }),
        },
      },
    },
    async (req, res) => {
      const { username } = req.params;
      const user = await getUserProfileByUsernameHandler({
        database,
        username,
      });
      return res.send(user);
    },
  );
};
