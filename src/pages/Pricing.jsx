// Uses the same styles as Product
import PageNav from "../components/PageNav";
import styles from "./Product.module.css";

export default function Product() {
	return (
		<main className={styles.product}>
			<PageNav />
			<section>
				<div>
					<h2>
						Simple pricing.
						<br />
						Just $9/month.
					</h2>
					<p>
						Enjoy our simple pricing providing you with comprehensive travel
						tracking features, advanced analytics, and real-time alerts, all for
						an affordable, straightforward monthly fee without hidden charges.
					</p>
				</div>
				<img src="img-2.jpg" alt="overview of a large city with skyscrapers" />
			</section>
		</main>
	);
}
