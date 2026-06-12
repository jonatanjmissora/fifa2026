import { createServerFn } from "@tanstack/react-start"
import { editResultsDb } from "../../db/results/edit-results"
import type { ResultsData } from "../../db/results/schema"

export const editResultsServer = createServerFn({ method: "POST" })
	.inputValidator((d: { id: string; data: ResultsData }) => d)
	.handler(async ({ data }) => {
		return await editResultsDb(data.id, data.data)
	})
