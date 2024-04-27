import { CommonQueryMethods } from "slonik";
import { loginUser } from "../../../services/database/queries/loginUser";
import { signJwt } from "../../../helpers/signJwt";
import { randomUUID } from "crypto";
import { createRefreshToken } from "../../../services/database/queries/createRefreshToken";
import { config } from "../../../config";

interface LoginHandlerOptions {
  database: CommonQueryMethods;
  credentials: {
    email: string;
    password: string;
  };
}

export const loginHandler = async ({
  database,
  credentials,
}: LoginHandlerOptions) => {
  const user = await loginUser(database, {
    email: credentials.email,
    password: credentials.password,
  });

  const accessToken = signJwt({
    payload: {
      userId: user.id,
      email: user.email,
      username: user.username,
    },
    expiresInSeconds: config.jwt.accessTokenTTLSeconds,
  });

  const refreshTokenId = randomUUID();
  const refreshToken = signJwt({
    payload: {},
    expiresInSeconds: config.jwt.refreshTokenTTLSeconds,
    tokenId: refreshTokenId,
  });

  await createRefreshToken(database, {
    tokenId: refreshTokenId,
    userId: user.id,
    expiresAt: new Date(
      new Date().getTime() + config.jwt.refreshTokenTTLSeconds * 1000,
    ).toISOString(),
  });

  return { accessToken, refreshToken };
};
