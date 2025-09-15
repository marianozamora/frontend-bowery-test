import React from "react";
import styles from "./IconButton.module.scss";

export interface IconButtonProps {
	icon: React.ReactNode;
	onClick?: () => void;
	ariaLabel: string;
	disabled?: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({
	icon,
	onClick,
	ariaLabel,
	disabled,
}) => (
	<button
		className={styles.iconButton}
		onClick={onClick}
		aria-label={ariaLabel}
		disabled={disabled}
		type='button'
	>
		{icon}
	</button>
);

export default IconButton;
