export type MatchTeam = {
	id: number
	name: string
	shortName: string
	crest: string
}

export type MatchFixture = {
	id: number
	date: string
	homeTeam: MatchTeam
	awayTeam: MatchTeam
	scoreHref: string
	oddsHome: number
	oddsDraw: number
	oddsAway: number
}

export const nextMatches: MatchFixture[] = [
	{
		id: 537403,
		date: "2026/06/17, 14h00",
		homeTeam: {
			id: 765,
			name: "Portugal",
			shortName: "POR",
			crest: "/flags/765.svg",
		},
		awayTeam: {
			id: 1934,
			name: "Congo DR",
			shortName: "COD",
			crest: "/flags/congo_dr.svg",
		},
		scoreHref: "/match/537403",
		oddsHome: 1.27,
		oddsDraw: 5.52,
		oddsAway: 9.93,
	},
	{
		id: 537409,
		date: "2026/06/17, 17h00",
		homeTeam: {
			id: 770,
			name: "England",
			shortName: "ENG",
			crest: "/flags/770.svg",
		},
		awayTeam: {
			id: 799,
			name: "Croatia",
			shortName: "CRO",
			crest: "/flags/799.svg",
		},
		scoreHref: "/match/537409",
		oddsHome: 1.7,
		oddsDraw: 3.69,
		oddsAway: 4.77,
	},
	{
		id: 537410,
		date: "2026/06/17, 20h00",
		homeTeam: {
			id: 763,
			name: "Ghana",
			shortName: "GHA",
			crest: "/flags/ghana.svg",
		},
		awayTeam: {
			id: 1836,
			name: "Panama",
			shortName: "PAN",
			crest: "/flags/panama.svg",
		},
		scoreHref: "/match/537410",
		oddsHome: 1.94,
		oddsDraw: 3.44,
		oddsAway: 3.78,
	},
	{
		id: 537404,
		date: "2026/06/17, 23h00",
		homeTeam: {
			id: 8070,
			name: "Uzbekistan",
			shortName: "UZB",
			crest: "/flags/8070.svg",
		},
		awayTeam: {
			id: 818,
			name: "Colombia",
			shortName: "COL",
			crest: "/flags/818.svg",
		},
		scoreHref: "/match/537404",
		oddsHome: 7.47,
		oddsDraw: 4.4,
		oddsAway: 1.4,
	},
	{
		id: 537329,
		date: "2026/06/18, 13h00",
		homeTeam: {
			id: 798,
			name: "Czechia",
			shortName: "CZE",
			crest: "/flags/798.svg",
		},
		awayTeam: {
			id: 774,
			name: "South Africa",
			shortName: "RSA",
			crest: "/flags/9396.svg",
		},
		scoreHref: "/match/537329",
		oddsHome: 1.96,
		oddsDraw: 3.14,
		oddsAway: 3.84,
	},
	{
		id: 537335,
		date: "2026/06/18, 16h00",
		homeTeam: {
			id: 788,
			name: "Switzerland",
			shortName: "SUI",
			crest: "/flags/788.svg",
		},
		awayTeam: {
			id: 1060,
			name: "Bosnia-Herzegovina",
			shortName: "BIH",
			crest: "/flags/bosnia.svg",
		},
		scoreHref: "/match/537335",
		oddsHome: 1.52,
		oddsDraw: 3.91,
		oddsAway: 5.83,
	},
	{
		id: 537336,
		date: "2026/06/18, 19h00",
		homeTeam: {
			id: 828,
			name: "Canada",
			shortName: "CAN",
			crest: "/flags/canada.svg",
		},
		awayTeam: {
			id: 8030,
			name: "Qatar",
			shortName: "QAT",
			crest: "/flags/8030.svg",
		},
		scoreHref: "/match/537336",
		oddsHome: 1.48,
		oddsDraw: 3.85,
		oddsAway: 6.63,
	},
	{
		id: 537330,
		date: "2026/06/18, 22h00",
		homeTeam: {
			id: 769,
			name: "Mexico",
			shortName: "MEX",
			crest: "/flags/769.svg",
		},
		awayTeam: {
			id: 772,
			name: "South Korea",
			shortName: "KOR",
			crest: "/flags/772.svg",
		},
		scoreHref: "/match/537330",
		oddsHome: 1.78,
		oddsDraw: 3.31,
		oddsAway: 4.33,
	},
	{
		id: 537348,
		date: "2026/06/19, 16h00",
		homeTeam: {
			id: 771,
			name: "United States",
			shortName: "USA",
			crest: "/flags/usa.svg",
		},
		awayTeam: {
			id: 779,
			name: "Australia",
			shortName: "AUS",
			crest: "/flags/779.svg",
		},
		scoreHref: "/match/537348",
		oddsHome: 1.7,
		oddsDraw: 3.5,
		oddsAway: 4.63,
	},
	{
		id: 537342,
		date: "2026/06/19, 19h00",
		homeTeam: {
			id: 8873,
			name: "Scotland",
			shortName: "SCO",
			crest: "/flags/814.svg",
		},
		awayTeam: {
			id: 815,
			name: "Morocco",
			shortName: "MAR",
			crest: "/flags/morocco.svg",
		},
		scoreHref: "/match/537342",
		oddsHome: 3.52,
		oddsDraw: 3.13,
		oddsAway: 2.05,
	},
]
