import { createWriteStream } from "fs";
import { access, mkdir } from "fs/promises";
import { promisify as utilPromisify } from "util";
import { pipeline } from "stream";
import { MultipartFile } from "@fastify/multipart";
import { config } from "../../../config";
import { BadRequestError } from "../../../errors/client";

interface UploadProfilePictureHandlerOptions {
  userId: string;
  file: MultipartFile;
}
export const uploadProfilePictureHandler = async ({
  userId,
  file,
}: UploadProfilePictureHandlerOptions): Promise<void> => {
  const folderPath = `${config.uploads.filePath}/profiles/`;

  // Check if file exceeds limits
  if (file.file.truncated) {
    throw new BadRequestError({
      code: "file-size-too-large",
      message: "The uploaded file exceeds the limit of 1000 bytes",
    });
  }

  // Check if folder exists, if not create it
  try {
    await access(folderPath);
  } catch {
    await mkdir(folderPath);
  }

  // Stream file uploading to folder
  const pump = utilPromisify(pipeline);
  await pump(file.file, createWriteStream(`${folderPath}/${userId}`));
};
