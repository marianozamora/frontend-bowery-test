import React from "react";
import styles from "./Sphere.module.scss";

export interface SphereProps {
	color?: string;
	size?: number;
	mood?:
		| "neutral"
		| "happy"
		| "sad"
		| "angry"
		| "excited"
		| "orange"
		| "pinkPurple"
		| "yellow";
}

const moodColors: Record<string, string> = {
	neutral: "#FFD700", // amarillo
	happy: "#FFB347", // naranja
	sad: "#A9A9A9", // gris
	angry: "#FF69B4", // rosa
	excited: "#BA55D3", // morado
	orange: "#FFB347",
	pinkPurple: "#BA55D3",
	yellow: "#FFD700",
};

const Sphere: React.FC<SphereProps> = ({
	color,
	size = 64,
	mood = "neutral",
}) => {
	const sphereColor = color || moodColors[mood];
	return (
		<div
			className={styles.sphere}
			style={{
				width: size,
				height: size,
				background: `radial-gradient(circle, ${sphereColor} 60%, transparent 100%)`,
				boxShadow: `0 0 32px 8px ${sphereColor}55`,
				transition: "background 0.3s, box-shadow 0.3s, transform 0.2s",
			}}
			aria-label={`Estado: ${mood}`}
			role='img'
		/>
	);
};

export default Sphere;
