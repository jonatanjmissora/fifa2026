import { createAuthClient } from "better-auth/react"
import { toast } from "sonner"

// Check if Better Auth base URL is configured
const checkBetterAuthConfig = () => {
	const baseURL = import.meta.env.VITE_BETTER_AUTH_BASE_URL

	if (!baseURL) {
		const warningMessage =
			"⚠️ Better Auth: VITE_BETTER_AUTH_BASE_URL no configurada. Por favor, configúrala en tu archivo .env para que los callbacks y redirecciones funcionen correctamente."

		// Also log to console for developers
		console.warn(warningMessage)
		console.info("Ejemplo: VITE_BETTER_AUTH_BASE_URL=http://localhost:3000")

		// Delay toast to ensure Toaster is mounted
		setTimeout(() => {
			toast.warning(warningMessage, {
				duration: 10000, // Show for 10 seconds
				id: "better-auth-missing-base-url", // Prevent duplicate toasts
			})
		}, 1000) // Wait 1 second before showing toast

		return false
	}

	// Detectar rutas olvidadas en producción
	if (import.meta.env.PROD && baseURL.includes("localhost")) {
		const errorMessage =
			"❌ VITE_BETTER_AUTH_BASE_URL sigue apuntando a localhost en producción.\n" +
			"   Configúrala en el panel de tu hosting con la URL real del dominio.\n" +
			"   Ejemplo: VITE_BETTER_AUTH_BASE_URL=https://tudominio.com"

		console.error(errorMessage)

		setTimeout(() => {
			toast.error(errorMessage, {
				duration: 0, // No se oculta automáticamente
				id: "better-auth-prod-localhost",
			})
		}, 1000)

		return false
	}

	return true
}

export const authClient = createAuthClient({
	baseURL: import.meta.env.VITE_BETTER_AUTH_BASE_URL,
})

// Check configuration on module load
checkBetterAuthConfig()
