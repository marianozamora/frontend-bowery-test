import React, { useState, useEffect } from "react";
import styles from "./HoverCard.module.scss";

interface HoverCardProps {
	children: React.ReactNode;
	content?: React.ReactNode;
	title?: string;
	description?: string;
	image?: string;
	delay?: number;
	position?: "top" | "bottom" | "left" | "right";
	className?: string;
}

const HoverCard: React.FC<HoverCardProps> = ({
	children,
	content,
	title,
	description,
	image,
	delay = 300,
	position = "top",
	className = "",
}) => {
	const [isVisible, setIsVisible] = useState(false);
	const [shouldShow, setShouldShow] = useState(false);

	useEffect(() => {
		let timeout: number;

		if (isVisible) {
			timeout = window.setTimeout(() => {
				setShouldShow(true);
			}, delay);
		} else {
			setShouldShow(false);
		}

		return () => {
			if (timeout) window.clearTimeout(timeout);
		};
	}, [isVisible, delay]);

	const handleMouseEnter = () => {
		setIsVisible(true);
	};

	const handleMouseLeave = () => {
		setIsVisible(false);
	};

	return (
		<div
			className={`${styles.hoverCardContainer} ${className}`}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			{children}

			{shouldShow && (content || title || description) && (
				<div className={`${styles.hoverCard} ${styles[position]}`}>
					<div className={styles.cardContent}>
						{image && (
							<div className={styles.imageContainer}>
								<img src={image} alt='' className={styles.cardImage} />
							</div>
						)}

						{title && <h4 className={styles.cardTitle}>{title}</h4>}

						{description && (
							<p className={styles.cardDescription}>{description}</p>
						)}

						{content && <div className={styles.customContent}>{content}</div>}
					</div>

					{/* Flecha del tooltip */}
					<div className={styles.arrow} />
				</div>
			)}
		</div>
	);
};

export default HoverCard;
