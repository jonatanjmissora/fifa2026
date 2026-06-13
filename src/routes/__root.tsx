import { lazy, Suspense } from "react"
import type { QueryClient } from "@tanstack/react-query"
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
} from "@tanstack/react-router"
import Header from "../components/Header"
import appCss from "../styles.css?url"
import { Toaster } from "sonner"
import type { Session } from "better-auth"
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
			{
				name: "description",
				content:
					"Muestra resultados y posiciones de los equipos participantes de la copa del mundo Fifa2026",
			},
		],
		links: [
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com",
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous",
			},
			{
				rel: "preload",
				href: "/background.webp",
				as: "image",
			},
			{
				rel: "preload",
				href: "/flags-sprite.svg",
				as: "image",
				fetchPriority: "high",
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Anybody:wght@400;600;700;800&family=Hanken+Grotesk:wght@400;500;600&family=JetBrains+Mono:wght@600&display=swap",
			},
			{
				rel: "stylesheet",
				href: appCss,
			},
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg",
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

function Devtools() {
	if (import.meta.env.PROD) return null
	const TanStackDevtools = lazy(() =>
		import("@tanstack/react-devtools").then(m => ({ default: m.TanStackDevtools }))
	)
	const TanStackRouterDevtoolsPanel = lazy(() =>
		import("@tanstack/react-router-devtools").then(m => ({
			default: m.TanStackRouterDevtoolsPanel,
		}))
	)
	const TanStackQueryDevtools = lazy(() =>
		import("../integrations/tanstack-query/devtools").then(m => ({ default: m.default }))
	)
	return (
		<Suspense fallback={null}>
			<TanStackDevtools
				config={{ position: "bottom-right" }}
				plugins={[
					{
						name: "Tanstack Router",
						render: <TanStackRouterDevtoolsPanel />,
					},
					<TanStackQueryDevtools />,
				]}
			/>
		</Suspense>
	)
}

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html
			lang="en"
			className="dark px-6 sm:px-[20svw] overflow-x-hidden overflow-y-scroll"
		>
			<head>
				<HeadContent />
			</head>
			<body className="w-full flex flex-col min-h-screen relative mx-auto">
				<Header />
				{children}
				<Toaster />
				<Devtools />
				<Scripts />
			</body>
		</html>
	)
}
