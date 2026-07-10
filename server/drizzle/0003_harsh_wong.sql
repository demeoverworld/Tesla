ALTER TABLE "verificationToken" DROP CONSTRAINT "verificationToken_identifier_token_pk";--> statement-breakpoint
ALTER TABLE "verificationToken" ADD CONSTRAINT "verificationToken_email_token_pk" PRIMARY KEY("email","token");--> statement-breakpoint
ALTER TABLE "verificationToken" ADD COLUMN "email" text NOT NULL;--> statement-breakpoint
ALTER TABLE "verificationToken" DROP COLUMN "identifier";