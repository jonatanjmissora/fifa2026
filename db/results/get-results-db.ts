import { db } from "../index"
import { results } from "../schema"

export async function getResultsDb() {
	try {
		delay(4000)
		return await db.select().from(results)
	} catch (error) {
		console.error("Error fetching results:", error)
		throw error
	}
}

function delay(time: number) {
	return new Promise(resolve => setTimeout(resolve, time))
}
