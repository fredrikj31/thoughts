import Fastify, { FastifyInstance } from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyCors from "@fastify/cors";
import fastifyCookie from "@fastify/cookie";
import { swaggerConfig, swaggerUiConfig } from "./plugins/swagger";
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
  .register(fastifySwaggerUi, swaggerUiConfig)
  .register(fastifyCors, {
    origin: config.website.baseUrl,
    methods: ["GET", "POST"],
    maxAge: 86400,
    credentials: true,
  })
  .register(fastifyCookie, {
    parseOptions: {
      path: "/",
      sameSite: true,
    },
  })
  .register(databasePlugin, {
    dbHost: config.database.host,
    dbPort: config.database.port,
    dbUser: config.database.user,
    dbPassword: config.database.password,
    dbName: config.database.name,
  })
  .after(() => {
    app.register(routes);
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

  // If any other error occurs, catch it and return a fixed error message
  logger.fatal({ error }, "Unknown error occurred");
  return res.status(500).send({
    code: "unknown-error",
    message: "An unknown error occurred",
  });
});

app.listen(
  { port: config.api.port, host: config.api.host },
  (err: Error | null) => {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }
  },
);

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
