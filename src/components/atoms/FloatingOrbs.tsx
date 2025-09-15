import React from "react";
import styles from "./FloatingOrbs.module.scss";

const FloatingOrbs: React.FC = () => {
	return (
		<div className={styles.orbsContainer}>
			<div className={`${styles.orb} ${styles.orb1}`}></div>
			<div className={`${styles.orb} ${styles.orb2}`}></div>
			<div className={`${styles.orb} ${styles.orb3}`}></div>
			<div className={`${styles.orb} ${styles.orb4}`}></div>
			<div className={`${styles.orb} ${styles.orb5}`}></div>
			<div className={`${styles.orb} ${styles.orb6}`}></div>
		</div>
	);
};

export default FloatingOrbs;
