import { useParams } from "react-router-dom";
import styles from "./City.module.css";

import Spinner from "./Spinner";
import BackButton from "./BackButton";
import { useCity } from "../features/cities/useCity";
import Message from "./Message";
import Flag from "./Flag";

const formatDate = (date) =>
	new Intl.DateTimeFormat("en", {
		day: "numeric",
		month: "long",
		year: "numeric",
		weekday: "long",
	}).format(new Date(date));

function City() {
	// Getting data stored into the url with useParams
	const { id } = useParams();

	const { city, isLoading, isError } = useCity(id);

	console.log("HEY YOU CITY:", city);

	if (isLoading) return <Spinner />;

	if (isError)
		return <Message message="Something went wrong fetching cities" />;

	const { cityName, emoji, date, notes } = city;

	return (
		<div className={styles.city}>
			<div className={styles.row}>
				<h6>City name</h6>
				<h3>
					{/* <span>{emoji}</span>  */}
					{emoji.length <= 6 ? <span>{emoji}</span> : <Flag country={city} />}
					{cityName}
				</h3>
			</div>

			<div className={styles.row}>
				<h6>You went to {cityName} on</h6>
				<p>{formatDate(date || null)}</p>
			</div>

			{notes && (
				<div className={styles.row}>
					<h6>Your notes</h6>
					<p>{notes}</p>
				</div>
			)}

			<div className={styles.row}>
				<h6>Learn more</h6>
				<a
					href={`https://en.wikipedia.org/wiki/${cityName}`}
					target="_blank"
					rel="noreferrer"
				>
					Check out {cityName} on Wikipedia &rarr;
				</a>
			</div>

			<div className={styles.back}>
				<BackButton />
			</div>
		</div>
	);
}

export default City;
