import { createContext, useContext, useEffect, useState } from "react";

const BASE_URL = "http://localhost:8500";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
	const [cities, setCities] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [currentCity, setCurrentCity] = useState({});

	useEffect(function () {
		async function fetchCities() {
			try {
				setIsLoading(true);
				const res = await fetch(`${BASE_URL}/cities`);

				const data = await res.json();
				// console.log(data);
				setCities(data);
			} catch {
				alert("There was an error loading data");
			} finally {
				setIsLoading(false);
			}
		}
		fetchCities();
	}, []);

	// FETCH CITY API
	async function getCity(id) {
		try {
			setIsLoading(true);
			const res = await fetch(`${BASE_URL}/cities/${id}`);

			const data = await res.json();
			// console.log(data);
			setCurrentCity(data);
		} catch {
			alert("There was an error loading data");
		} finally {
			setIsLoading(false);
		}
	}

	// CREATE CITY API
	async function createCity(newCity) {
		try {
			setIsLoading(true);
			const res = await fetch(`${BASE_URL}/cities`, {
				method: "POST",
				body: JSON.stringify(newCity),
				headers: { "Content-Type": "application/json" },
			});

			const data = await res.json();
			setCities((cities) => [...cities, data]);
		} catch {
			alert("There was an creating loading city...");
		} finally {
			setIsLoading(false);
		}
	}

	// DELETE CITY
	async function deleteCity(id) {
		try {
			setIsLoading(true);
			await fetch(`${BASE_URL}/cities/${id}`, {
				method: "DELETE",
			});

			setCities((cities) => cities.filter((city) => city.id !== id));
		} catch {
			alert("There was an error deleting city");
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<CitiesContext.Provider
			value={{
				cities,
				setCities,
				isLoading,
				setIsLoading,
				currentCity,
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
