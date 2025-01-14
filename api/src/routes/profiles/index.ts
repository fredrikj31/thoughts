import { FastifyPluginAsync } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { ProfileSchema } from "../../types/profiles";
import { validateJwt } from "../../hooks/validateJwt";
import { UnauthorizedError } from "../../errors/client";
import { getUserProfileHandler } from "./handlers/getUserProfile";

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

      const user = await getUserProfileHandler({ database, userId });
      return res.send(user);
    },
  );
};
