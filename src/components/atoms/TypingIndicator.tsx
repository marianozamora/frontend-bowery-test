import React, { memo } from "react";
import styles from "./TypingIndicator.module.scss";

const TypingIndicator: React.FC = memo(() => (
	<div
		className={styles.typing}
		aria-label='El asistente está escribiendo'
		role='status'
	>
		<span className={styles.dot}></span>
		<span className={styles.dot}></span>
		<span className={styles.dot}></span>
	</div>
));

TypingIndicator.displayName = "TypingIndicator";

export default TypingIndicator;
