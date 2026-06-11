import { TanStackDevtools } from "@tanstack/react-devtools"
import type { QueryClient } from "@tanstack/react-query"
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
} from "@tanstack/react-router"
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools"
import Header from "../components/Header"

import appCss from "../styles.css?url"
import TanStackQueryDevtools from "../integrations/tanstack-query/devtools"
import { Toaster } from "sonner"
import { Session } from "better-auth"
import { DefaultCatchBoundary } from "@/components/DefaultCatchBoundary"
import { NotFound } from "@/components/NotFound"
import { getSession } from "server/get-session"

export type RouterContext = {
	session: Session | null
	queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "Fifa 26",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Anybody:wght@400;600;700;800&family=Hanken+Grotesk:wght@400;500;600&family=JetBrains+Mono:wght@600&display=swap",
			},
		],
	}),
	beforeLoad: async () => ({
		session: await getSession(),
	}),
	shellComponent: RootDocument,
	errorComponent: DefaultCatchBoundary,
	notFoundComponent: () => <NotFound />,
})

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="dark px-6 sm:px-[20svw] overflow-x-hidden overflow-y-scroll">
			<head>
				<HeadContent />
			</head>
			<body className="w-full flex flex-col min-h-screen relative mx-auto">
				<Header />
				{children}
				<Toaster />
				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
						TanStackQueryDevtools,
					]}
				/>
				<Scripts />
			</body>
		</html>
	)
}
