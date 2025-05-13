import styles from "./Button.module.css";

function Button({ children, onClick, type, func }) {
	return (
		<button
			onClick={onClick}
			className={`${styles.btn} ${styles[type]} `}
			type={func}
		>
			{children}
		</button>
	);
}

export default Button;
