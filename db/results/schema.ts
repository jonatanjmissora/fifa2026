import { pgTable, text, jsonb, timestamp } from "drizzle-orm/pg-core"

export type ResultsData = Record<number, { hs: number; as: number } | null>

export const results = pgTable("results", {
	id: text("id").primaryKey(),
	data: jsonb("data").$type<ResultsData>().notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
})
