import { useMutation, useQueryClient } from "@tanstack/react-query";
import { obtainToken } from "../../services/apiUser";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { mutate: signIn, isPending: isSigningIn } = useMutation({
		// mutationFn: obtainToken,
		// mutationFn: ({ email, password }) => obtainToken({ email, password }),
		mutationFn: (formData) => obtainToken(formData),

		onSuccess: (data) => {
			toast.success("Login successful");
			queryClient.setQueryData(["user"], data);
			localStorage.setItem("access_token", data.accessToken);
			navigate("/app");
		},
		onError: (err) => {
			console.log(err);
			toast.error("Login failed");
		},
	});

	return { signIn, isSigningIn };
}
