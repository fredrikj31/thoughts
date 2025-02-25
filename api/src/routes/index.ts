import { FastifyPluginAsync } from "fastify";
import {
  validatorCompiler,
  serializerCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import { z } from "zod";
import { actionRoutes } from "./actions";
import { profilesRoutes } from "./profiles";
import { friendsRoutes } from "./friends";
import { postsRoutes } from "./posts";
import { accountsRoutes } from "./accounts";
import { uploadsRoutes } from "./uploads";

export const routes: FastifyPluginAsync = async (instance) => {
  instance.setValidatorCompiler(validatorCompiler);
  instance.setSerializerCompiler(serializerCompiler);

  instance.register(actionRoutes, { prefix: "/" });
  instance.register(accountsRoutes, { prefix: "/accounts" });
  instance.register(profilesRoutes, { prefix: "/profiles" });
  instance.register(friendsRoutes, { prefix: "/friends" });
  instance.register(postsRoutes, { prefix: "/posts" });
  instance.register(uploadsRoutes, { prefix: "/uploads" });

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
