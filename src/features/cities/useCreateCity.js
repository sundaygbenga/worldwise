import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCity as createCityApi } from "../../services/apiCities";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useCreateCity() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { mutate: createCity, isPending: isCreating } = useMutation({
		mutationFn: createCityApi,
		onSuccess: () => {
			// toast.success("New cabin successfully created");
			queryClient.invalidateQueries({
				queryKey: ["cities"],
			});
			navigate("/app/cities");
		},
		onError: (err) => {
			console.error(err.message);
			toast.error(err.message);
		},
	});

	return { createCity, isCreating };
}
