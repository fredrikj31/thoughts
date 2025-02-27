import { apiClient } from "../../apiClient";

interface UploadProfilePictureOptions {
  profilePicture: File;
}
export const uploadProfilePicture = async ({
  profilePicture,
}: UploadProfilePictureOptions): Promise<void> => {
  const formData = new FormData();
  formData.append("profilePicture", profilePicture);

  try {
    await apiClient.post("/uploads/profile-picture", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return;
  } catch (error) {
    console.error("Failed to upload user profile picture", error);
    throw error;
  }
};
