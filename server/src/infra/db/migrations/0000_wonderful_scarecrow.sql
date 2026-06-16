CREATE TABLE "shortened_urls" (
	"id" text PRIMARY KEY NOT NULL,
	"shortened_url" varchar(40) NOT NULL,
	"original_url" text NOT NULL,
	"access_amount" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "shortened_urls_shortened_url_unique" UNIQUE("shortened_url")
);
