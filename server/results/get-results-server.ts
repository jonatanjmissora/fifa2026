import { createServerFn } from "@tanstack/react-start"
import { getResultsDb } from "../../db/results/get-results-db"

export const getResultsServer = createServerFn({ method: "GET" }).handler(
	async () => {
		return await getResultsDb()
	}
)
