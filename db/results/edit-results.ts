import { eq } from "drizzle-orm"
import { db } from "../index"
import { results, type ResultsData } from "../schema"

export async function editResultsDb(id: string, data: ResultsData) {
	try {
		await db.update(results).set({ data }).where(eq(results.id, id))
	} catch (error) {
		console.error("ERROR editing results:", error instanceof Error ? error.message : error)
		throw error
	}
}
