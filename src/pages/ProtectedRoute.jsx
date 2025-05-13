import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
	const isAuthenticated = localStorage.getItem("access_token");
	const navigate = useNavigate();

	useEffect(
		function () {
			if (!isAuthenticated) navigate("/");
		},
		[isAuthenticated, navigate]
	);

	// return isAuthenticated ? children : null;
	return children;
}

export default ProtectedRoute;
