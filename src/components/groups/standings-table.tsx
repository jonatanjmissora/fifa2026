import type { Standing } from "@/lib/standings"
import { Flag } from "@/components/ui/flag"

type StandingsTableProps = {
	standings: Standing[]
}

export function StandingsTable({ standings }: StandingsTableProps) {
	return (
		<div className="card overflow-hidden">
			<div className="text-on-primary font-headline-md flex justify-between items-center"></div>
			<div className="overflow-x-auto">
				<div className="w-full text-sm tracking-wider">
					<div className="text-on-surface-variant/60 border-b-[0.25px] border-foreground/50 font-label-caps w-full flex">
						<span className="pb-4 w-1/2"></span>
						<div className="w-1/2 grid grid-cols-6 text-[10px]">
							<span className="text-center font-normal">P</span>
							<span className="text-center font-normal">PG</span>
							<span className="text-center font-normal">PE</span>
							<span className="text-center font-normal">PP</span>
							<span className="text-center font-normal">DIF</span>
							<span className="text-center font-normal">PTS</span>
						</div>
					</div>
					<div className="w-full">
						{standings.map(t => (
							<div key={t.id} className="flex w-full items-center">
								<span className="py-2 flex items-center gap-2 font-semibold w-1/2">
									<Flag src={t.flag} alt={t.name} className="w-5 h-4" />
									<span className="truncate">{t.name}</span>
								</span>
								<div className="w-1/2 grid grid-cols-6">
									<span className="text-center">{t.mp}</span>
									<span className="text-center">{t.w}</span>
									<span className="text-center">{t.d}</span>
									<span className="text-center">{t.l}</span>
									<span className="text-center">
										{t.gd > 0 ? `+${t.gd}` : t.gd}
									</span>
									<span className="text-center font-bold text-foreground">
										{t.pts}
									</span>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
