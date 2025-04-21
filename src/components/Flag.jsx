import styles from "./Flag.module.css";

export default function Flag({ country }) {
	return (
		<div className={styles.wrapper}>
			<img src={country.emoji} alt={country} className={styles.Flag} />
		</div>
	);
}
