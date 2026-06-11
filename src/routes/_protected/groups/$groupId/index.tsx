import { Suspense, useState, useMemo } from "react"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useSuspenseQuery } from "@tanstack/react-query"
import { GROUPS, TEAMS, FIXTURES, type GroupId } from "@/lib/data"
import { calculateStandings, type Standing } from "@/lib/standings"
import { StandingsTable } from "@/components/groups/standings-table"
import { FixtureCard } from "@/components/groups/fixture-card"
import { LoadingGroups } from "@/components/loading-results"
import { ChevronRight } from "lucide-react"
import useScrollTop from "@/lib/scroll-top"
import { resultsQueryOptions } from "queries/results/results-query"

export const Route = createFileRoute("/_protected/groups/$groupId/")({
	pendingComponent: LoadingGroups,
	loader: ({ context }) =>
		context.queryClient.ensureQueryData(resultsQueryOptions),
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<Suspense fallback={<LoadingGroups />}>
			<GroupsRoute />
		</Suspense>
	)
}

function GroupsRoute() {
	useScrollTop()
	const navigate = useNavigate()
	const { groupId } = Route.useParams()
	const { data: resultsData } = useSuspenseQuery(resultsQueryOptions)
	const predictions = resultsData[0]?.data ?? {}

	const [activeGroup, setActiveGroup] = useState<GroupId>(() =>
		GROUPS.includes(groupId as GroupId) ? (groupId as GroupId) : GROUPS[0]
	)
	const [fixtures, setFixtures] = useState(() => {
		const cloned: Record<GroupId, (typeof FIXTURES)[GroupId]> =
			structuredClone(FIXTURES)
		for (const g of GROUPS) {
			for (const f of cloned[g]) {
				const pred = predictions[f.id]
				if (pred) {
					f.hs = pred.hs
					f.as = pred.as
				}
			}
		}
		return cloned
	})

	const groupFixtures = fixtures[activeGroup]
	const groupTeams = TEAMS[activeGroup] ?? []

	const standings: Standing[] = useMemo(
		() => calculateStandings(groupTeams, groupFixtures),
		[groupTeams, groupFixtures]
	)

	const updateScore = (
		matchId: number,
		side: "home" | "away",
		value: string
	) => {
		const score = value === "" ? null : Number(value)

		setFixtures(prev => {
			const updated = structuredClone(prev)
			const match = updated[activeGroup].find(m => m.id === matchId)
			if (!match) return prev
			if (side === "home") match.hs = score
			else match.as = score
			return updated
		})
	}

	return (
		<main className="w-full mx-auto flex flex-col text-on-surface mb-24 lg:pb-0">
			<section className="flex-1 py-6">
				<div className="mb-6">
					<div className="relative">
						<div className="flex gap-2 overflow-x-auto hide-scrollbar card p-0">
							<ChevronRight className="absolute -right-5 -top-1 opacity-20 w-7 h-14 p-0" />
							{GROUPS.map(g => {
								const isActive = g === activeGroup
								return (
									<button
										key={g}
										type="button"
										className={`shrink-0 px-6 py-2 rounded-lg font-bold text-xl cursor-pointer w-[calc(100%/12.80)] text-center flex items-center justify-center ${
											isActive
												? "bg-gray-500 text-on-primary"
												: "bg-surface-container text-on-surface-variant"
										}`}
										onClick={() => {
											setActiveGroup(g)
											navigate({
												to: "/groups/$groupId",
												params: {
													groupId: g,
												},
											})
										}}
									>
										{g}
									</button>
								)
							})}
						</div>
					</div>
				</div>

				<div className="flex flex-col gap-8">
					<StandingsTable standings={standings} />

					<div>
						<div className="flex justify-between items-end mb-4">
							<div>
								<h2 className="font-headline-md text-foreground">Partidos</h2>
							</div>
						</div>
						<div className="grid grid-cols-1 gap-4">
							{groupFixtures.length === 0 ? (
								<div className="p-8 text-center text-on-surface-variant italic">
									No fixtures currently available for Group {activeGroup}
								</div>
							) : (
								groupFixtures.map(m => {
									const homeTeam = groupTeams.find(t => t.id === m.home)
									const awayTeam = groupTeams.find(t => t.id === m.away)
									if (!homeTeam || !awayTeam) return null
									return (
										<FixtureCard
											key={m.id}
											fixture={m}
											homeTeam={homeTeam}
											awayTeam={awayTeam}
											onScoreChange={updateScore}
										/>
									)
								})
							)}
						</div>
					</div>
				</div>
			</section>
		</main>
	)
}
