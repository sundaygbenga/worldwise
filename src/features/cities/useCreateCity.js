import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCity as createCityApi } from "../../services/apiCities";

export function useCreateCity() {
	const queryClient = useQueryClient();

	const { mutate: createCity, isPending: isCreating } = useMutation({
		mutationFn: createCityApi,
		onSuccess: () => {
			// toast.success("New cabin successfully created");
			queryClient.invalidateQueries({
				queryKey: ["cities"],
			});
		},
		onError: (err) => console.error(err.message),
	});

	return { createCity, isCreating };
}
