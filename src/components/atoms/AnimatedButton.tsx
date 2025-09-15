import React, { useState, useEffect } from "react";
import styles from "./AnimatedButton.module.scss";

interface AnimatedButtonProps {
	children: React.ReactNode;
	onClick?: () => void;
	variant?: "primary" | "secondary" | "outline";
	size?: "small" | "medium" | "large";
	loading?: boolean;
	disabled?: boolean;
	icon?: React.ReactNode;
	className?: string;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
	children,
	onClick,
	variant = "primary",
	size = "medium",
	loading = false,
	disabled = false,
	icon,
	className = "",
}) => {
	const [isPressed, setIsPressed] = useState(false);
	const [ripples, setRipples] = useState<
		Array<{ x: number; y: number; id: number }>
	>([]);

	const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
		setIsPressed(true);

		// Crear efecto ripple
		const rect = e.currentTarget.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		const newRipple = {
			x,
			y,
			id: Date.now() + Math.random(),
		};

		setRipples((prev) => [...prev, newRipple]);

		// Remover ripple después de la animación
		setTimeout(() => {
			setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
		}, 600);
	};

	const handleMouseUp = () => {
		setIsPressed(false);
	};

	const handleClick = () => {
		if (!disabled && !loading && onClick) {
			onClick();
		}
	};

	const buttonClasses = [
		styles.animatedButton,
		styles[variant],
		styles[size],
		isPressed ? styles.pressed : "",
		loading ? styles.loading : "",
		disabled ? styles.disabled : "",
		className,
	]
		.filter(Boolean)
		.join(" ");

	return (
		<button
			className={buttonClasses}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			onMouseLeave={handleMouseUp}
			onClick={handleClick}
			disabled={disabled || loading}
		>
			<div className={styles.buttonContent}>
				{loading && (
					<div className={styles.loadingSpinner}>
						<div className={styles.spinner} />
					</div>
				)}
				{icon && <span className={styles.icon}>{icon}</span>}
				<span className={styles.text}>{children}</span>
			</div>

			{/* Efectos de ripple */}
			<div className={styles.rippleContainer}>
				{ripples.map((ripple) => (
					<div
						key={ripple.id}
						className={styles.ripple}
						style={{
							left: ripple.x,
							top: ripple.y,
						}}
					/>
				))}
			</div>

			{/* Efectos de brillo */}
			<div className={styles.glowEffect} />
			<div className={styles.shineEffect} />
		</button>
	);
};

export default AnimatedButton;
