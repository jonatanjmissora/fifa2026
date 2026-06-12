import { db } from "../index"
import { results, type ResultsData } from "../schema"

export async function createResultsDb(id: string, data: ResultsData) {
	try {
		await db.insert(results).values({ id, data })
	} catch (error) {
		console.error("ERROR creating results:", error instanceof Error ? error.message : error)
		throw error
	}
}
