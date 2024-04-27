import { FastifyPluginAsync } from "fastify";
import {
  ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { UserSchema } from "../../types/user";
import { signupHandler } from "./handlers/signup";
import z from "zod";
import { loginHandler } from "./handlers/login";
import { tokenHandler } from "./handlers/token";
import { BadRequestError } from "../../errors/client";

export const authRoutes: FastifyPluginAsync = async (instance) => {
  instance.setValidatorCompiler(validatorCompiler);
  instance.setSerializerCompiler(serializerCompiler);

  const app = instance.withTypeProvider<ZodTypeProvider>();
  const database = instance.database;

  app.post(
    "/signup",
    {
      schema: {
        summary: "Signs up a user",
        description: "Signs up the user and creates them in the database",
        tags: ["auth"],
        body: UserSchema.omit({
          id: true,
          passwordSalt: true,
          createdAt: true,
          updatedAt: true,
          deletedAt: true,
        }),
        response: {
          "200": UserSchema.omit({
            id: true,
            passwordSalt: true,
            createdAt: true,
            updatedAt: true,
            deletedAt: true,
          }),
        },
      },
    },
    async (req, res) => {
      const createdUser = await signupHandler({ database, user: req.body });
      return res.send(createdUser);
    },
  );

  app.post(
    "/login",
    {
      schema: {
        summary: "Login a user",
        description: "Logs in the user and returns access & refresh tokens",
        tags: ["auth"],
        body: z.object({
          email: z.string(),
          password: z.string(),
        }),
        response: {
          "200": z.object({
            accessToken: z.string(),
            refreshToken: z.string(),
          }),
        },
      },
    },
    async (req, res) => {
      const userTokens = await loginHandler({
        database,
        credentials: req.body,
      });

      return res.send(userTokens);
    },
  );

  app.post(
    "/token",
    {
      schema: {
        summary: "Refreshes user access token",
        description:
          "Refreshes a user's access token with use of their refresh token",
        tags: ["auth"],
        response: {
          "204": z.void(),
        },
      },
    },
    async (req, res) => {
      // Get refresh token from cookies
      const refreshToken = req.cookies["refresh_token"];
      if (!refreshToken) {
        throw new BadRequestError({
          code: "refresh-token-cookie-not-found",
          message: "Could not find refresh token cookie in the headers",
        });
      }

      // Refreshes access token with access token
      const { accessToken, expiresAt } = await tokenHandler({
        database,
        refreshToken,
      });

      // Sets new access token in the cookies
      res.setCookie("access_token", accessToken, {
        expires: new Date(expiresAt),
      });
      return res.status(204).send();
    },
  );
};
