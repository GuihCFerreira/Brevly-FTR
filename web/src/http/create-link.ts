import apiClient from "./api-client";

interface CreateLinkRequest {
  originalUrl: string;
  shortenedUrl: string;
}

interface CreateLinkResponse {
  shortenedUrl: string;
}

export async function createLink(
  link: CreateLinkRequest,
): Promise<CreateLinkResponse> {
  const response = await apiClient.post("/links", link);
  return response.data;
}
