import { Link, useNavigate, useRouteContext } from "@tanstack/react-router"
import { LogOut } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { authClient } from "@/lib/auth-client"
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "./ui/alert-dialog"
import { capitalize } from "@/lib/utils"

export default function Header() {
	const { session } = useRouteContext({ from: "__root__" })

	return (
		<header className="py-4 w-full">
			<nav className="flex items-center justify-between w-full">
				<Link to="/" className="text-xl font-semibold flex gap-2 items-center">
					<span className="text-2xl font-bold">FIFA 26</span>
				</Link>

				{session ? (
					<div className="">
						<DropdownMenuDemo name={session.user?.name} user={session.user} />
					</div>
				) : null}
			</nav>
		</header>
	)
}

export function DropdownMenuDemo({
	name,
	user,
}: {
	name: string
	user: { email?: string | null }
}) {
	const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
	const isAdmin = user.email === "jonatanjmissora@gmail.com"

	return (
		<DropdownMenu open={isUserMenuOpen} onOpenChange={setIsUserMenuOpen}>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="text-lg cursor-pointer flex justify-end items-center gap-1 px-0"
				>
					<span className="hidden sm:block">Bienvenido</span>
					<span> {capitalize(name)}</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-40 p-4" align="end">
				<DropdownMenuGroup>
					{isAdmin && (
						<Link to="/admin" onClick={() => setIsUserMenuOpen(false)}>
							<DropdownMenuItem className="cursor-pointer flex justify-center">
								Admin
							</DropdownMenuItem>
						</Link>
					)}
					<LogoutAlertDialog setUserMenuOpen={setIsUserMenuOpen} />
					<DropdownMenuSeparator />
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export function LogoutAlertDialog({
	setUserMenuOpen,
}: {
	setUserMenuOpen: (open: boolean) => void
}) {
	const [open, setOpen] = useState(false)
	const navigate = useNavigate()
	const logout = async () => {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					navigate({ to: "/login" })
					setUserMenuOpen(false)
				},
			},
		})
	}

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild className="w-[75%] m-4 hover:bg-accent">
				<span className="flex justify-end p-2 rounded-sm cursor-pointer text-sm items-center gap-2">
					Salir <LogOut size={14} className="text-muted-foreground" />
				</span>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogTitle>
					¿Estás seguro de que quieres cerrar sesión?
				</AlertDialogTitle>
				<AlertDialogDescription>
					Esto cerrará tu sesión y necesitarás iniciar sesión de nuevo.
				</AlertDialogDescription>
				<div className="flex justify-end gap-4">
					<Button
						variant="outline"
						className="cursor-pointer"
						onClick={() => {
							setOpen(false)
							setUserMenuOpen(false)
						}}
					>
						Cancelar
					</Button>
					<Button className="cursor-pointer" onClick={logout}>
						Confirmar
					</Button>
				</div>
			</AlertDialogContent>
		</AlertDialog>
	)
}
