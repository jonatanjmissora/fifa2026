import { queryOptions } from "@tanstack/react-query"
import { getResultsServer } from "../../server/results/get-results-server"

export const resultsQueryOptions = queryOptions({
	queryKey: ["results"],
	queryFn: () => getResultsServer(),
	staleTime: 30 * 1000,
	refetchInterval: 60 * 1000,
})
