import { CommonQueryMethods } from "slonik";
import { BadRequestError } from "../../../errors/client";
import { validateJwtToken } from "../../../helpers/validateJwtToken";
import { checkRefreshToken } from "../../../services/database/queries/checkRefreshToken";
import { signJwt } from "../../../helpers/signJwt";
import { getUserById } from "../../../services/database/queries/getUserById";
import { config } from "../../../config";

interface TokenHandlerOptions {
  database: CommonQueryMethods;
  refreshToken: string;
}

interface TokenHandlerOutput {
  accessToken: string;
  expiresAt: string;
}

export const tokenHandler = async ({
  database,
  refreshToken,
}: TokenHandlerOptions): Promise<TokenHandlerOutput> => {
  // Validate refresh token
  const refreshTokenPayload = await validateJwtToken({ token: refreshToken });

  const refreshTokenId = refreshTokenPayload.jti;
  if (!refreshTokenId) {
    throw new BadRequestError({
      code: "refresh-token-id-not-found",
      message: "Couldn't find the refresh token id inside of token",
    });
  }

  // Lookup refresh token in database
  const refreshTokenItem = await checkRefreshToken(database, {
    refreshTokenId,
  });

  if (refreshTokenItem.expiresAt < new Date().toISOString()) {
    throw new BadRequestError({
      code: "refresh-token-expired",
      message: "The provided refresh token has expired",
    });
  }

  // Get user details
  const user = await getUserById(database, { userId: refreshTokenItem.userId });

  const expiresAt = new Date(
    new Date().getTime() + config.jwt.accessTokenTTLSeconds * 1000,
  ).toISOString();

  // Sign new access token
  const accessToken = signJwt({
    payload: {
      userId: user.id,
      username: user.username,
    },
    expiresInSeconds: config.jwt.accessTokenTTLSeconds, // 24 hours
  });

  return { accessToken, expiresAt };
};
