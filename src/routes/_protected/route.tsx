import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router"
import { protectedRoute } from "@/lib/protected-route"

export const Route = createFileRoute("/_protected")({
	loader: async () => await protectedRoute(),
	component: RouteComponent,
})

function RouteComponent() {
	const { pathname } = useLocation()
	const isGroups = pathname.startsWith("/groups/")

	return (
		<div>
			<nav className="flex gap-4 mb-6 w-full items-center justify-between text-xs">
				<Link
					to="/"
					className="text-foreground hover:text-foreground/80 flex-1 text-center py-2"
					activeProps={{
						className: "card p-0 ",
					}}
				>
					TABLAS
				</Link>
				<Link
					to="/groups/$groupId"
					params={{ groupId: "A" }}
					className={
						"text-foreground hover:text-foreground/80 flex-1 text-center py-2" +
						(isGroups ? " card p-0" : "")
					}
				>
					GRUPOS
				</Link>
				<Link
					to="/participantes"
					className="text-foreground hover:text-foreground/80 flex-1 text-center py-2"
					activeProps={{
						className: "card p-0",
					}}
				>
					PARTICIPA.
				</Link>
			</nav>
			<Outlet />
		</div>
	)
}
