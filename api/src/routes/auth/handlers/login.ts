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

interface LoginHandlerOutput {
  accessToken: {
    token: string;
    expiresAt: string;
  };
  refreshToken: {
    token: string;
    expiresAt: string;
  };
}

export const loginHandler = async ({
  database,
  credentials,
}: LoginHandlerOptions): Promise<LoginHandlerOutput> => {
  const user = await loginUser(database, {
    email: credentials.email,
    password: credentials.password,
  });

  const accessTokenExpiresAt = new Date(
    new Date().getTime() + config.jwt.accessTokenTTLSeconds * 1000,
  ).toISOString();
  const accessToken = signJwt({
    payload: {
      userId: user.id,
      email: user.email,
      username: user.username,
    },
    expiresInSeconds: config.jwt.accessTokenTTLSeconds,
  });

  const refreshTokenExpiresAt = new Date(
    new Date().getTime() + config.jwt.accessTokenTTLSeconds * 1000,
  ).toISOString();
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

  return {
    accessToken: {
      token: accessToken,
      expiresAt: accessTokenExpiresAt,
    },
    refreshToken: {
      token: refreshToken,
      expiresAt: refreshTokenExpiresAt,
    },
  };
};
