import React from "react";
import styles from "./TypingIndicator.module.scss";

const TypingIndicator: React.FC = () => (
	<div
		className={styles.typing}
		aria-label='El asistente está escribiendo'
		role='status'
	>
		<span className={styles.dot}></span>
		<span className={styles.dot}></span>
		<span className={styles.dot}></span>
	</div>
);

export default TypingIndicator;
