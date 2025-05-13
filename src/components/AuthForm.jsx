import styles from "./AuthForm.module.css";
import Button from "../components/Button";
import Message from "../components/Message";
import { useForm } from "react-hook-form";
import { useLogin } from "../features/auth/useLogin";
import { NavLink } from "react-router-dom";
import { useSignUp } from "../features/auth/useSignUp";

export default function AuthForm({ type }) {
	const { signIn, isSigningIn } = useLogin();
	const { signUp, isSigningUp } = useSignUp();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	function obtainToken(data) {
		if (!data.email || !data.password) return;
		if (type === "sign-in") {
			signIn(data);
		} else {
			signUp(data);
		}
	}

	// if (errors) return <Message message={errors} />;

	return (
		<>
			<form className={styles.form} onSubmit={handleSubmit(obtainToken)}>
				<h2 className={styles.header}>
					{type === "sign-in" ? "Sign In" : "Create Account"}
				</h2>
				{type === "sign-up" && (
					<div className={styles.row}>
						<label htmlFor="name">Your name</label>
						<input
							type="text"
							id="name"
							{...register("name", { required: "Name is required!" })}
						/>
						{errors.name && <Message message={errors.name.message} />}
					</div>
				)}
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

				<div className={styles.btn}>
					{type === "sign-in" ? (
						<Button func="submit" type="primary">
							{isSigningIn ? "Signing In..." : "Login"}
						</Button>
					) : (
						<Button func="submit" type="primary">
							{isSigningUp ? "Signing Up..." : "SignUp"}
						</Button>
					)}
				</div>

				<div className={styles.navigation}>
					<p>{type === "sign-up" ? "Have" : "Don't have"} an account? </p>
					{type === "sign-in" ? (
						<NavLink to="/sign-up" className={styles.link}>
							Register
						</NavLink>
					) : (
						<NavLink to="/login" className={styles.link}>
							Login
						</NavLink>
					)}
				</div>
			</form>
		</>
	);
}
