import type { GroupId } from "@/lib/data"
import type { Standing } from "@/lib/standings"

type GroupOverviewCardProps = {
	groupId: GroupId
	standings: Standing[] | null
	onClick: () => void
}

export function GroupOverviewCard({
	groupId,
	standings,
	onClick,
}: GroupOverviewCardProps) {
	return (
		<button
			type="button"
			className="bg-gray-500/20 border border-outline-variant/30 rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow text-left w-full"
			onClick={onClick}
		>
			<div className="flex justify-between items-center mb-3">
				<h3 className="font-headline-md text-primary">GRUPO {groupId}</h3>
			</div>
			{standings ? (
				<table className="w-full text-sm tracking-wider">
					<thead className="text-on-surface-variant/60 border-b-[0.25px] border-foreground/50 font-label-caps">
						<tr>
							<th className="pb-5"></th>
							<th className="text-center font-normal">P</th>
							<th className="text-center font-normal">PG</th>
							<th className="text-center font-normal">PE</th>
							<th className="text-center font-normal">PP</th>
							<th className="text-center font-normal">DIF</th>
							<th className="text-center font-normal">PTS</th>
						</tr>
					</thead>
					<tbody>
						{standings.map(t => (
							<tr key={t.id}>
								<td className="py-2 flex items-center gap-2 font-semibold">
									<img
										src={t.flag}
										alt={t.name}
										className="w-5 h-5 object-contain"
									/>
									<span className="truncate">{t.name}</span>
								</td>
								<td className="text-center">{t.mp}</td>
								<td className="text-center">{t.w}</td>
								<td className="text-center">{t.d}</td>
								<td className="text-center">{t.l}</td>
								<td className="text-center">{t.gd > 0 ? `+${t.gd}` : t.gd}</td>
								<td className="text-center font-bold text-primary">{t.pts}</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<div className="py-6 text-center text-on-surface-variant/40 text-xs italic">
					Matches pending
				</div>
			)}
		</button>
	)
}
