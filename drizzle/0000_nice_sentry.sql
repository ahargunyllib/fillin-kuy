DO $$ BEGIN
 CREATE TYPE "public"."field_type_enum" AS ENUM('text', 'textarea', 'select', 'checkbox', 'radio', 'date', 'time', 'datetime', 'file', 'number', 'email', 'url');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "fillin-kuy_accounts" (
	"user_id" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"provider" varchar(255) NOT NULL,
	"provider_account_id" varchar(255) NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" varchar(255),
	"scope" varchar(255),
	"id_token" text,
	"session_state" varchar(255),
	CONSTRAINT "fillin-kuy_accounts_provider_provider_account_id_pk" PRIMARY KEY("provider","provider_account_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "fillin-kuy_field_options" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"field_id" varchar(255) NOT NULL,
	"value" varchar(255) NOT NULL,
	"label" varchar(255) NOT NULL,
	"order" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "fillin-kuy_fields" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"form_id" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"label" varchar(255),
	"field_type" "field_type_enum" NOT NULL,
	"required" boolean DEFAULT false,
	"order" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "fillin-kuy_forms" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"owner_id" varchar(255) NOT NULL,
	"title" varchar(255),
	"description" text,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"closed_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "fillin-kuy_response_values" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"response_id" varchar(255) NOT NULL,
	"field_id" varchar(255) NOT NULL,
	"field_option_id" varchar(255),
	"value" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "fillin-kuy_responses" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"form_id" varchar(255) NOT NULL,
	"owner_id" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "fillin-kuy_sessions" (
	"session_token" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"expires" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "fillin-kuy_users" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"email" varchar(255) NOT NULL,
	"email_verified" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"image" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "fillin-kuy_verification_tokens" (
	"identifier" varchar(255) NOT NULL,
	"token" varchar(255) NOT NULL,
	"expires" timestamp with time zone NOT NULL,
	CONSTRAINT "fillin-kuy_verification_tokens_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "fillin-kuy_accounts" ADD CONSTRAINT "fillin-kuy_accounts_user_id_fillin-kuy_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."fillin-kuy_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "fillin-kuy_field_options" ADD CONSTRAINT "fillin-kuy_field_options_field_id_fillin-kuy_fields_id_fk" FOREIGN KEY ("field_id") REFERENCES "public"."fillin-kuy_fields"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "fillin-kuy_fields" ADD CONSTRAINT "fillin-kuy_fields_form_id_fillin-kuy_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."fillin-kuy_forms"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "fillin-kuy_forms" ADD CONSTRAINT "fillin-kuy_forms_owner_id_fillin-kuy_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."fillin-kuy_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "fillin-kuy_response_values" ADD CONSTRAINT "fillin-kuy_response_values_response_id_fillin-kuy_responses_id_fk" FOREIGN KEY ("response_id") REFERENCES "public"."fillin-kuy_responses"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "fillin-kuy_response_values" ADD CONSTRAINT "fillin-kuy_response_values_field_id_fillin-kuy_fields_id_fk" FOREIGN KEY ("field_id") REFERENCES "public"."fillin-kuy_fields"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "fillin-kuy_response_values" ADD CONSTRAINT "fillin-kuy_response_values_field_option_id_fillin-kuy_field_options_id_fk" FOREIGN KEY ("field_option_id") REFERENCES "public"."fillin-kuy_field_options"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "fillin-kuy_responses" ADD CONSTRAINT "fillin-kuy_responses_form_id_fillin-kuy_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."fillin-kuy_forms"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "fillin-kuy_responses" ADD CONSTRAINT "fillin-kuy_responses_owner_id_fillin-kuy_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."fillin-kuy_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "fillin-kuy_sessions" ADD CONSTRAINT "fillin-kuy_sessions_user_id_fillin-kuy_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."fillin-kuy_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "account_user_id_idx" ON "fillin-kuy_accounts" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "session_user_id_idx" ON "fillin-kuy_sessions" USING btree ("user_id");