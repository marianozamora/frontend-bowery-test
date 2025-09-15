import React from "react";
import styles from "./UserAvatar.module.scss";

interface UserAvatarProps {
	src?: string;
	size?: number;
	initials?: string;
	className?: string;
	showDimensions?: boolean;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
	src,
	size = 48,
	initials = "U",
	className = "",
	showDimensions = false,
}) => {
	return (
		<div className={`${styles.avatarContainer} ${className}`}>
			<div className={styles.avatar} style={{ width: size, height: size }}>
				{src ? (
					<img src={src} alt='User avatar' className={styles.avatarImage} />
				) : (
					<div className={styles.avatarInitials}>{initials}</div>
				)}
			</div>

			{showDimensions && (
				<div className={styles.dimensionsLabel}>
					{size} × {size}
				</div>
			)}
		</div>
	);
};

export default UserAvatar;
