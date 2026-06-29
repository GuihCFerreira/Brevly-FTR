import type { Link } from "../interfaces/link";
import apiClient from "./api-client";

export async function getLinkByShortenedUrl(
  shortenedUrl: string,
): Promise<Link | null> {
  const response = await apiClient.get(`/links/${shortenedUrl}`);
  return response.data;
}
