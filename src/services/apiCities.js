import { AUTH_TOKEN, BASE_URL } from "../constants/constants";

export async function createCity(newCity, cityId) {
	const res = await fetch(`${BASE_URL}/cities`, {
		method: "POST",
		headers: {
			"content-type": "application/json",
			Authorization: `Bearer ${AUTH_TOKEN}`,
		},
		body: JSON.stringify(newCity),
	});

	if (!res.ok) {
		throw new Error(`Failed to create city: ${res.status}`);
	}

	const data = await res.json();
	return data.data;
}

export async function getCities() {
	const res = await fetch(`${BASE_URL}/cities`);

	if (!res.ok) {
		throw new Error(`Server error: ${res.status}`);
	}
	if (!res.ok) {
		throw new Error(`Server error: ${res.status}`);
	}

	const cityData = await res.json();

	return cityData?.data;
}
export async function getCityById(cityId) {
	const res = await fetch(`${BASE_URL}/cities/${cityId}`);

	if (!res.ok) {
		throw new Error(`Server error: ${res.status}`);
	}

	const cityData = await res.json();

	return cityData?.data;
}

export async function deleteCity(cityId) {
	const res = await fetch(`${BASE_URL}/cities/${cityId}`, {
		method: "DELETE",
		headers: {
			"content-type": "application/json",
			Authorization: `Bearer ${AUTH_TOKEN}`,
		},
	});

	if (!res.ok) {
		throw new Error(`Cabin could not be deleted:${res.status}`);
	}
}
