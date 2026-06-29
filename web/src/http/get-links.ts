import type { Link } from "../interfaces/link";
import apiClient from "./api-client";

export async function getLinks(): Promise<Link[]> {
  const response = await apiClient.get("/links");
  return response.data;
}
