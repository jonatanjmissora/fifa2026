import { cn } from "@/lib/utils"
import type { MatchTeam } from "@/lib/matches-data"
import { Flag } from "@/components/ui/flag"

type TeamLabelProps = {
	team: MatchTeam
	className?: string
}

export function TeamLabel({ team, className }: TeamLabelProps) {
	return (
		<div
			className={cn(
				"content hover:cursor-pointer flex max-w-28 truncate",
				className
			)}
		>
			<span>
				<Flag
					src={team.crest}
					alt={team.name}
					className="max-h-5 w-5 crest-img inline-block align-middle"
				/>
				<span className="hidden text-on-surface-variant align-middle md:inline-block">
					{team.name}
				</span>
				<span className="hidden text-on-surface-variant align-middle sm:inline-block max-w-16 md:hidden">
					{team.name}
				</span>
				<span className="inline-block sm:hidden text-on-surface-variant">
					{team.shortName}
				</span>
			</span>
		</div>
	)
}
