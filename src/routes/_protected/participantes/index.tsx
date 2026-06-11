import { useState, useMemo } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { PARTICIPANTES } from "@/lib/predictions"
import { FIXTURES, GROUPS, TEAMS } from "@/lib/data"
import { FixtureCard } from "@/components/groups/fixture-card"

const DAY_NAMES = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]
const MONTH_NAMES = [
	"Ene",
	"Feb",
	"Mar",
	"Abr",
	"May",
	"Jun",
	"Jul",
	"Ago",
	"Sep",
	"Oct",
	"Nov",
	"Dic",
]

function parseParts(dateStr: string) {
	const parts = dateStr.split(/[/-]/)
	return { y: +parts[0], m: +parts[1], d: +parts[2] }
}

function formatDate(dateStr: string) {
	const { d, m } = parseParts(dateStr)
	return `${d} ${MONTH_NAMES[m - 1]}`
}

function dayName(dateStr: string) {
	const { y, m, d } = parseParts(dateStr)
	return DAY_NAMES[new Date(y, m - 1, d).getDay()]
}

function todayStr() {
	const d = new Date()
	const y = d.getFullYear()
	const m = String(d.getMonth() + 1).padStart(2, "0")
	const day = String(d.getDate()).padStart(2, "0")
	return `${y}/${m}/${day}`
}

export const Route = createFileRoute("/_protected/participantes/")({
	component: RouteComponent,
})

function RouteComponent() {
	const today = todayStr()
	const [selectedDate, setSelectedDate] = useState(today)

	const matchdays = useMemo(() => {
		const set = new Set<string>()
		for (const g of GROUPS) {
			for (const f of FIXTURES[g]) {
				set.add(f.date.slice(0, 10))
			}
		}
		return Array.from(set).sort()
	}, [])

	const dateFixtures = useMemo(() => {
		const result: {
			fixture: (typeof FIXTURES)[(typeof GROUPS)[number]][number]
			homeTeam: (typeof TEAMS)[(typeof GROUPS)[number]][number]
			awayTeam: (typeof TEAMS)[(typeof GROUPS)[number]][number]
		}[] = []
		for (const g of GROUPS) {
			for (const f of FIXTURES[g]) {
				if (f.date.slice(0, 10) !== selectedDate) continue
				const homeTeam = TEAMS[g].find(t => t.id === f.home)
				const awayTeam = TEAMS[g].find(t => t.id === f.away)
				if (!homeTeam || !awayTeam) continue
				result.push({ fixture: f, homeTeam, awayTeam })
			}
		}
		return result
	}, [selectedDate])

	return (
		<main className="flex-1 text-on-surface mb-24 lg:pb-0">
			<section className="py-6 space-y-8">
				<div>
					<div className="card overflow-x-auto">
						<table className="w-full text-left">
							<thead>
								<tr className="border-b border-on-surface/10 text-on-surface-variant font-label-caps">
									<th className="p-4">Nombre</th>
									<th className="p-4 text-right">
										<span className="sm:hidden">PTS</span>
										<span className="hidden sm:inline">Puntos</span>
									</th>
									<th className="p-4 text-right">
										<span className="sm:hidden">EXC</span>
										<span className="hidden sm:inline">Resultado exacto</span>
									</th>
									<th className="p-4 text-right">
										<span className="sm:hidden">PR</span>
										<span className="hidden sm:inline">Prode</span>
									</th>
								</tr>
							</thead>
							<tbody>
								{PARTICIPANTES.map(p => (
									<tr
										key={p.name}
										className="border-b border-on-surface/5 last:border-0"
									>
										<td className="p-4 font-medium">{p.name}</td>
										<td className="p-4 text-right text-on-surface-variant">
											—
										</td>
										<td className="p-4 text-right text-on-surface-variant">
											—
										</td>
										<td className="p-4 text-right text-on-surface-variant">
											—
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>

				<div>
					<h2 className="font-headline-md md:font-headline-lg text-foreground mb-6">
						Fechas
					</h2>
					<div className="card p-4">
						<div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-2">
							{matchdays.map(date => {
								const isToday = date === today
								const isSelected = date === selectedDate
								let cls =
									"text-center p-3 rounded-lg transition-colors cursor-pointer"

								if (isSelected) {
									cls += " bg-primary/80 text-on-primary ring ring-foreground/5"
								} else if (isToday) {
									cls += "bg-red-500 ring-2 ring-primary text-on-surface"
								} else {
									cls += " bg-surface-container text-on-surface"
								}

								return (
									<button
										key={date}
										type="button"
										className={cls}
										onClick={() => setSelectedDate(date)}
									>
										<div className="text-xs text-inherit opacity-70">
											{dayName(date)}
										</div>
										<div className="font-bold text-sm">{formatDate(date)}</div>
									</button>
								)
							})}
						</div>
					</div>
				</div>

				<div>
					<h2 className="font-headline-md md:font-headline-lg text-foreground mb-6">
						Partidos — {formatDate(selectedDate)}
					</h2>
					<div className="grid grid-cols-1 gap-4">
						{dateFixtures.length === 0 ? (
							<div className="p-8 text-center text-on-surface-variant italic">
								No hay partidos en esta fecha
							</div>
						) : (
							dateFixtures.map(({ fixture, homeTeam, awayTeam }) => (
								<div key={fixture.id} className="flex flex-col">
									<FixtureCard
										fixture={fixture}
										homeTeam={homeTeam}
										awayTeam={awayTeam}
										onScoreChange={() => {}}
										showDate={false}
									/>
									<div className="divide-y divide-on-surface/5">
										{PARTICIPANTES.map(p => {
											const pred = p.results[fixture.id]
											return (
												<div
													key={p.name}
													className="flex items-center justify-between px-4 py-2 text-sm bg-surface-container/50"
												>
													<span className="font-medium w-1/3">{p.name}</span>
													<span className="font-mono tabular-nums w-1/3 text-center sm:pl-25">
														{pred ? `${pred.hs} - ${pred.as}` : "—"}
													</span>
													<span className="w-1/3"></span>
												</div>
											)
										})}
									</div>
								</div>
							))
						)}
					</div>
				</div>
			</section>
		</main>
	)
}
