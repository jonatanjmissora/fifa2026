import { Home, Grid3X3, Trophy } from "lucide-react"

type View = "home" | "groups" | "table"

type BottomNavProps = {
	activeView: View
	onViewChange: (view: View) => void
}

const navItems = [
	{ id: "home" as const, label: "Home", icon: Home },
	{ id: "groups" as const, label: "Groups", icon: Grid3X3 },
	{ id: "table" as const, label: "Table", icon: Trophy },
]

export function BottomNav({ activeView, onViewChange }: BottomNavProps) {
	return (
		<nav className="fixed bottom-0 w-full lg:hidden z-50 flex justify-around items-center h-16 bg-surface/95 backdrop-blur-sm border-t border-outline-variant/50 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
			{navItems.map(item => {
				const Icon = item.icon
				const isActive = activeView === item.id
				return (
					<button
						key={item.id}
						type="button"
						className={`flex flex-col items-center justify-center cursor-pointer ${
							isActive ? "text-foreground" : "text-on-surface-variant"
						}`}
						onClick={() => onViewChange(item.id)}
					>
						<Icon size={20} />
						<span className="font-label-caps text-[10px]">{item.label}</span>
					</button>
				)
			})}
		</nav>
	)
}
