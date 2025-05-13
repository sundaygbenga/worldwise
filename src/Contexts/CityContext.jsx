import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useReducer,
} from "react";
import supabase from "../services/cities";

const CitiesContext = createContext();

function reducer(state, action) {
	switch (action.type) {
		case "loading":
			return { ...state, isLoading: true };

		case "cities/loaded":
			return {
				...state,
				isLoading: false,
				cities: action.payload,
			};
		case "city/loaded":
			return { ...state, isLoading: false, currentCity: action.payload };

		case "city/created":
			return {
				...state,
				isLoading: false,
				cities: [...state.cities, action.payload],
				currentCity: action.payload,
			};
		case "city/deleted":
			return {
				...state,
				isLoading: false,
				cities: state.cities.filter((city) => city.id !== action.payload),
				currentCity: {},
			};
		case "rejected":
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};
		default:
			return state;
		// throw new Error("Unknown action type");
	}
}

const initialState = {
	cities: [],
	isLoading: false,
	currentCity: {},
	error: "",
};

function CitiesProvider({ children }) {
	// const [state, dispatch] = useReducer(reducer, initialState);
	// const { cities, isLoading, currentCity } = state;
	const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
		reducer,
		initialState
	);

	useEffect(function () {
		async function fetchCities() {
			dispatch({ type: "loading" });
			try {
				const { data, error } = await supabase.from("cities").select("*");

				if (error) {
					console.error(error);
					throw new Error("Cities could not be loaded");
				}
				dispatch({ type: "cities/loaded", payload: data });
			} catch {
				dispatch({
					type: "rejected",
					payload: "There was an error loading the cities...",
				});
			}
		}
		fetchCities();
	}, []);

	// GET CITY API
	const getCity = useCallback(
		async function getCity(id) {
			if (id === currentCity.id) return;

			dispatch({ type: "loading" });
			try {
				// const { data, error } = await supabase
				const { data } = await supabase.from("cities").select("*").eq("id", id);

				const [city] = data;

				dispatch({ type: "city/loaded", payload: city });
			} catch (error) {
				console.error(error);
				dispatch({
					type: "rejected",
					payload: "There was an error loading city...",
				});
			}
		},
		[currentCity.id]
	);

	// CREATE CITY API
	async function createCity(newCity) {
		try {
			const { data, error } = await supabase
				.from("cities")
				.insert(newCity)
				.select();

			if (error) {
				throw new Error("Cabin could not be created");
			}

			const [city] = data;

			dispatch({ type: "city/created", payload: city });
		} catch {
			dispatch({
				type: "rejected",
				payload: "There was an error creating the city...",
			});
		}
	}

	// DELETE CITY
	const deleteCity = useCallback(async function deleteCity(id) {
		try {
			dispatch({ type: "loading" });

			const { error } = await supabase.from("cities").delete().eq("id", id);

			if (error) {
				console.error(error);
				throw new Error("Cabin could not be deleted");
			}

			dispatch({ type: "city/deleted", payload: id });
		} catch {
			dispatch({
				type: "rejected",
				payload: "There was an error deleting the city...",
			});
		}
	}, []);

	return (
		<CitiesContext.Provider
			value={{
				cities,
				isLoading,
				currentCity,
				error,
				getCity,
				createCity,
				deleteCity,
			}}
		>
			{children}
		</CitiesContext.Provider>
	);
}

function useCities() {
	const context = useContext(CitiesContext);
	if (context === undefined)
		throw new Error("CityContext was used outside of the CityProvider");
	return context;
}

export { useCities, CitiesProvider };
