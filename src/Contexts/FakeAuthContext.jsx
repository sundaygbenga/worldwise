import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
	user: null,
	isAuthenticated: false,
	error: "",
};

function reducer(state, action) {
	switch (action.type) {
		case "login":
			return {
				...state,
				user: action.payload,
				isAuthenticated: true,
			};
		case "logout":
			return { ...state, isAuthenticated: false, user: null };

		case "wrong/credentials":
			return { ...state, isAuthenticated: false, error: action.payload };

		default:
			throw new Error("Unknown action type!");
	}
}

const FAKE_USER = {
	name: "Champ",
	email: "jack@example.com",
	password: "qwerty",
	avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ children }) {
	const [{ user, isAuthenticated, error }, dispatch] = useReducer(
		reducer,
		initialState
	);

	function login(email, password) {
		if (email === FAKE_USER.email && password === FAKE_USER.password)
			dispatch({ type: "login", payload: FAKE_USER });
		if (email !== FAKE_USER.email || password !== FAKE_USER.password)
			dispatch({
				type: "wrong/credentials",
				payload: "Incorrect credentials! Please check your details😒.",
			});
	}

	function logout() {
		dispatch({ type: "logout" });
	}

	return (
		<AuthContext.Provider
			value={{ user, isAuthenticated, error, login, logout }}
		>
			{children}
		</AuthContext.Provider>
	);
}

function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined)
		throw new Error("AuthContext was used outside AurthProvider");
	return context;
}

export { AuthProvider, useAuth };
