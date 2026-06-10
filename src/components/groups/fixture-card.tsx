import type { Fixture, Team } from "@/lib/data"
import { Clock } from "lucide-react"

type FixtureCardProps = {
	fixture: Fixture
	homeTeam: Team
	awayTeam: Team
	onScoreChange: (
		fixtureId: number,
		side: "home" | "away",
		value: string
	) => void
}

export function FixtureCard({
	fixture,
	homeTeam,
	awayTeam,
	onScoreChange,
}: FixtureCardProps) {
	const date = fixture.date.split(" ")[0]
	const time = fixture.date.split(" ")[1]

	return (
		<article className="card flex flex-col sm:flex-row gap-4">
			<div className="flex justify-between items-center ">
				<div className="hidden sm:flex font-mono text-base sm:text-xl gap-6 items-center w-full">
					<span>{date}</span>
					<span className="flex gap-1 items-center text-amber-600">
						<Clock size={16} />
						{time}
					</span>
				</div>
				<div className="sm:hidden font-mono text-base sm:text-xl flex justify-between items-center w-full mb-3">
					<span>{date}</span>
					<span className="flex gap-1 items-center text-amber-600">
						<Clock size={16} />
						{time}
					</span>
				</div>
			</div>
			<div className="flex-1 flex justify-around sm:justify-center items-start sm:items-center gap-4">
				<div className="flex items-center gap-1 sm:gap-3 w-1/3 justify-end flex-col sm:flex-row">
					<img
						src={homeTeam.flag}
						alt={homeTeam.name}
						className="w-10 h-6 object-cover rounded-sm shadow-sm"
					/>
					<span className="text-sm sm:text-xl font-semibold text-center text-on-surface">
						{homeTeam.name.toUpperCase()}
					</span>
				</div>
				<div className="flex items-center gap-1 sm:gap-6 w-1/3 justify-center">
					<input
						className={`w-12 sm:w-20 h-10 sm:h-14 text-center font-score-display text-black/80 rounded-lg border-none focus:ring-2 focus:ring-primary transition-all bg-white/90`}
						type="number"
						value={fixture.hs ?? ""}
						placeholder="-"
						onChange={e => onScoreChange(fixture.id, "home", e.target.value)}
					/>
					<span className="font-bold text-xl">vs</span>
					<input
						className={`w-12 sm:w-20 h-10 sm:h-14 text-center font-score-display text-black/80 rounded-lg border-none focus:ring-2 focus:ring-primary transition-all bg-white/90`}
						type="number"
						value={fixture.as ?? ""}
						placeholder="-"
						onChange={e => onScoreChange(fixture.id, "away", e.target.value)}
					/>
				</div>
				<div className="flex items-center gap-1 sm:gap-3 w-1/3 justify-start flex-col sm:flex-row">
					<img
						src={awayTeam.flag}
						alt={awayTeam.name}
						className="w-10 h-6 object-cover rounded-sm shadow-sm"
					/>
					<span className="text-sm sm:text-xl font-semibold text-center text-on-surface">
						{awayTeam.name.toUpperCase()}
					</span>
				</div>
			</div>
		</article>
	)
}
