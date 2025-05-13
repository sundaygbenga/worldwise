import styles from "./Login.module.css";
import PageNav from "../components/PageNav";
import Button from "../components/Button";
import Message from "../components/Message";
import { useForm } from "react-hook-form";
import { useLogin } from "../features/auth/useLogin";

export default function Login() {
	const { signIn, isSigningIn } = useLogin();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	function obtainToken(data) {
		if (!data.email || !data.password) return;
		signIn(data);
	}

	// if (errors) return <Message message={errors} />;

	return (
		<main className={styles.login}>
			<PageNav />
			<p>Login To Continue</p>
			<form className={styles.form} onSubmit={handleSubmit(obtainToken)}>
				<div className={styles.row}>
					<label htmlFor="email">Email address</label>
					<input
						type="email"
						id="email"
						{...register("email", { required: "Email is required!" })}
					/>
					{errors.email && <Message message={errors.email.message} />}
				</div>

				<div className={styles.row}>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						{...register("password", {
							required: "Password is required",
							minLength: {
								value: 6,
								message: "Password must be at least 6 characters",
							},
						})}
					/>
					{errors.password && <Message message={errors.password.message} />}
				</div>

				<div>
					<Button func="submit" type="primary">
						{isSigningIn ? "Signing In..." : "Login"}
					</Button>
				</div>
			</form>
		</main>
	);
}
