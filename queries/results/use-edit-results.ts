import { useMutation, useQueryClient } from "@tanstack/react-query"
import { editResultsServer } from "../../server/results/edit-results-server"

export function useEditResults() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: editResultsServer,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["results"] })
		},
	})
}
