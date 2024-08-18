import { config as dotEnvConfig } from "dotenv";
import { z } from "zod";

// Load .env file from root
dotEnvConfig({ path: "../.env" });

const envVarsSchema = z.object({
  API_HOST: z.string().default("0.0.0.0"),
  API_PORT: z.coerce.number().default(3000),
  WEBSITE_BASE_URL: z.string(),
  DB_HOST: z.string(),
  DB_PORT: z.string(),
  DB_NAME: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  JWT_PRIVATE_KEY: z.string(),
  PASSWORD_SALT: z.string(),
});

const envVars = envVarsSchema.safeParse(process.env);
if (!envVars.success) {
  console.error("There is an error with your environment variables.");
  throw envVars.error;
}

export const config = {
  api: {
    host: envVars.data.API_HOST,
    port: envVars.data.API_PORT,
  },
  website: {
    baseUrl: envVars.data.WEBSITE_BASE_URL,
  },
  tokens: {
    jwtPrivateKey: envVars.data.JWT_PRIVATE_KEY,
    passwordSalt: envVars.data.JWT_PRIVATE_KEY,
  },
  jwt: {
    accessTokenTTLSeconds: 60 * 60 * 24, // 24 hours
    refreshTokenTTLSeconds: 60 * 60 * 24 * 30, // 30 days
  },
  database: {
    host: envVars.data.DB_HOST,
    port: envVars.data.DB_PORT,
    name: envVars.data.DB_NAME,
    user: envVars.data.DB_USER,
    password: envVars.data.DB_PASSWORD,
  },
};
