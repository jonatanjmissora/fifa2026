// src/routes/_protected/groups.tsx
import React, { useState, useEffect } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";

// Static data (could be moved to a separate module later)
const GROUPS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"] as const;

type Team = {
  id: string;
  name: string;
  flag: string;
};

type Match = {
  id: number;
  home: string;
  away: string;
  date: string;
  location: string;
  hs: number | null;
  as: number | null;
};

const TEAMS: Record<string, Team[]> = {
  A: [
    { id: "MEX", name: "Mexico", flag: "https://lh3.googleusercontent.com/aida-public/AB6AXuDobHB78BiUMqDWdgd5OlJmipUNGx_sz-KsqUH8uhHC-l2ielT0YQ-IwJcmVFcyMyWeaQ6YwHLW6SX2PdPi9gnQpogVDiOxM9E4JARJMhpGEb4XGaq1koxX2fFYbavWLISROq_-Csp2-gQyO8C1IFgfIga_3R3f69VQ9qtpHjZOCClQ8zX5OJPQaEM2tCsyypIDwqje_Q0XEcjQk3uWUrqoAFI8Gn1kWYo3PtGb7bjcLa4Xm4wsWj9KgDvDKfHlns6CXl9Y1ZwqVtU" },
    { id: "RSA", name: "South Africa", flag: "https://lh3.googleusercontent.com/aida-public/AB6AXuA5D7Eb2GdlZ9IicTqQ7Bu3OtUu0ivQYiYIT9beaW6Ay7iZeBV2dRr2xmeCvr7SXpIYZJOrFwH6VlqNyJdWefMTJB2DY3-uDncrj2Fic67WZTg_vQ9CCYZ0ycDHZhoXbvGVbYlt8KextbpBdnCu8DImQKcJxhRN8tx8CVZWFu0lAzXHKBX9mOkvKMdKr3NPjOWe2Noe-2WZ7unoUwuTVnW2vd7ySBqvYUNChBnYZqDCWmC2dNGiyKZLbldcvV53jIyxuQEjdVH311U" },
    { id: "KOR", name: "Korea Rep.", flag: "https://lh3.googleusercontent.com/aida-public/AB6AXuAG4d1x-aM3bnvujaYHN4IKgo2PZFzABCx6s7QrMCBKg6nGxN_HH6uEeUr69NkflJqRWMDzLI2T9f8zul_bIsDanTdItu9YW23NtJ5NxagNTnFxV4aJszRq5obuGMav3uF3R0vZ3wQzYN1SL_FogFeGyac4Epf82M5aDdnP3TFaB4OILJmqAdGPcW4B5MxoeaxKMUkja01wNTn6IRSBB5TVXZNdTi48SAsm4yBeGIb9TUvGqo3eAqxXinp3-khxyM1nqDhXI14B69A" },
    { id: "CZE", name: "Czechia", flag: "https://lh3.googleusercontent.com/aida-public/AB6AXuBseCt65wikSWPqFU0j7FyVlxt31GrS8P8R4a7vptlrh9vD5ptK_dk_-bAsXd3K2P9OLagwiy7Gs5W-5dtghUHS2xvjS2rAmtIpRQpBxejmmZONdQnwFc7jpLPtD9hiHDTYriWO3Dm6ksNhP-7qVYVNpCf6La2om1AZiGYzJ5vvAS01MobQu5K4lHg696GVAxdFJI6BzpBRUsZpD6vU3HUNA4Ibvlpo6wp_4lfqN3csq5KpZhP8kgqxWFvdMd9dtJMT2Q4iuIEYz-w" },
  ],
  // Additional groups can be added later.
};

const FIXTURES: Record<string, Match[]> = {
  A: [
    { id: 1, home: "MEX", away: "RSA", date: "Jueves 11 de Junio - 16:00hs", location: "Estadio Azteca", hs: null, as: null },
    { id: 2, home: "KOR", away: "CZE", date: "Jueves 11 de Junio - 19:00hs", location: "Estadio Guadalajara", hs: 1, as: 0 },
    { id: 3, home: "KOR", away: "RSA", date: "Jueves 18 de Junio - 15:00hs", location: "Mercedes-Benz Stadium", hs: null, as: null },
    { id: 4, home: "MEX", away: "CZE", date: "Jueves 18 de Junio - 20:00hs", location: "Estadio Guadalajara", hs: null, as: null },
    { id: 5, home: "RSA", away: "CZE", date: "Miércoles 24 de Junio - 17:00hs", location: "Estadio Monterrey", hs: null, as: null },
    { id: 6, home: "KOR", away: "MEX", date: "Miércoles 24 de Junio - 20:00hs", location: "Estadio Azteca", hs: null, as: null },
  ],
  // Other groups can be added later.
};

// Helper to compute standings for a group
function calculateStandings(group: string) {
  const teams = TEAMS[group] ?? [];
  const standings = teams.map(t => ({ ...t, mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 }));
  const fixtures = FIXTURES[group] ?? [];

  fixtures.forEach(match => {
    if (match.hs !== null && match.as !== null) {
      const home = standings.find(t => t.id === match.home)!;
      const away = standings.find(t => t.id === match.away)!;
      home.mp++; away.mp++;
      home.gf += match.hs; home.ga += match.as;
      away.gf += match.as; away.ga += match.hs;
      if (match.hs > match.as) { home.w++; home.pts += 3; away.l++; }
      else if (match.hs < match.as) { away.w++; away.pts += 3; home.l++; }
      else { home.d++; away.d++; home.pts += 1; away.pts += 1; }
    }
  });
  standings.forEach(t => (t.gd = t.gf - t.ga));
  return standings.sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf);
}

export const Route = createFileRoute("/_protected/groups")({
  component: GroupsPage,
});

