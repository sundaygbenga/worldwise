import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../Contexts/CityContext";

const formatDate = (date) =>
	new Intl.DateTimeFormat("en", {
		day: "numeric",
		month: "long",
		year: "numeric",
	}).format(new Date(date));

function CityItem({ city }) {
	const { currentCity, deleteCity } = useCities();
	const { cityName, emoji, date, id, position } = city;

	const optCityName = cityName
		.split(" ")
		.map((city) => city.replace(/[.,-?!]/g, " "))
		.join(" ")
		.split(" ")
		.map((city) => (city.length > 6 ? city.slice(0, 6) + "..." : city))
		.join(" ");

	function handleClick(e) {
		e.preventDefault();
		deleteCity(id);
	}

	return (
		<li>
			{/*We are linkiing to the dynamic url here using (Params and query string)*/}

			<Link
				className={`${styles.cityItem} ${
					id === currentCity.id ? styles["cityItem--active"] : ""
				}`}
				to={`${id}?lat=${position.lat}&lng=${position.lng}`}
			>
				<span className={styles.emoji}>{emoji}</span>
				<h3 className={styles.name}>
					{
						// optCityName
						window.innerWidth > 500 ? cityName : optCityName
					}
				</h3>
				<time className={styles.date}>{formatDate(date)}</time>
				<button className={styles.deleteBtn} onClick={handleClick}>
					&times;
				</button>
			</Link>
		</li>
	);
}

export default CityItem;
