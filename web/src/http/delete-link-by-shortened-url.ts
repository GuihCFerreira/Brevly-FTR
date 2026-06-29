import apiClient from "./api-client";

export async function deleteLinkByShortenedUrl(
  shortenedUrl: string,
): Promise<void> {
  await apiClient.delete(`/links/${shortenedUrl}`);
}
