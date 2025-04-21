import { useQuery } from "@tanstack/react-query";
import { getCities } from "../../services/apiCities";

export function useCities() {
	const {
		data: cities,
		isPending: isLoading,
		isError,
	} = useQuery({
		queryKey: ["cities"],
		queryFn: getCities,
	});

	return { cities, isLoading, isError };
}
