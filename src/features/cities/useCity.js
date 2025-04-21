import { useQuery } from "@tanstack/react-query";
import { getCityById } from "../../services/apiCities";

export function useCity(cityId) {
	const {
		data: city,
		isPending: isLoading,
		isError,
	} = useQuery({
		queryKey: ["city", cityId],
		queryFn: () => getCityById(cityId),
	});

	return { city, isLoading, isError };
}
