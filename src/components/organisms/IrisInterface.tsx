import React, { useState } from "react";
import {
	ChatContainer,
	MicIcon,
	ChatIcon,
	InsightsIcon,
	ExploreIcon,
	IrisIcon,
	TypeIcon,
} from "../../globals";
import styles from "./IrisInterface.module.scss";

const IrisInterface: React.FC = () => {
	const [activeMode, setActiveMode] = useState<"talk" | "text">("talk");
	const [isListening, setIsListening] = useState(false);
	const [isOrbPressed, setIsOrbPressed] = useState(false);
	const [recordingState, setRecordingState] = useState<
		"idle" | "recording" | "processing"
	>("idle");
	const [isTransitioning, setIsTransitioning] = useState(false);
	const [connectionStatus, setConnectionStatus] = useState<
		"connected" | "connecting" | "disconnected"
	>("connected");
	const [currentMood, setCurrentMood] = useState<string>("neutral");

	const handleMoodChange = (mood: string) => {
		setCurrentMood(mood);
	};

	const handleTalkPress = () => {
		if (isTransitioning) return;

		setIsTransitioning(true);
		setActiveMode("talk");

		if (isListening) {
			// Stopping recording
			setRecordingState("processing");
			setTimeout(() => {
				setIsListening(false);
				setRecordingState("idle");
				setIsTransitioning(false);
			}, 1000);
		} else {
			// Starting recording
			setConnectionStatus("connecting");
			setTimeout(() => {
				setIsListening(true);
				setRecordingState("recording");
				setConnectionStatus("connected");
				setIsTransitioning(false);
			}, 500);
		}
	};

	const handleTextPress = () => {
		if (isTransitioning) return;

		setIsTransitioning(true);
		setActiveMode("text");
		setIsListening(false);
		setRecordingState("idle");
		setTimeout(() => setIsTransitioning(false), 300);
	};

	const handleOrbPress = () => {
		if (isTransitioning) return;

		setIsOrbPressed(true);
		handleTalkPress();
		setTimeout(() => setIsOrbPressed(false), 150);
	};

	const handleEndSession = () => {
		if (isTransitioning) return;

		setIsTransitioning(true);
		setRecordingState("processing");
		setTimeout(() => {
			setIsListening(false);
			setRecordingState("idle");
			setIsTransitioning(false);
		}, 800);
	};

	return (
		<div
			className={`${styles.irisInterface} ${
				recordingState !== "idle" ? styles.recording : ""
			} ${recordingState === "processing" ? styles.processing : ""} ${
				isTransitioning ? styles.transitioning : ""
			} ${styles[`mood-${currentMood}`] || ""}`}
		>
			{/* Connection Status Indicator */}
			{connectionStatus !== "connected" && (
				<div className={styles.statusIndicator}>
					<div className={styles.statusDot}></div>
					<span>
						{connectionStatus === "connecting"
							? "Connecting..."
							: "Disconnected"}
					</span>
				</div>
			)}

			{/* Header */}
			<header className={styles.header}>
				{recordingState === "recording" || recordingState === "processing" ? (
					<>
						<div className={styles.headerControls}>
							<button
								className={`${styles.headerButton} ${
									activeMode === "talk" ? styles.active : ""
								}`}
								disabled={isTransitioning}
								aria-label='Voice mode'
							>
								<MicIcon size={18} />
							</button>
							<button
								className={`${styles.headerButton} ${
									activeMode === "text" ? styles.active : ""
								}`}
								disabled={isTransitioning}
								aria-label='Text mode'
							>
								<ChatIcon size={18} />
							</button>
						</div>

						{/* Recording Timer/Status */}
						<div className={styles.recordingStatus}>
							{recordingState === "processing" ? (
								<span className={styles.processingText}>Processing...</span>
							) : (
								<span className={styles.recordingText}>Recording</span>
							)}
						</div>

						<button
							className={styles.endButton}
							onClick={handleEndSession}
							disabled={isTransitioning}
							aria-label='End session'
						>
							End
						</button>
					</>
				) : (
					<>
						<h1 className={styles.title}>Iris</h1>
						<button className={styles.menuButton} aria-label='Menu'>
							<span></span>
							<span></span>
							<span></span>
						</button>
					</>
				)}
			</header>

			{/* Central Content */}
			<main className={styles.mainContent}>
				{activeMode === "text" ? (
					<ChatContainer
						onMoodChange={handleMoodChange}
						className={styles.chatSection}
					/>
				) : recordingState === "recording" ||
				  recordingState === "processing" ? (
					<>
						{/* Multiple Orbs for Recording State */}
						<div className={styles.recordingOrbs}>
							<div className={`${styles.orb} ${styles.topOrb}`}></div>
							<div className={`${styles.orb} ${styles.centerOrb}`}></div>
							<div className={`${styles.orb} ${styles.bottomOrb}`}></div>
						</div>
					</>
				) : (
					<>
						{/* Central Orb */}
						<div className={styles.orbContainer}>
							<div
								className={`${styles.centralOrb} ${
									isListening ? styles.listening : ""
								} ${isOrbPressed ? styles.pressed : ""}`}
								onClick={handleOrbPress}
							>
								<div className={styles.orbCore}></div>
								<div className={styles.orbGlow}></div>
								<div className={styles.orbPulse}></div>
							</div>
						</div>

						{/* Descriptive Text */}
						<div className={styles.description}>
							<p>
								Chat with Iris. The more you engage, the more you'll build
								self-awareness—and move through life with clarity and
								confidence.
							</p>
						</div>
					</>
				)}
			</main>

			{/* Action Buttons / Bottom Mic Button */}
			{recordingState === "recording" ? (
				<div className={styles.bottomMicContainer}>
					<button
						className={`${styles.bottomMicButton} ${
							isListening ? styles.active : ""
						}`}
						onClick={handleTalkPress}
					>
						<MicIcon size={24} />
					</button>
				</div>
			) : (
				<div className={styles.actionButtons}>
					<button
						className={`${styles.actionButton} ${styles.talkButton} ${
							activeMode === "talk" ? styles.active : ""
						} ${isTransitioning ? styles.loading : ""}`}
						onClick={handleTalkPress}
						disabled={isTransitioning}
						aria-label='Start voice conversation'
					>
						<MicIcon size={20} className={styles.buttonIcon} />
						<span className={styles.buttonText}>
							{isTransitioning && activeMode === "talk"
								? "Connecting..."
								: "Talk"}
						</span>
					</button>

					<button
						className={`${styles.actionButton} ${styles.textButton} ${
							activeMode === "text" ? styles.active : ""
						} ${isTransitioning ? styles.loading : ""}`}
						onClick={handleTextPress}
						disabled={isTransitioning}
						aria-label='Start text conversation'
					>
						<TypeIcon size={20} className={styles.buttonIcon} />
						<span className={styles.buttonText}>
							{isTransitioning && activeMode === "text"
								? "Connecting..."
								: "Text"}
						</span>
					</button>
				</div>
			)}

			{/* Bottom Navigation - Only show when not recording */}
			{recordingState !== "recording" && (
				<nav className={styles.bottomNav}>
					<button className={styles.navItem}>
						<InsightsIcon size={20} className={styles.navIcon} />
						<span className={styles.navLabel}>Insights</span>
					</button>

					<button className={styles.navItem}>
						<ChatIcon size={20} className={styles.navIcon} />
						<span className={styles.navLabel}>Chat</span>
					</button>

					<button className={`${styles.navItem} ${styles.active}`}>
						<IrisIcon size={20} className={styles.navIcon} />
						<span className={styles.navLabel}>Iris</span>
					</button>

					<button className={styles.navItem}>
						<ExploreIcon size={20} className={styles.navIcon} />
						<span className={styles.navLabel}>Explore</span>
					</button>
				</nav>
			)}
		</div>
	);
};

export default IrisInterface;
