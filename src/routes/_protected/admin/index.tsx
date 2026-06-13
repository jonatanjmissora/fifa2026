import { Suspense, useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { useSuspenseQuery } from "@tanstack/react-query"
import { GROUPS, FIXTURES, TEAMS } from "@/lib/data"
import useScrollTop from "@/lib/scroll-top"
import { resultsQueryOptions } from "queries/results/results-query"
import { useEditResults } from "queries/results/use-edit-results"
import type { ResultsData } from "db/results/schema"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { LoadingResults } from "@/components/loading-results"
import { ChevronRight, ChevronLeft } from "lucide-react"
import { Flag } from "@/components/ui/flag"

export const Route = createFileRoute("/_protected/admin/")({
	pendingComponent: LoadingResults,
	loader: ({ context }) =>
		context.queryClient.ensureQueryData(resultsQueryOptions),
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<Suspense fallback={<LoadingResults />}>
			<AdminPage />
		</Suspense>
	)
}

function AdminPage() {
	useScrollTop()
	const { data: resultsData } = useSuspenseQuery(resultsQueryOptions)
	const existingData = resultsData[0]?.data ?? {}
	const { mutateAsync: saveResults, isPending } = useEditResults()

	const [groupIndex, setGroupIndex] = useState(0)
	const currentGroup = GROUPS[groupIndex]

	const [scores, setScores] = useState<ResultsData>(() => {
		const initial: ResultsData = {}
		for (const g of GROUPS) {
			for (const f of FIXTURES[g]) {
				initial[f.id] = existingData[f.id] ?? null
			}
		}
		return initial
	})

	const updateScore = (
		fixtureId: number,
		field: "hs" | "as",
		value: string
	) => {
		const parsed = value === "" ? null : Number(value)
		setScores((prev: ResultsData) => {
			const current = prev[fixtureId]
			const hs = field === "hs" ? parsed : (current?.hs ?? null)
			const as = field === "as" ? parsed : (current?.as ?? null)
			if (hs === null && as === null) {
				return { ...prev, [fixtureId]: null }
			}
			return { ...prev, [fixtureId]: { hs: hs ?? 0, as: as ?? 0 } }
		})
	}

	const fixtures = FIXTURES[currentGroup]

	const handleSubmit = async () => {
		const dataId = resultsData[0]?.id ?? "admin-predictions"
		await saveResults({ data: { id: dataId, data: scores } })
	}

	return (
		<div className="flex flex-col gap-6">
			<div className="flex items-center justify-between">
				<h1 className="text-lg font-bold">Resultados</h1>
				<Button
					className="bg-gray-500"
					onClick={handleSubmit}
					disabled={isPending}
				>
					{isPending ? "Guardando..." : "Guardar todo"}
				</Button>
			</div>

			<div className="flex items-center gap-4 justify-center">
				<Button
					variant="outline"
					size="icon"
					disabled={groupIndex === 0}
					onClick={() => setGroupIndex(i => i - 1)}
				>
					<ChevronLeft className="size-4" />
				</Button>
				<span className="font-semibold text-lg">Grupo {currentGroup}</span>
				<Button
					variant="outline"
					size="icon"
					disabled={groupIndex === GROUPS.length - 1}
					onClick={() => setGroupIndex(i => i + 1)}
				>
					<ChevronRight className="size-4" />
				</Button>
			</div>

			<div className="flex flex-col gap-3">
				{fixtures.map(f => {
					const score = scores[f.id]
					const teams = TEAMS[currentGroup]
					const homeTeam = teams.find(t => t.id === f.home)
					const awayTeam = teams.find(t => t.id === f.away)
					return (
						<div key={f.id} className="flex items-center gap-3 p-3 card">
							<span className="flex-1 flex-col text-right text-sm font-medium flex items-center justify-end gap-1">
								{homeTeam?.flag && (
									<Flag src={homeTeam.flag} className="size-8" />
								)}
								{f.home}
							</span>
							<Input
								type="number"
								min="0"
								max="99"
								className="w-16 text-center bg-white/80"
								value={score?.hs ?? ""}
								onChange={e => updateScore(f.id, "hs", e.target.value)}
								placeholder="-"
							/>
							<span className="text-muted-foreground">vs</span>
							<Input
								type="number"
								min="0"
								max="99"
								className="w-16 text-center bg-white/80"
								value={score?.as ?? ""}
								onChange={e => updateScore(f.id, "as", e.target.value)}
								placeholder="-"
							/>
							<span className="flex-1 flex-col text-sm font-medium flex items-center gap-1">
								{awayTeam?.flag && (
									<Flag src={awayTeam.flag} className="size-8" />
								)}
								{f.away}
							</span>
						</div>
					)
				})}
			</div>
		</div>
	)
}
