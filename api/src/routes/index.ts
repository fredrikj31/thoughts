import { FastifyPluginAsync } from "fastify";
import {
  validatorCompiler,
  serializerCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import { z } from "zod";
import { authRoutes } from "./auth";
import { usersRoutes } from "./users";
import { friendsRoutes } from "./friends";

export const routes: FastifyPluginAsync = async (instance) => {
  instance.setValidatorCompiler(validatorCompiler);
  instance.setSerializerCompiler(serializerCompiler);

  instance.register(authRoutes, { prefix: "/auth" });
  instance.register(usersRoutes, { prefix: "/users" });
  instance.register(friendsRoutes, { prefix: "/friends" });

  const app = instance.withTypeProvider<ZodTypeProvider>();

  app.get(
    "/ping",
    {
      schema: {
        summary: "Ping Pong Endpoint",
        description: "Pings the server, to test the connection",
        tags: ["ping"],
        response: {
          "200": z.object({ ok: z.boolean() }),
        },
      },
    },
    async (_, res) => {
      return res.send({ ok: true });
    },
  );
};
