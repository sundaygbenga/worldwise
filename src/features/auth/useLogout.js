import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logOut } from "../../services/apiUser";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogOut() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { mutate: signOut } = useMutation({
		mutationFn: logOut,

		onSuccess: () => {
			toast.success("Logged out successfully");
			queryClient.removeQueries(["user"]);
			localStorage.removeItem("access_token");
			navigate("/");
		},
		onError: (err) => console.log(err),
	});

	return { signOut };
}
