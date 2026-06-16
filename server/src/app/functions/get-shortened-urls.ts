import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { makeRight } from "@/shared/either";
import { desc } from "drizzle-orm";

export async function getShortenedUrls() {
  const shortenedUrls = await db
    .select({
      id: schema.shortenedUrls.id,
      shortenedUrl: schema.shortenedUrls.shortenedUrl,
      originalUrl: schema.shortenedUrls.originalUrl,
      accessAmount: schema.shortenedUrls.accessAmount,
      createdAt: schema.shortenedUrls.createdAt,
    })
    .from(schema.shortenedUrls)
    .orderBy((fields) => desc(fields.createdAt));

  return makeRight({ shortenedUrls });
}
