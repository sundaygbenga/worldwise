import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";
import styles from "./Homepage.module.css";

export default function Homepage() {
	return (
		<main className={styles.homepage}>
			<PageNav></PageNav>
			<section>
				<h1 className="text-5xl font-bold">
					You <span className="text-yellow-500  font-bold">travel</span> the
					world.
					<br />
					<span className="text-yellow-500 text-5xl- font-bold">
						{" "}
						WorldWise
					</span>{" "}
					keeps track of your{" "}
					<span className="text-yellow-500  font-bold">adventures</span>.
				</h1>
				<h2>
					A world map that tracks your footsteps into every city you can think
					of. Never forget your wonderful experiences, and show your friends how
					you have wandered the world.
				</h2>

				<Link to="/login" className="cta">
					Start tracking now
				</Link>
			</section>
		</main>
	);
}
