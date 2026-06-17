import { integer, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core'
import { uuidv7 } from 'uuidv7'

export const shortenedUrls = pgTable('shortened_urls', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  shortenedUrl: varchar('shortened_url', { length: 40 }).notNull().unique(),
  originalUrl: text('original_url').notNull(),
  accessAmount: integer('access_amount').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})
