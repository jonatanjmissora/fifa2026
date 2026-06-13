import { defineConfig } from "vite"
import { devtools } from "@tanstack/devtools-vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import viteReact from "@vitejs/plugin-react"
import viteTsConfigPaths from "vite-tsconfig-paths"
import { fileURLToPath, URL } from "url"

import tailwindcss from "@tailwindcss/vite"
import { nitro } from "nitro/vite"

const config = defineConfig({
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes("node_modules/react-dom")) return "vendor-react"
					if (id.includes("node_modules/react")) return "vendor-react"
					if (id.includes("node_modules/@tanstack")) return "vendor-tanstack"
					if (id.includes("node_modules/@radix-ui")) return "vendor-radix"
					if (id.includes("node_modules/lucide-react")) return "vendor-ui"
					if (id.includes("node_modules/sonner")) return "vendor-ui"
					if (id.includes("node_modules/tailwind-merge")) return "vendor-ui"
				},
			},
		},
	},
	plugins: [
		devtools(),
		nitro(),
		// this is the plugin that enables path aliases
		viteTsConfigPaths({
			projects: ["./tsconfig.json"],
		}),
		tailwindcss(),
		tanstackStart(),
		viteReact(),
	],
})

export default config
