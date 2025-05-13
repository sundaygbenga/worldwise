import styles from "./Login.module.css";
import PageNav from "../components/PageNav";

import AuthForm from "../components/AuthForm";

export default function SignUp() {
	return (
		<main className={styles.login}>
			<PageNav />
			<AuthForm type="sign-up" />
		</main>
	);
}
