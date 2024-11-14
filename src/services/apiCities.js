import supabase from "./cities";

export async function getCities() {
	const { data, error } = await supabase.from("cities").select("*");

	if (error) {
		console.error(error);
		throw new Error("Cities could not be loaded");
	}
	return data;
}

export async function deleteCIties(id) {
	const { data, error } = await supabase.from("cities").delete().eq("id", id);

	if (error) {
		console.error(error);
		throw new Error("Cabin could not be deleted");
	}
	return data;
}

export async function createCity(newCity) {
	const { data, error } = await supabase.from("cities").insert([newCity]);

	if (error) {
		console.error(error);
		throw new Error("Cabin could not be created");
	}
	return data;
}
