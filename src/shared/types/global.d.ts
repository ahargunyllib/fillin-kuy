import type { fieldOptions, fields, forms } from "@/server/db/schema";
import type { InferSelectModel } from "drizzle-orm";

declare global {
	type FormEntity = InferSelectModel<typeof forms>;
	type FormFieldEntity = InferSelectModel<typeof fields>;
	type FormOptionEntity = InferSelectModel<typeof fieldOptions>;
}
