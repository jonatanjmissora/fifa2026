import type { Fixture, Team } from "./data"

export type Standing = Team & {
	mp: number
	w: number
	d: number
	l: number
	gf: number
	ga: number
	gd: number
	pts: number
}

export function calculateStandings(
	teams: Team[],
	fixtures: Fixture[]
): Standing[] {
	const standings: Standing[] = teams.map(t => ({
		...t,
		mp: 0,
		w: 0,
		d: 0,
		l: 0,
		gf: 0,
		ga: 0,
		gd: 0,
		pts: 0,
	}))

	for (const match of fixtures) {
		if (match.hs === null || match.as === null) continue

		const home = standings.find(t => t.id === match.home)
		const away = standings.find(t => t.id === match.away)
		if (!home || !away) continue

		home.mp++
		away.mp++
		home.gf += match.hs
		home.ga += match.as
		away.gf += match.as
		away.ga += match.hs

		if (match.hs > match.as) {
			home.w++
			home.pts += 3
			away.l++
		} else if (match.hs < match.as) {
			away.w++
			away.pts += 3
			home.l++
		} else {
			home.d++
			away.d++
			home.pts += 1
			away.pts += 1
		}
	}

	for (const t of standings) {
		t.gd = t.gf - t.ga
	}

	return standings.sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf)
}
