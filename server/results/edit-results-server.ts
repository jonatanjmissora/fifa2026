import { createServerFn } from "@tanstack/react-start"
import { z } from "zod"
import { editResultsDb } from "../../db/results/edit-results"
import type { ResultsData } from "../../db/results/schema"

const matchResultSchema = z.object({
	hs: z.number().int().min(0).max(99),
	as: z.number().int().min(0).max(99),
}).nullable()

const editResultsSchema = z.object({
	id: z.string().min(1),
	data: z.record(z.string(), matchResultSchema).transform(
		(val): ResultsData => {
			const result: ResultsData = {}
			for (const [key, value] of Object.entries(val)) {
				result[Number(key)] = value
			}
			return result
		}
	),
})

export const editResultsServer = createServerFn({ method: "POST" })
	.inputValidator(editResultsSchema)
	.handler(async ({ data }) => {
		return await editResultsDb(data.id, data.data)
	})
