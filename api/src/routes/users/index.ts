import { FastifyPluginAsync } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { UserSchema } from "../../types/user";
import { validateJwt } from "../../hooks/validateJwt";
import { UnauthorizedError } from "../../errors/client";
import { getUserHandler } from "./handlers/getUser";

export const usersRoutes: FastifyPluginAsync = async (instance) => {
  const app = instance.withTypeProvider<ZodTypeProvider>();
  const database = instance.database;

  app.get(
    "/me",
    {
      onRequest: validateJwt(),
      schema: {
        summary: "Get user information",
        description: "Gets logged in users information",
        tags: ["users"],
        security: [
          {
            jwt: [""],
          },
        ],
        response: {
          "200": UserSchema.omit({
            passwordSalt: true,
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

      const user = await getUserHandler({ database, userId });
      return res.send(user);
    },
  );
};
