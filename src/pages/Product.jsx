import PageNav from "../components/PageNav";
import styles from "./Product.module.css";

export default function Product() {
	return (
		<main className={styles.product}>
			<PageNav />
			<section>
				<img
					src="img-1.jpg"
					alt="person with dog overlooking mountain with sunset"
				/>
				<div>
					<h2>About WorldWise.</h2>
					<p>
						Worldwise is your ultimate travel log and tracking app, designed to
						help you effortlessly document your journeys, track your adventures
						in real-time, and gain insights with advanced analytics.
					</p>
					<p>
						Whether you're a casual traveler or a globe-trotter, Worldwise keeps
						all your travel memories organized and accessible.
					</p>
				</div>
			</section>
		</main>
	);
}
