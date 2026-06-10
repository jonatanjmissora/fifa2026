import { teams } from "./teams"

export const GROUPS = [
	"A",
	"B",
	"C",
	"D",
	"E",
	"F",
	"G",
	"H",
	"I",
	"J",
	"K",
	"L",
] as const

export type GroupId = (typeof GROUPS)[number]

export type Team = {
	id: string
	name: string
	flag: string
}

export type Fixture = {
	id: number
	home: string
	away: string
	date: string
	location: string
	hs: number | null
	as: number | null
}

const teamMap = new Map(teams.map(t => [t.id, t]))

export const TEAMS: Record<GroupId, Team[]> = {} as Record<GroupId, Team[]>
for (const g of GROUPS) {
	TEAMS[g] = teams
		.filter(t => t.group === g)
		.map(t => ({
			id: t.letters,
			name: t.name,
			flag: t.flag,
		}))
}

let fixtureId = 0
export const FIXTURES: Record<GroupId, Fixture[]> = {} as Record<
	GroupId,
	Fixture[]
>
for (const g of GROUPS) {
	const groupTeams = teams.filter(t => t.group === g)
	const fixtures: Fixture[] = []
	const seen = new Set<string>()

	for (const team of groupTeams) {
		for (const match of team.matches) {
			const opponent = teamMap.get(match.opponent)
			if (!opponent) continue
			const key = [team.id, match.opponent].sort((a, b) => a - b).join("-")
			if (seen.has(key)) continue
			seen.add(key)

			fixtureId++
			fixtures.push({
				id: fixtureId,
				home: team.letters,
				away: opponent.letters,
				date: `${match.date} ${match.time}`,
				location: "",
				hs: null,
				as: null,
			})
		}
	}

	fixtures.sort((a, b) => a.date.localeCompare(b.date))

	FIXTURES[g] = fixtures
}
