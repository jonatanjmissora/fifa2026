import type { Fixture, Team } from "@/lib/data"

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
	const isLive = fixture.hs !== null

	return (
		<article className="bg-surface-container-lowest border-l-4 border-primary border-y border-r border-outline-variant/30 p-4 rounded-lg flex flex-col gap-4 shadow-sm">
			<div className="flex justify-between items-center border-b border-outline-variant/10 pb-2">
				<span className="font-label-caps text-[10px] text-on-surface-variant uppercase">
					{fixture.date} • {fixture.location}
				</span>
				<span
					className={`px-3 py-1 rounded-full text-[10px] font-bold ${
						isLive
							? "bg-primary text-on-primary"
							: "bg-surface-container-high text-on-surface-variant"
					}`}
				>
					{isLive ? "LIVE" : "UPCOMING"}
				</span>
			</div>
			<div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
				<div className="flex items-center gap-3">
					<img
						src={homeTeam.flag}
						alt={homeTeam.name}
						className="w-10 h-6 object-cover rounded-sm shadow-sm"
					/>
					<span className="font-headline-md text-on-surface">
						{fixture.home}
					</span>
				</div>
				<div className="flex items-center gap-2">
					<input
						className={`w-12 h-14 text-center font-score-display rounded-lg border-none focus:ring-2 focus:ring-primary transition-all ${
							isLive
								? "bg-primary text-on-primary"
								: "bg-surface-container text-on-surface"
						}`}
						type="number"
						value={fixture.hs ?? ""}
						placeholder="-"
						onChange={e => onScoreChange(fixture.id, "home", e.target.value)}
					/>
					<span className="text-on-surface-variant font-bold">vs</span>
					<input
						className={`w-12 h-14 text-center font-score-display rounded-lg border-none focus:ring-2 focus:ring-primary transition-all ${
							isLive
								? "bg-primary text-on-primary"
								: "bg-surface-container text-on-surface"
						}`}
						type="number"
						value={fixture.as ?? ""}
						placeholder="-"
						onChange={e => onScoreChange(fixture.id, "away", e.target.value)}
					/>
				</div>
				<div className="flex items-center justify-end gap-3">
					<span className="font-headline-md text-on-surface">
						{fixture.away}
					</span>
					<img
						src={awayTeam.flag}
						alt={awayTeam.name}
						className="w-10 h-6 object-cover rounded-sm shadow-sm"
					/>
				</div>
			</div>
		</article>
	)
}
