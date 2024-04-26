import { FastifyPluginAsync } from "fastify";
import {
  ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { UserSchema } from "../../types/user";
import { signupHandler } from "./handlers/signup";

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
};
