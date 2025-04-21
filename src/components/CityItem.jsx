import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useDeleteCity } from "../features/cities/useDeleteCity";
import Spinner from "./Spinner";
import Flag from "./Flag";

const formatDate = (date) =>
	new Intl.DateTimeFormat("en", {
		day: "numeric",
		month: "long",
		year: "numeric",
	}).format(new Date(date));

function CityItem({ city }) {
	const { cityName, emoji, date, _id: id, position } = city;
	const { deleteCity, isDeleting } = useDeleteCity(id);

	const optCityName = cityName
		.split(" ")
		.map((city) => city.replace(/[.,-?!]/g, " "))
		.join(" ")
		.split(" ")
		.map((city) => (city.length > 6 ? city.slice(0, 6) + "..." : city))
		.join(" ");

	function handleClick(e) {
		e.preventDefault();
		deleteCity();
	}

	if (isDeleting) return <Spinner />;

	return (
		<li>
			{/*We are linkiing to the dynamic url here using (Params and query string)*/}

			<Link
				className={`${styles.cityItem} ${
					id === city._id ? styles["cityItem--active"] : ""
				}`}
				to={`${id}?lat=${position.lat}&lng=${position.lng}`}
			>
				{emoji.length <= 6 ? (
					<span className={styles.emoji}>{emoji}</span>
				) : (
					<Flag country={city} />
				)}
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
