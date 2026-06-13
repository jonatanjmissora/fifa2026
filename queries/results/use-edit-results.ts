import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { editResultsServer } from "../../server/results/edit-results-server"

export function useEditResults() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: editResultsServer,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["results"] })
			toast.success("Resultados guardados correctamente")
		},
		onError: (error) => {
			toast.error(
				error instanceof Error
					? error.message
					: "Error al guardar los resultados"
			)
		},
	})
}
