import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiUser";

export function useUser() {
	const { data: user, isPending: isFetchingUser } = useQuery({
		queryKey: ["AuthUser"],
		queryFn: getCurrentUser,
	});
	return { user, isFetchingUser };
}
