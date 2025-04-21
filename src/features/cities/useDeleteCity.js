import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCity as deleteCityApi } from "../../services/apiCities";

export function useDeleteCity(cityId) {
	const queryClient = useQueryClient();

	const { mutate: deleteCity, isPending: isDeleting } = useMutation({
		mutationFn: () => deleteCityApi(cityId),
		onSuccess: () => {
			// toast.success("Cabin deleted successfully");
			queryClient.invalidateQueries({
				queryKey: ["cities"],
			});
		},
		onError: (err) => console.error(err.message),
	});

	return { deleteCity, isDeleting };
}
