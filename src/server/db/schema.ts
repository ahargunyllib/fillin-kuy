import { relations, sql } from "drizzle-orm";
import {
	type PgTableExtraConfig,
	boolean,
	check,
	index,
	integer,
	pgEnum,
	pgTableCreator,
	primaryKey,
	text,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `fillin-kuy_${name}`);

export const users = createTable("users", {
	id: varchar("id", { length: 255 })
		.notNull()
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: varchar("name", { length: 255 }),
	email: varchar("email", { length: 255 }).notNull(),
	emailVerified: timestamp("email_verified", {
		mode: "date",
		withTimezone: true,
	}).default(sql`CURRENT_TIMESTAMP`),
	image: varchar("image", { length: 255 }),
});

export const usersRelations = relations(users, ({ many }) => ({
	accounts: many(accounts),
}));

export const accounts = createTable(
	"accounts",
	{
		userId: varchar("user_id", { length: 255 })
			.notNull()
			.references(() => users.id),
		type: varchar("type", { length: 255 })
			.$type<AdapterAccount["type"]>()
			.notNull(),
		provider: varchar("provider", { length: 255 }).notNull(),
		providerAccountId: varchar("provider_account_id", {
			length: 255,
		}).notNull(),
		refresh_token: text("refresh_token"),
		access_token: text("access_token"),
		expires_at: integer("expires_at"),
		token_type: varchar("token_type", { length: 255 }),
		scope: varchar("scope", { length: 255 }),
		id_token: text("id_token"),
		session_state: varchar("session_state", { length: 255 }),
	},
	(account) => ({
		compoundKey: primaryKey({
			columns: [account.provider, account.providerAccountId],
		}),
		userIdIdx: index("account_user_id_idx").on(account.userId),
	}),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
	user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
	"sessions",
	{
		sessionToken: varchar("session_token", { length: 255 })
			.notNull()
			.primaryKey(),
		userId: varchar("user_id", { length: 255 })
			.notNull()
			.references(() => users.id),
		expires: timestamp("expires", {
			mode: "date",
			withTimezone: true,
		}).notNull(),
	},
	(session) => ({
		userIdIdx: index("session_user_id_idx").on(session.userId),
	}),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
	user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
	"verification_tokens",
	{
		identifier: varchar("identifier", { length: 255 }).notNull(),
		token: varchar("token", { length: 255 }).notNull(),
		expires: timestamp("expires", {
			mode: "date",
			withTimezone: true,
		}).notNull(),
	},
	(vt) => ({
		compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
	}),
);

export const forms = createTable("forms", {
	id: varchar("id", { length: 255 })
		.notNull()
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	ownerId: varchar("owner_id", { length: 255 })
		.notNull()
		.references(() => users.id),
	title: varchar("title", { length: 255 }),
	description: text("description"),
	createdAt: timestamp("created_at", {
		mode: "date",
		withTimezone: true,
	}).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", {
		mode: "date",
		withTimezone: true,
	}).default(sql`CURRENT_TIMESTAMP`),
	closedAt: timestamp("closed_at", {
		mode: "date",
		withTimezone: true,
	}),
});

export const formsRelations = relations(forms, ({ one }) => ({
	owner: one(users, { fields: [forms.ownerId], references: [users.id] }),
}));

export const fieldTypeEnum = pgEnum("field_type_enum", [
	"text",
	"textarea",
	"select",
	"checkbox",
	"radio",
	"date",
	"time",
	"datetime",
	"file",
	"number",
	"email",
	"url",
]);

export const fields = createTable("fields", {
	id: varchar("id", { length: 255 })
		.notNull()
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	formId: varchar("form_id", { length: 255 })
		.notNull()
		.references(() => forms.id, {
			onDelete: "cascade",
		}),
	name: varchar("name", { length: 255 }).notNull(),
	label: varchar("label", { length: 255 }),
	type: fieldTypeEnum("field_type").notNull(),
	required: boolean("required").default(false),
	order: integer("order").notNull(),
});

export const fieldsRelations = relations(fields, ({ one }) => ({
	form: one(forms, { fields: [fields.formId], references: [forms.id] }),
}));

export const fieldOptions = createTable("field_options", {
	id: varchar("id", { length: 255 })
		.notNull()
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	fieldId: varchar("field_id", { length: 255 })
		.notNull()
		.references(() => fields.id, {
			onDelete: "cascade",
		}),
	value: varchar("value", { length: 255 }).notNull(),
	label: varchar("label", { length: 255 }).notNull(),
	order: integer("order").notNull().notNull(),
});

export const fieldOptionsRelations = relations(fieldOptions, ({ one }) => ({
	field: one(fields, {
		fields: [fieldOptions.fieldId],
		references: [fields.id],
	}),
}));

export const responses = createTable("responses", {
	id: varchar("id", { length: 255 })
		.notNull()
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	formId: varchar("form_id", { length: 255 })
		.notNull()
		.references(() => forms.id),
	ownerId: varchar("owner_id", { length: 255 })
		.notNull()
		.references(() => users.id),
	createdAt: timestamp("created_at", {
		mode: "date",
		withTimezone: true,
	}).default(sql`CURRENT_TIMESTAMP`),
});

export const responsesRelations = relations(responses, ({ one }) => ({
	form: one(forms, { fields: [responses.formId], references: [forms.id] }),
	owner: one(users, { fields: [responses.ownerId], references: [users.id] }),
}));

export const responseValues = createTable(
	"response_values",
	{
		id: varchar("id", { length: 255 })
			.notNull()
			.primaryKey()
			.$defaultFn(() => crypto.randomUUID()),
		responseId: varchar("response_id", { length: 255 })
			.notNull()
			.references(() => responses.id, {
				onDelete: "cascade",
			}),
		fieldId: varchar("field_id", { length: 255 })
			.notNull()
			.references(() => fields.id, {
				onDelete: "cascade",
			}),
		fieldOptionId: varchar("field_option_id", { length: 255 }).references(
			() => fieldOptions.id,
			{
				onDelete: "cascade",
			},
		),
		value: text("value"),
	},
	(table): PgTableExtraConfig => {
		return {
			checkOptionOrValue: check(
				"check_option_or_value",
				sql`
      (${table.fieldOptionId} IS NOT NULL AND ${table.value} IS NULL) OR
      (${table.fieldOptionId} IS NULL AND ${table.value} IS NOT NULL)
    `,
			),
		};
	},
);

export const responseValuesRelations = relations(responseValues, ({ one }) => ({
	response: one(responses, {
		fields: [responseValues.responseId],
		references: [responses.id],
	}),
	field: one(fields, {
		fields: [responseValues.fieldId],
		references: [fields.id],
	}),
	fieldOption: one(fieldOptions, {
		fields: [responseValues.fieldOptionId],
		references: [fieldOptions.id],
	}),
}));
