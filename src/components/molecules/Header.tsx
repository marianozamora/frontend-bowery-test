import React from "react";
import styles from "./Header.module.scss";
import IconButton from "../atoms/IconButton";

interface HeaderProps {
	subtitle?: string;
	onEndCall?: () => void;
	onMicToggle?: () => void;
	isMicActive?: boolean;
}

const Header: React.FC<HeaderProps> = ({
	subtitle = "Chatting with Iris",
	onEndCall,
	onMicToggle,
	isMicActive = false,
}) => {
	return (
		<header className={styles.header}>
			<div className={styles.topRow}>
				<div className={styles.leftControls}>
					<IconButton
						icon={
							<svg
								width='16'
								height='16'
								viewBox='0 0 24 24'
								fill='currentColor'
							>
								<path d='M4 4h16v2H4zm0 5h16v2H4zm0 5h16v2H4z' />
							</svg>
						}
						ariaLabel='Audio waveform'
						onClick={onMicToggle}
					/>
					<IconButton
						icon={
							<svg
								width='16'
								height='16'
								viewBox='0 0 24 24'
								fill='currentColor'
							>
								<path d='M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z' />
							</svg>
						}
						ariaLabel='Chat'
					/>
				</div>

				<div className={styles.centerLogo}>
					<span className={styles.logoS}>S</span>
				</div>

				<div className={styles.rightControls}>
					<button className={styles.endButton} onClick={onEndCall}>
						End
					</button>
				</div>
			</div>

			<div className={styles.subtitle}>{subtitle}</div>
		</header>
	);
};

export default Header;
