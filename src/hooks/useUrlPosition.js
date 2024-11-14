import { useSearchParams } from "react-router-dom";

export function useUrlPosition() {
	// Reading data from the url

	const [searchParams] = useSearchParams();
	const lat = searchParams.get("lat");
	const lng = searchParams.get("lng");

	return { lat, lng };
}
