import { Suspense, useMemo } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { useSuspenseQuery } from "@tanstack/react-query"
import { GROUPS, TEAMS, FIXTURES } from "@/lib/data"
import { calculateStandings } from "@/lib/standings"
import { GroupOverviewCard } from "@/components/groups/group-overview-card"
import { LoadingResults } from "@/components/loading-results"
import useScrollTop from "@/lib/scroll-top"
import { resultsQueryOptions } from "queries/results/results-query"

export const Route = createFileRoute("/_protected/")({
	pendingComponent: LoadingResults,
	loader: ({ context }) =>
		context.queryClient.ensureQueryData(resultsQueryOptions),
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<Suspense fallback={<LoadingResults />}>
			<App />
		</Suspense>
	)
}

function App() {
	useScrollTop()
	const { data: resultsData } = useSuspenseQuery(resultsQueryOptions)
	const predictions = resultsData[0]?.data ?? {}

	const fixturesWithPredictions = useMemo(() => {
		const merged = structuredClone(FIXTURES)
		for (const g of GROUPS) {
			for (const f of merged[g]) {
				const pred = predictions[f.id]
				if (pred) {
					f.hs = pred.hs
					f.as = pred.as
				}
			}
		}
		return merged
	}, [predictions])

	return (
		<main className="flex-1 text-on-surface mb-24 lg:pb-0">
			<section className="py-6">
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
					{GROUPS.map(g => {
						const hasData = TEAMS[g] !== undefined
						const data = hasData
							? calculateStandings(TEAMS[g], fixturesWithPredictions[g])
							: null
						return <GroupOverviewCard key={g} groupId={g} standings={data} />
					})}
				</div>
			</section>
		</main>
	)
}
