import { db } from "../index"
import { results } from "../schema"

export async function getResultsDb() {
	try {
		return await db.select().from(results)
	} catch (error) {
		console.error("ERROR fetching results:", error instanceof Error ? error.message : error)
		throw error
	}
}
