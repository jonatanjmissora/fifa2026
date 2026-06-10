import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { GROUPS, TEAMS, FIXTURES } from "@/lib/data"
import { calculateStandings } from "@/lib/standings"
import { GroupOverviewCard } from "@/components/groups/group-overview-card"

export const Route = createFileRoute("/_protected/")({
	component: App,
})

function App() {
	const navigate = useNavigate()

	return (
		<main className="max-w-container-max flex-1 bg-background text-on-surface pb-24 lg:pb-0">
			<section className="px-margin-mobile md:px-margin-desktop py-6">
				<h2 className="font-headline-md md:font-headline-lg text-primary mb-6">
					FASE de GRUPOS
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
					{GROUPS.map(g => {
						const hasData = TEAMS[g] !== undefined
						const data = hasData
							? calculateStandings(TEAMS[g], FIXTURES[g])
							: null
						return (
							<GroupOverviewCard
								key={g}
								groupId={g}
								standings={data}
								onClick={() => navigate({ to: "/groups" })}
							/>
						)
					})}
				</div>
			</section>
		</main>
	)
}
