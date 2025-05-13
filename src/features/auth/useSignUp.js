import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../services/apiUser";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useSignUp() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { mutate: signUp, isPending: isSigningUp } = useMutation({
		mutationFn: (formData) => signUpApi(formData),

		onSuccess: (data) => {
			toast.success("Sign up successful");
			queryClient.setQueryData(["user"], data);
			localStorage.setItem("access_token", data.accessToken);
			navigate("/login");
		},
		onError: (err) => {
			console.log(err);
			toast.error("Account creation failed");
		},
	});

	return { signUp, isSigningUp };
}
