import { FastifyPluginAsync } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { validateJwt } from "../../hooks/validateJwt";
import { BadRequestError, UnauthorizedError } from "../../errors/client";
import z from "zod";
import { MultipartFile } from "@fastify/multipart";
import { logger } from "../../logger";
import { uploadProfilePictureHandler } from "./handlers/uploadProfilePicture";
import { InternalServerError } from "../../errors/server";

export const uploadsRoutes: FastifyPluginAsync = async (instance) => {
  const app = instance.withTypeProvider<ZodTypeProvider>();

  app.post(
    "/profile-picture",
    {
      onRequest: validateJwt(),
      schema: {
        summary: "Uploads profile picture",
        description: "Uploads profile picture for user onto server",
        tags: ["uploads"],
        consumes: ["multipart/form-data"],
        security: [
          {
            jwt: [""],
          },
        ],
        body: z.custom<MultipartFile>(),
        response: {
          "204": z.void(),
        },
      },
    },
    async (req, res) => {
      const userId = req.user?.id;
      if (!userId) {
        throw new UnauthorizedError({
          code: "user-id-not-found-in-request",
          message: "A user id wasn't found in the request object",
        });
      }

      const data = await req
        .file({
          limits: { fileSize: 1024 * 1024 * 5, files: 1 }, // 1 file, max 5MB
          throwFileSizeLimit: true,
        })
        .catch((error) => {
          logger.error(error, "failed to get file from request.");
          throw new InternalServerError({
            code: "error-while-getting-file-from-request",
            message: "Unknown error while getting file from request",
          });
        });
      if (!data) {
        throw new BadRequestError({
          code: "data-not-found",
          message: "The request didn't contain any data",
        });
      }

      await uploadProfilePictureHandler({ userId, file: data });

      return res.status(204).send();
    },
  );
};
