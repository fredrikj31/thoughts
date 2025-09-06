import { FastifyDynamicSwaggerOptions } from "@fastify/swagger";
import { jsonSchemaTransform } from "fastify-type-provider-zod";
import { config } from "../config";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const normalizeFileFields = (obj: Record<string, any>) => {
  let routeContainsFile = false;

  if (
    // eslint-disable-next-line no-prototype-builtins
    obj.hasOwnProperty("consumes") &&
    obj.consumes.includes("multipart/form-data")
  ) {
    routeContainsFile = true;
  }

  for (const key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      if (key === "body" && routeContainsFile) {
        obj[key] = {
          type: "object",
          required: ["file"],
          properties: {
            file: { type: "file" },
          },
        };
      } else {
        normalizeFileFields(obj[key]);
      }
    }
  }

  return obj;
};

export const swaggerConfig: FastifyDynamicSwaggerOptions = {
  mode: "dynamic",
  swagger: {
    info: {
      title: "Thoughts API",
      description: 'The main and only API behind "thoughts"',
      version: "0.0.1",
    },
    externalDocs: {
      url: "https://github.com/fredrikj31/thoughts",
      description: "Find more info here",
    },
    host: `127.0.0.1:${config.api.port}`,
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
    securityDefinitions: {
      jwt: {
        type: "apiKey",
        name: "Authorization",
        in: "header",
      },
    },
  },
  transform: (data) => {
    const jsonSchema = jsonSchemaTransform(data);

    normalizeFileFields(jsonSchema.schema);

    return jsonSchema;
  },
};
