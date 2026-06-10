import { useState, useMemo } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { GROUPS, TEAMS, FIXTURES, type GroupId } from "@/lib/data"
import { calculateStandings, type Standing } from "@/lib/standings"
import { StandingsTable } from "@/components/groups/standings-table"
import { FixtureCard } from "@/components/groups/fixture-card"

export const Route = createFileRoute("/_protected/groups")({
	component: GroupsPage,
})

function GroupsPage() {
	const [activeGroup, setActiveGroup] = useState<GroupId>(GROUPS[0])
	const [fixtures, setFixtures] = useState(() => {
		const cloned: Record<GroupId, (typeof FIXTURES)[GroupId]> =
			structuredClone(FIXTURES)
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
		<main className="max-w-container-max mx-auto flex flex-col lg:flex-row bg-background text-on-surface pb-24 lg:pb-0">
			{/* Sidebar - desktop */}
			<aside className="h-screen w-64 hidden lg:flex flex-col border-r border-outline-variant/30 bg-surface-container-low p-4 sticky top-0">
				<h2 className="font-headline-md text-primary mb-4">Grupos</h2>
				<nav className="flex flex-col gap-1 overflow-y-auto hide-scrollbar">
					{GROUPS.map(g => {
						const isActive = g === activeGroup
						return (
							<button
								key={g}
								type="button"
								className={`flex items-center gap-3 p-3 rounded-lg transition cursor-pointer ${
									isActive
										? "bg-primary text-on-primary font-bold"
										: "text-on-surface hover:bg-surface-container-high"
								}`}
								onClick={() => setActiveGroup(g)}
							>
								<span className="font-label-caps">Group {g}</span>
							</button>
						)
					})}
				</nav>
			</aside>

			{/* Main content */}
			<section className="flex-1 px-margin-mobile md:px-margin-desktop py-6">
				{/* Mobile group tabs */}
				<div className="lg:hidden mb-6">
					<div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
						{GROUPS.map(g => {
							const isActive = g === activeGroup
							return (
								<button
									key={g}
									type="button"
									className={`flex-shrink-0 px-6 py-2 rounded-full text-sm font-bold cursor-pointer ${
										isActive
											? "bg-primary text-on-primary"
											: "bg-surface-container text-on-surface-variant"
									}`}
									onClick={() => setActiveGroup(g)}
								>
									Group {g}
								</button>
							)
						})}
					</div>
				</div>

				<div className="flex flex-col gap-8">
					<StandingsTable standings={standings} />

					<div>
						<div className="flex justify-between items-end mb-4">
							<div>
								<h2 className="font-headline-md text-primary">Fixtures</h2>
								<p className="font-body-md text-on-surface-variant">
									{groupTeams.map(t => t.name).join(", ")}
								</p>
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
