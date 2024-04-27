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
};
