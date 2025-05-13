import { BASE_URL, headers } from "../constants";

export async function signUp(formData) {
	const res = await fetch(`${BASE_URL}/auth/sign-up`, {
		method: "POST",
		headers: headers,
		body: JSON.stringify(formData),
	});

	if (!res.ok) {
		throw new Error(`Sign up failed: ${res.status}`);
	}

	const data = await res.json();
	return data.data;
}
export async function obtainToken(formData) {
	const res = await fetch(`${BASE_URL}/auth/sign-in`, {
		method: "POST",
		headers: headers,
		body: JSON.stringify(formData),
	});

	if (!res.ok) {
		throw new Error(`Login failed: ${res.status}`);
	}

	const data = await res.json();
	return data.data;
}

export async function getCurrentUser() {
	const res = await fetch(`${BASE_URL}/auth/me`, {
		headers: headers,
	});

	if (!res.ok) {
		throw new Error(`Fetching authenticated user failed: ${res.status}`);
	}

	const data = await res.json();
	return data.user;
}

export async function logOut() {
	const res = await fetch(`${BASE_URL}/auth/sign-out`, {
		method: "POST",
		headers: headers,
	});

	if (!res.ok) {
		throw new Error(`Logout failed: ${res.status}`);
	}

	const data = await res.json();
	return data;
}
