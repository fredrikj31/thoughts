import { FastifyPluginAsync } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { ProfileSchema } from "../../types/profiles";
import { signupHandler } from "./handlers/signup";
import z from "zod";
import { loginHandler } from "./handlers/login";
import { tokenHandler } from "./handlers/token";
import { BadRequestError, NotFoundError } from "../../errors/client";
import { logoutHandler } from "./handlers/logout";
import { AccountSchema } from "../../types/account";

export const actionRoutes: FastifyPluginAsync = async (instance) => {
  const app = instance.withTypeProvider<ZodTypeProvider>();
  const database = instance.database;

  app.post(
    "/signup",
    {
      schema: {
        summary: "Signs up a user",
        description: "Signs up the user and creates them in the database",
        tags: ["actions"],
        body: z.object({
          ...AccountSchema.pick({ email: true, password: true }).shape,
          ...ProfileSchema.omit({
            userId: true,
            createdAt: true,
            updatedAt: true,
            deletedAt: true,
          }).shape,
        }),
        response: {
          "200": z.object({
            ...AccountSchema.pick({ userId: true, email: true }).shape,
            ...ProfileSchema.omit({
              userId: true,
              createdAt: true,
              updatedAt: true,
              deletedAt: true,
            }).shape,
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
        tags: ["actions"],
        body: z.object({
          email: z.string(),
          password: z.string(),
        }),
        response: {
          "204": z.void(),
        },
      },
    },
    async (req, res) => {
      const { accessToken, refreshToken } = await loginHandler({
        database,
        credentials: req.body,
      });

      // Sets access and refresh token in the cookies
      res.setCookie("access_token", accessToken.token, {
        expires: new Date(accessToken.expiresAt),
      });
      res.setCookie("refresh_token", refreshToken.token, {
        expires: new Date(refreshToken.expiresAt),
      });
      return res.status(204).send();
    },
  );

  app.post(
    "/logout",
    {
      schema: {
        summary: "Logouts a user",
        descriptions: "Logouts a user. Deletes refresh token from database",
        tags: ["actions"],
        body: z.object({
          refreshToken: z.string(),
        }),
        response: {
          "401": z.object({
            code: z.string(),
            message: z.string(),
          }),
          "200": z.void(),
        },
      },
    },
    async (req, res) => {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        throw new NotFoundError({
          code: "refresh-token-not-found-in-cookies",
          message: "The refresh token was not found in the request cookies",
        });
      }
      await logoutHandler({ database, refreshToken });

      // Clears access and refresh token cookies
      res.clearCookie("access_token");
      res.clearCookie("refresh_token");

      return res.status(200).send();
    },
  );

  app.post(
    "/token",
    {
      schema: {
        summary: "Refreshes user access token",
        description:
          "Refreshes a user's access token with use of their refresh token",
        tags: ["actions"],
        body: z.object({
          refreshToken: z.string(),
        }),
        response: {
          "400": z.object({
            code: z.string(),
            message: z.string(),
          }),
          "204": z.void(),
        },
      },
    },
    async (req, res) => {
      // Get refresh token from cookies
      const { refreshToken } = req.body;
      if (!refreshToken) {
        throw new BadRequestError({
          code: "refresh-token-body-not-found",
          message: "Could not find refresh token in the body of the request",
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
