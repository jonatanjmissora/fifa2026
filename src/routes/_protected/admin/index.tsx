import { Suspense, useMemo, useState } from "react"
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
import { ChevronLeft, ChevronRight, Clock } from "lucide-react"
import { Flag } from "@/components/ui/flag"

export const Route = createFileRoute("/_protected/admin/")({
	pendingComponent: LoadingResults,
	loader: ({ context }) =>
		context.queryClient.prefetchQuery(resultsQueryOptions),
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

	const allFixtures = useMemo(() => {
		const flat: {
			fixture: (typeof FIXTURES)[(typeof GROUPS)[number]][number]
			group: string
			homeTeam: (typeof TEAMS)[(typeof GROUPS)[number]][number]
			awayTeam: (typeof TEAMS)[(typeof GROUPS)[number]][number]
		}[] = []
		for (const g of GROUPS) {
			const teams = TEAMS[g]
			for (const f of FIXTURES[g]) {
				const homeTeam = teams.find(t => t.id === f.home)
				const awayTeam = teams.find(t => t.id === f.away)
				if (!homeTeam || !awayTeam) continue
				flat.push({ fixture: f, group: g, homeTeam, awayTeam })
			}
		}
		flat.sort((a, b) => a.fixture.date.localeCompare(b.fixture.date))
		return flat
	}, [])

	const dates = useMemo(() => {
		const set = new Set<string>()
		for (const { fixture } of allFixtures) {
			set.add(fixture.date.split(" ")[0])
		}
		return Array.from(set)
	}, [allFixtures])

	const todayStr = () => {
		const d = new Date()
		const y = d.getFullYear()
		const m = String(d.getMonth() + 1).padStart(2, "0")
		const day = String(d.getDate()).padStart(2, "0")
		return `${y}/${m}/${day}`
	}

	const [dateIndex, setDateIndex] = useState(() => {
		const today = todayStr()
		const idx = dates.indexOf(today)
		return idx >= 0 ? idx : 0
	})
	const currentDate = dates[dateIndex] ?? ""

	const dateFixtures = useMemo(
		() =>
			allFixtures.filter(({ fixture }) => fixture.date.startsWith(currentDate)),
		[allFixtures, currentDate]
	)

	const handleSubmit = async () => {
		try {
			const dataId = resultsData[0]?.id ?? "admin-predictions"
			await saveResults({ data: { id: dataId, data: scores } })
		} catch {
			// Error handled by useEditResults onError
		}
	}

	return (
		<div className="flex flex-col gap-6 pb-20">
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
					disabled={dateIndex === 0}
					onClick={() => setDateIndex(i => i - 1)}
				>
					<ChevronLeft className="size-5" />
				</Button>
				<span className="font-semibold text-lg">{currentDate}</span>
				<Button
					variant="outline"
					size="icon"
					disabled={dateIndex === dates.length - 1}
					onClick={() => setDateIndex(i => i + 1)}
				>
					<ChevronRight className="size-5" />
				</Button>
			</div>

			<div className="flex flex-col gap-3">
				{dateFixtures.map(({ fixture, group, homeTeam, awayTeam }) => {
					const score = scores[fixture.id]
					const time = fixture.date.split(" ")[1]
					return (
						<div key={fixture.id} className="flex flex-col gap-2 p-3 card">
							<div className="flex items-center justify-between gap-2 text-xs text-on-surface-variant font-mono">
								<span>Grupo {group}</span>
								<div className="flex items-center gap-2 text-amber-700">
									<Clock size={14} />
									<span>{time}</span>
								</div>
							</div>
							<div className="flex items-center gap-3">
								<span className="flex-1 flex-col text-right text-sm font-medium flex items-center justify-end gap-1">
									{homeTeam?.flag && (
										<Flag src={homeTeam.flag} className="size-8" />
									)}
									{fixture.home}
								</span>
								<Input
									type="number"
									min="0"
									max="99"
									className="w-16 text-center bg-white dark:bg-white text-black dark:text-black"
									value={score?.hs ?? ""}
									onChange={e => updateScore(fixture.id, "hs", e.target.value)}
									placeholder="-"
								/>
								<span className="text-muted-foreground">vs</span>
								<Input
									type="number"
									min="0"
									max="99"
									className="w-16 text-center bg-white dark:bg-white text-black dark:text-black"
									value={score?.as ?? ""}
									onChange={e => updateScore(fixture.id, "as", e.target.value)}
									placeholder="-"
								/>
								<span className="flex-1 flex-col text-sm font-medium flex items-center gap-1">
									{awayTeam?.flag && (
										<Flag src={awayTeam.flag} className="size-8" />
									)}
									{fixture.away}
								</span>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}