function GroupsPage() {
  const [activeGroup, setActiveGroup] = useState<string>(GROUPS[0]);
  const [standings, setStandings] = useState<any[]>([]);

  useEffect(() => {
    setStandings(calculateStandings(activeGroup));
  }, [activeGroup]);

  const groupTeams = TEAMS[activeGroup] ?? [];
  const groupFixtures = FIXTURES[activeGroup] ?? [];

  const updateScore = (matchId: number, side: "home" | "away", value: string) => {
    const match = groupFixtures.find(m => m.id === matchId);
    const score = value === "" ? null : parseInt(value, 10);
    if (side === "home") match!.hs = score; else match!.as = score;
    setStandings(calculateStandings(activeGroup));
  };

  return (
    <main className="max-w-container-max mx-auto flex flex-col lg:flex-row bg-background text-on-surface pb-24 lg:pb-0">
      {/* Side navigation – groups list */}
      <aside className="h-screen w-64 hidden lg:flex flex-col border-r border-outline-variant/30 bg-surface-container-low p-4">
        <h2 className="font-headline-md text-primary mb-4">Grupos</h2>
        <nav className="flex flex-col gap-1 overflow-y-auto hide-scrollbar">
          {GROUPS.map(g => (
            <button
              key={g}
              className={`flex items-center gap-3 p-3 rounded-lg transition ${g === activeGroup ? `bg-primary text-on-primary font-bold` : `text-on-surface hover:bg-surface-container-high`}`}
              onClick={() => setActiveGroup(g)}
            >
              <span className="material-symbols-outlined">grid_view</span>
              <span className="font-label-caps">Group {g}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <section className="flex-1 px-margin-mobile md:px-margin-desktop py-6">
        {/* Group standings */}
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 overflow-hidden shadow-sm mb-6">
          <div className="bg-primary px-4 py-3 text-on-primary font-headline-md flex justify-between items-center">
            <span>Group {activeGroup} Standing</span>
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
                  <th className="px-2 py-3 text-center">GD</th>
                  <th className="px-4 py-3 text-right font-bold text-primary">PTS</th>
                </tr>
              </thead>
              <tbody>
                {standings.map((t, i) => (
                  <tr key={t.id} className="border-b border-outline-variant/10 hover:bg-surface-container-low transition-colors">
                    <td className="px-4 py-3 font-label-caps text-on-surface-variant">{i + 1}</td>
                    <td className="px-4 py-3 flex items-center gap-3">
                      <img src={t.flag} alt={t.name} className="w-6 h-4 object-cover rounded-[2px]" />
                      <span className="font-bold">{t.id}</span>
                    </td>
                    <td className="px-2 py-3 text-center">{t.mp}</td>
                    <td className="px-2 py-3 text-center">{t.w}</td>
                    <td className="px-2 py-3 text-center">{t.d}</td>
                    <td className="px-2 py-3 text-center">{t.l}</td>
                    <td className="px-2 py-3 text-center">{t.gf}</td>
                    <td className="px-2 py-3 text-center">{t.ga}</td>
                    <td className="px-2 py-3 text-center font-bold">{t.gd > 0 ? "+${t.gd}" : t.gd}</td>
                    <td className="px-4 py-3 text-right font-bold text-primary">{t.pts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Fixtures */}
        <div>
          <h2 className="font-headline-md text-primary mb-4">Fixtures – Group {activeGroup}</h2>
          <p className="font-body-md text-on-surface-variant" id="active-group-teams">
            {groupTeams.map(t => t.name).join(", ")}
          </p>
          <div className="grid gap-4">
            {groupFixtures.map(m => {
              const homeTeam = groupTeams.find(t => t.id === m.home)!;
              const awayTeam = groupTeams.find(t => t.id === m.away)!;
              return (
                <article key={m.id} className="bg-surface-container-lowest border-l-4 border-primary border-y border-r border-outline-variant/30 p-4 rounded-lg flex flex-col gap-4 shadow-sm">
                  <div className="flex justify-between items-center border-b border-outline-variant/10 pb-2">
                    <span className="font-label-caps text-[10px] text-on-surface-variant uppercase">{m.date} • {m.location}</span>
                    <span className={`bg-surface-container-high text-on-surface-variant px-3 py-1 rounded-full text-[10px] font-bold`}>{m.hs !== null ? `LIVE` : `UPCOMING`}</span>
                  </div>
                  <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
                    <div className="flex items-center gap-3">
                      <img src={homeTeam.flag} alt={homeTeam.name} className="w-10 h-6 object-cover rounded-sm shadow-sm" />
                      <span className="font-headline-md text-on-surface">{m.home}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        className={`w-12 h-14 ${m.hs !== null ? `bg-primary text-on-primary` : `bg-surface-container`} text-center font-score-display rounded-lg border-none focus:ring-2 focus:ring-primary transition-all`}
                        type="number"
                        value={m.hs ?? ""}
                        placeholder="-"
                        onChange={e => updateScore(m.id, "home", e.target.value)}
                      />
                      <span className="text-on-surface-variant font-bold">vs</span>
                      <input
                        className={`w-12 h-14 ${m.as !== null ? `bg-primary text-on-primary` : `bg-surface-container`} text-center font-score-display rounded-lg border-none focus:ring-2 focus:ring-primary transition-all`}
                        type="number"
                        value={m.as ?? ""}
                        placeholder="-"
                        onChange={e => updateScore(m.id, "away", e.target.value)}
                      />
                    </div>
                    <div className="flex items-center justify-end gap-3">
                      <span className="font-headline-md text-on-surface">{m.away}</span>
                      <img src={awayTeam.flag} alt={awayTeam.name} className="w-10 h-6 object-cover rounded-sm shadow-sm" />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
