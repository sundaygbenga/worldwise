import styles from "./CountryItem.module.css";
import Flag from "./Flag";

function CountryItem({ country }) {
	return (
		<li className={styles.countryItem}>
			{country.emoji.length <= 6 ? (
				<span>{country.emoji}</span>
			) : (
				<Flag country={country} />
			)}
			<span>{country.country}</span>
		</li>
	);
}

export default CountryItem;
