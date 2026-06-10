import type { Standing } from "@/lib/standings"

type StandingsTableProps = {
	standings: Standing[]
}

export function StandingsTable({ standings }: StandingsTableProps) {
	return (
		<div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 overflow-hidden shadow-sm">
			<div className="bg-primary px-4 py-3 text-on-primary font-headline-md flex justify-between items-center">
				<span>Standings</span>
				<span className="text-xs font-label-caps opacity-80">Live Update</span>
			</div>
			<div className="overflow-x-auto">
				<table className="w-full text-sm text-left">
					<thead className="bg-surface-container-high text-on-surface-variant font-label-caps text-[10px]">
						<tr>
							<th className="px-4 py-3">POS</th>
							<th className="px-4 py-3">TEAM</th>
							<th className="px-2 py-3 text-center">MP</th>
							<th className="px-2 py-3 text-center">W</th>
							<th className="px-2 py-3 text-center">D</th>
							<th className="px-2 py-3 text-center">L</th>
							<th className="px-2 py-3 text-center">GF</th>
							<th className="px-2 py-3 text-center">GA</th>
							<th className="px-2 py-3 text-center font-bold">GD</th>
							<th className="px-4 py-3 text-right font-bold text-primary">
								PTS
							</th>
						</tr>
					</thead>
					<tbody>
						{standings.map((t, i) => (
							<tr
								key={t.id}
								className="border-b border-outline-variant/10 hover:bg-surface-container-low transition-colors"
							>
								<td className="px-4 py-3 font-label-caps text-on-surface-variant">
									{i + 1}
								</td>
								<td className="px-4 py-3 flex items-center gap-3">
									<img
										src={t.flag}
										alt={t.name}
										className="w-6 h-4 object-cover rounded-[2px]"
									/>
									<span className="font-bold">{t.id}</span>
								</td>
								<td className="px-2 py-3 text-center">{t.mp}</td>
								<td className="px-2 py-3 text-center">{t.w}</td>
								<td className="px-2 py-3 text-center">{t.d}</td>
								<td className="px-2 py-3 text-center">{t.l}</td>
								<td className="px-2 py-3 text-center">{t.gf}</td>
								<td className="px-2 py-3 text-center">{t.ga}</td>
								<td className="px-2 py-3 text-center font-bold">
									{t.gd > 0 ? `+${t.gd}` : t.gd}
								</td>
								<td className="px-4 py-3 text-right font-bold text-primary">
									{t.pts}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}
