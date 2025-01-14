import { FastifyPluginAsync } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { validateJwt } from "../../hooks/validateJwt";
import { UnauthorizedError } from "../../errors/client";
import { AccountSchema } from "../../types/account";
import { getUserAccountHandler } from "./handlers/getUserAccount";

export const accountsRoutes: FastifyPluginAsync = async (instance) => {
  const app = instance.withTypeProvider<ZodTypeProvider>();
  const database = instance.database;

  app.get(
    "/me",
    {
      onRequest: validateJwt(),
      schema: {
        summary: "Get user account details",
        description: "Gets logged in user account details",
        tags: ["accounts"],
        security: [
          {
            jwt: [""],
          },
        ],
        response: {
          "200": AccountSchema.omit({
            password: true,
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

      const account = await getUserAccountHandler({ database, userId });
      return res.send(account);
    },
  );
};
