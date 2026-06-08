import {
	ErrorComponent,
	Link,
	rootRouteId,
	useMatch,
	useRouter,
} from "@tanstack/react-router"
import type { ErrorComponentProps } from "@tanstack/react-router"

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
	const router = useRouter()
	const isRoot = useMatch({ strict: false, select: s => s.id === rootRouteId })

	console.error("DefaultCatchBoundary Error:", error)

	// ---------- error classification ----------
	const isDbError =
		// Classic Drizzle/Postgres error (code 42P01)
		(typeof error === "object" &&
			error !== null &&
			"code" in error &&
			(error.code === "42P01" || error.code === "FAILED_TO_GET_SESSION")) ||
		// Our custom thrown string
		(typeof error === "object" &&
			error !== null &&
			"message" in error &&
			(error.message as string).includes("DatabaseMissingSessionTable")) ||
		// Better‑auth wraps the error in a body object
		(typeof error === "object" &&
			error !== null &&
			"body" in error &&
			typeof (error as any).body === "object" &&
			(error as any).body !== null &&
			"code" in (error as any).body &&
			(error as any).body.code === "FAILED_TO_GET_SESSION")

	const isCookieError =
		typeof error === "object" &&
		error !== null &&
		"message" in error &&
		(error.message as string).toLowerCase().includes("session token")

	// ---------- UI ----------
	let title = "Unexpected Error"
	let subtitle = "An unknown problem occurred."

	if (isDbError) {
		title = "Database Not Initialized"
		subtitle = "The required `session` table is missing. Run the migrations."
	} else if (isCookieError) {
		title = "Authentication Issue"
		subtitle =
			"The session cookie does not belong to this app. Clear cookies or log in again."
	}

	return (
		<div className="min-w-0 flex-1 p-4 flex flex-col items-center justify-center gap-6">
			<h2 className="text-2xl font-bold">{title}</h2>
			<p className="text-gray-400">{subtitle}</p>
			<ErrorComponent error={error} />
			<div className="flex gap-2 items-center flex-wrap">
				<button
					onClick={() => router.invalidate()}
					className="px-2 py-1 bg-gray-600 dark:bg-gray-700 rounded-sm text-white uppercase font-extrabold"
				>
					Try Again
				</button>
				{isRoot ? (
					<Link
						to="/"
						className="px-2 py-1 bg-gray-600 dark:bg-gray-700 rounded-sm text-white uppercase font-extrabold"
					>
						Home
					</Link>
				) : (
					<Link
						to="/"
						className="px-2 py-1 bg-gray-600 dark:bg-gray-700 rounded-sm text-white uppercase font-extrabold"
						onClick={e => {
							e.preventDefault()
							window.history.back()
						}}
					>
						Go Back
					</Link>
				)}
			</div>
		</div>
	)
}
