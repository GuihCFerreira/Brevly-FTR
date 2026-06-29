import type { LinksReport } from "../interfaces/links-report";
import apiClient from "./api-client";

export async function exportLinksReport(): Promise<LinksReport> {
  const response = await apiClient.post("/links/report");
  return response.data;
}
