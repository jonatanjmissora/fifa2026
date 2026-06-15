import type { Fixture, Team } from "@/lib/data"
import { Clock } from "lucide-react"
import { Flag } from "@/components/ui/flag"

type FixtureCardProps = {
	fixture: Fixture
	homeTeam: Team
	awayTeam: Team
	onScoreChange: (
		fixtureId: number,
		side: "home" | "away",
		value: string
	) => void
	showDate?: boolean
	group?: string
	showGroup?: boolean
}

export function FixtureCard({
	fixture,
	homeTeam,
	awayTeam,
	onScoreChange,
	showDate = true,
	group,
	showGroup = false,
}: FixtureCardProps) {
	const date = fixture.date.split(" ")[0]
	const time = fixture.date.split(" ")[1]

	return (
		<article className="card flex flex-col sm:flex-row gap-4">
			<div className="flex justify-between items-center ">
				<div className="hidden sm:flex font-mono text-base sm:text-xl gap-6 items-center w-full">
					{showGroup && group && (
						<span className="font-label-caps text-xs px-2 py-0.5 rounded bg-on-surface/10 text-on-surface-variant">
							Grupo {group}
						</span>
					)}
					{showDate && <span>{date}</span>}
					<span className="flex gap-1 items-center text-amber-600">
						<Clock size={16} />
						{time}
					</span>
				</div>
				<div className="sm:hidden font-mono text-base sm:text-xl flex justify-between items-center w-full mb-3">
					{showGroup && group && (
						<span className="font-label-caps tracking-widest px-2 py-0.5 rounded bg-on-surface/10 text-on-surface-variant">
							GRUPO {group}
						</span>
					)}
					{showDate && <span>{date}</span>}
					<span className="flex gap-1 items-center text-amber-600">
						<Clock size={16} />
						{time}
					</span>
				</div>
			</div>
			<div className="flex-1 flex justify-around sm:justify-center items-start sm:items-center gap-4">
				<div className="flex items-center gap-1 sm:gap-3 w-1/3 justify-end flex-col sm:flex-row">
					<Flag src={homeTeam.flag} alt={homeTeam.name} className="w-10 h-6" />
					<span className="text-sm sm:text-xl font-semibold text-center text-on-surface">
						{homeTeam.name.toUpperCase()}
					</span>
				</div>
				<div className="flex items-center gap-1 sm:gap-6 w-1/3 justify-center">
					<input
						className={`w-12 sm:w-20 h-10 sm:h-14 text-center font-score-display text-black/80 rounded-lg border-none focus:none bg-white/90`}
						type="number"
						value={fixture.hs ?? ""}
						placeholder="-"
						readOnly
						onChange={e => onScoreChange(fixture.id, "home", e.target.value)}
					/>
					<span className="font-bold text-xl">vs</span>
					<input
						className={`w-12 sm:w-20 h-10 sm:h-14 text-center font-score-display text-black/80 rounded-lg border-none focus:none bg-white/90`}
						type="number"
						value={fixture.as ?? ""}
						placeholder="-"
						readOnly
						onChange={e => onScoreChange(fixture.id, "away", e.target.value)}
					/>
				</div>
				<div className="flex items-center gap-1 sm:gap-3 w-1/3 justify-start flex-col sm:flex-row">
					<Flag src={awayTeam.flag} alt={awayTeam.name} className="w-10 h-6" />
					<span className="text-sm sm:text-xl font-semibold text-center text-on-surface">
						{awayTeam.name.toUpperCase()}
					</span>
				</div>
			</div>
		</article>
	)
}
