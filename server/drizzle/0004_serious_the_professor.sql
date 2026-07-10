CREATE TABLE "product" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"year" integer NOT NULL,
	"model" text NOT NULL,
	"price" integer NOT NULL,
	"desc" text NOT NULL,
	"photo" text NOT NULL
);
--> statement-breakpoint
DROP TABLE "verificationToken" CASCADE;