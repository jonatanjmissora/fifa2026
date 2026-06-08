import { auth } from "@/lib/auth"
import { createServerFn } from "@tanstack/react-start"
import { getRequest } from "@tanstack/react-start/server"

export const getSession = createServerFn({ method: "GET" }).handler(
	async () => {
		const request = getRequest()
		try {
			return await auth.api.getSession({
				headers: request.headers,
			})
		} catch (error:any) {
			// Detect missing session table in Neon
			if (error?.code === '42P01' || /relation "session" does not exist/.test(error?.message || '')) {
				throw new Error('DatabaseMissingSessionTable')
			}
			// Propagate other errors (e.g., cookie mismatch)
			throw error
		}
	}
)
