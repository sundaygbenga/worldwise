import Spinner from "./Spinner";
import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import Message from "./Message";
import { useCities } from "../features/cities/useCities";

// const { cities, isLoading } = useCities();
// console.log(cities);

function CityList() {
	const { cities, isLoading, isError } = useCities();

	if (isLoading) return <Spinner />;

	if (isError)
		return <Message message="Something went wrong fetching cities" />;

	if (!cities.length)
		return (
			<Message message="Add your first city by first clicking on a city on the map" />
		);

	return (
		<ul className={styles.cityList}>
			{cities.map((city) => (
				<CityItem city={city} key={city._id} />
			))}
			{/* <CityItem /> */}
		</ul>
	);
}

export default CityList;
