export function LoadingResults() {
	return (
		<main className="flex-1 text-on-surface mb-24 lg:pb-0">
			<section className="py-6">
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
					{Array.from({ length: 12 }).map((_, i) => (
						<div key={i} className="card animate-pulse p-4 space-y-3">
							<div className="h-6 w-16 bg-on-surface/10 rounded" />
							<div className="space-y-2">
								<div className="h-4 w-full bg-on-surface/10 rounded" />
								<div className="h-4 w-3/4 bg-on-surface/10 rounded" />
								<div className="h-4 w-5/6 bg-on-surface/10 rounded" />
							</div>
						</div>
					))}
				</div>
			</section>
		</main>
	)
}

export function LoadingGroups() {
	return (
		<main className="w-full mx-auto flex flex-col text-on-surface mb-24 lg:pb-0">
			<section className="flex-1 py-6 animate-pulse">
				<div className="flex gap-2 overflow-x-auto hide-scrollbar card p-4 mb-6">
					{Array.from({ length: 12 }).map((_, i) => (
						<div
							key={i}
							className="shrink-0 h-10 w-12 rounded-lg bg-on-surface/10"
						/>
					))}
				</div>

				<div className="flex flex-col gap-8">
					<div className="card p-4 space-y-3">
						<div className="h-8 w-1/3 bg-on-surface/10 rounded" />
						{Array.from({ length: 4 }).map((_, i) => (
							<div key={i} className="flex gap-4">
								<div className="h-5 w-1/2 bg-on-surface/10 rounded" />
								<div className="h-5 w-1/4 bg-on-surface/10 rounded" />
								<div className="h-5 w-1/4 bg-on-surface/10 rounded" />
							</div>
						))}
					</div>

					<div>
						<div className="h-8 w-32 bg-on-surface/10 rounded mb-4" />
						<div className="grid grid-cols-1 gap-4">
							{Array.from({ length: 3 }).map((_, i) => (
								<div key={i} className="card p-4 flex justify-between">
									<div className="space-y-2 w-1/3">
										<div className="h-5 w-full bg-on-surface/10 rounded" />
										<div className="h-5 w-3/4 bg-on-surface/10 rounded" />
									</div>
									<div className="h-10 w-20 bg-on-surface/10 rounded" />
									<div className="space-y-2 w-1/3 text-right">
										<div className="h-5 w-full bg-on-surface/10 rounded" />
										<div className="h-5 w-3/4 bg-on-surface/10 ml-auto rounded" />
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>
		</main>
	)
}
