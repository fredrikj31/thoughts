import { sign as jwtSign } from "jsonwebtoken";
import { config } from "../config";
import { InternalServerError } from "../errors/server";
import { logger } from "../logger";

interface SignJwtOptions {
  payload: Record<string, unknown>;
  expiresInSeconds: number;
  tokenId?: string;
}

export const signJwt = ({
  payload,
  expiresInSeconds,
  tokenId,
}: SignJwtOptions): string => {
  try {
    if (tokenId) {
      return jwtSign(payload, config.tokens.jwtPrivateKey, {
        expiresIn: expiresInSeconds,
        jwtid: tokenId,
      });
    }

    return jwtSign(payload, config.tokens.jwtPrivateKey, {
      expiresIn: expiresInSeconds,
    });
  } catch (error) {
    logger.error({ error }, "Failed signing JWT token");
    throw new InternalServerError({
      code: "error-signing-jwt-token",
      message: "Unknown error while signing JWT token",
    });
  }
};
