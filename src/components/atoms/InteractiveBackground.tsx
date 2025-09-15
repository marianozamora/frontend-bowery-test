import React, { useState, useRef, useEffect } from "react";
import styles from "./InteractiveBackground.module.scss";

const InteractiveBackground: React.FC = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
	const [isPressed, setIsPressed] = useState(false);

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (containerRef.current) {
				const rect = containerRef.current.getBoundingClientRect();
				const x = ((e.clientX - rect.left) / rect.width) * 100;
				const y = ((e.clientY - rect.top) / rect.height) * 100;
				setMousePosition({ x, y });
			}
		};

		const handleMouseDown = () => setIsPressed(true);
		const handleMouseUp = () => setIsPressed(false);

		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("mousedown", handleMouseDown);
		window.addEventListener("mouseup", handleMouseUp);

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mousedown", handleMouseDown);
			window.removeEventListener("mouseup", handleMouseUp);
		};
	}, []);

	return (
		<div
			ref={containerRef}
			className={`${styles.interactiveBackground} ${
				isPressed ? styles.pressed : ""
			}`}
			style={
				{
					"--mouse-x": `${mousePosition.x}%`,
					"--mouse-y": `${mousePosition.y}%`,
				} as React.CSSProperties
			}
		>
			{/* Círculo que sigue al mouse */}
			<div
				className={styles.mouseCursor}
				style={{
					left: `${mousePosition.x}%`,
					top: `${mousePosition.y}%`,
				}}
			/>

			{/* Ondas de interacción */}
			<div className={styles.rippleEffect}>
				{Array.from({ length: 3 }).map((_, i) => (
					<div
						key={i}
						className={styles.ripple}
						style={{
							left: `${mousePosition.x}%`,
							top: `${mousePosition.y}%`,
							animationDelay: `${i * 0.1}s`,
						}}
					/>
				))}
			</div>
		</div>
	);
};

export default InteractiveBackground;
