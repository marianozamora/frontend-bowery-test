import React from "react";
import styles from "./AudioVisualizer.module.scss";

interface AudioVisualizerProps {
	isActive: boolean;
	bars?: number;
	className?: string;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({
	isActive,
	bars = 20,
	className = "",
}) => {
	return (
		<div
			className={`${styles.audioVisualizer} ${
				isActive ? styles.active : ""
			} ${className}`}
		>
			{Array.from({ length: bars }).map((_, index) => (
				<div
					key={index}
					className={styles.bar}
					style={{
						animationDelay: `${index * 0.1}s`,
						height: isActive ? `${Math.random() * 60 + 20}%` : "10%",
					}}
				/>
			))}
		</div>
	);
};

export default AudioVisualizer;
