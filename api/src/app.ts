import Fastify, { FastifyInstance } from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifyCors from "@fastify/cors";
import fastifyCookie from "@fastify/cookie";
import fastifyMultipart from "@fastify/multipart";
import { swaggerConfig } from "./plugins/swagger";
import { config } from "./config";
import { logger } from "./logger";
import { BaseError } from "./errors";
import { routes } from "./routes";
import { databasePlugin } from "./services/database/client";
import { ZodError } from "zod";

const app: FastifyInstance = Fastify({
  logger: true,
});

app
  .register(fastifySwagger, swaggerConfig)
  .register(import("@scalar/fastify-api-reference"), {
    routePrefix: "/docs",
  })
  .register(fastifyCors, {
    origin: config.website.baseUrl,
    methods: ["GET", "POST", "PUT", "DELETE"],
    maxAge: 86400,
    credentials: true,
  })
  .register(fastifyCookie, {
    parseOptions: {
      path: "/",
      sameSite: true,
    },
  })
  .register(fastifyMultipart)
  .register(databasePlugin, {
    dbHost: config.database.host,
    dbPort: config.database.port,
    dbUser: config.database.user,
    dbPassword: config.database.password,
    dbName: config.database.name,
  })
  .after(() => {
    app.register(routes, { prefix: "/api" });
  });

app.setErrorHandler((error, _, res) => {
  // Catch all BaseErrors and send back their payload
  if (error instanceof BaseError) {
    return res.status(error.statusCode).send(error.toJSON());
  }

  // Catch Zod Type Provider errors and send back BadRequestError
  if (error instanceof ZodError) {
    return res.status(400).send({
      code: "invalid-request-payload",
      message: "Invalid payload sent with request",
      issues: error.issues,
    });
  }

  if (error.code === "FST_ERR_VALIDATION") {
    return res.status(400).send({
      code: "invalid-request-payload",
      message: "Invalid payload sent with request",
      issues: error.validation?.[0]?.params.issue,
    });
  }

  // If any other error occurs, catch it and return a fixed error message
  logger.fatal({ error }, "Unknown error occurred");
  return res.status(500).send({
    code: "unknown-error",
    message: "An unknown error occurred",
  });
});

app.listen({ host: "0.0.0.0", port: config.api.port }, (err: Error | null) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});

process.on("SIGINT", () => {
  app.log.warn(`SIGINT signal detected, terminating service`);
  app.close();
});

process.on("SIGTERM", () => {
  app.log.warn(`SIGTERM signal detected, terminating service`);
  app.close();
});

declare module "fastify" {
  interface FastifyRequest {
    user?: {
      id: string;
    };
  }
}
