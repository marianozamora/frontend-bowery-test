import React, { memo } from "react";
import styles from "./ChatBubble.module.scss";

export interface ChatBubbleProps {
	message: string;
	sender: "user" | "assistant";
	streaming?: boolean;
	error?: boolean;
	className?: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = memo(
	({ message, sender, streaming = false, error = false, className }) => {
		return (
			<div
				className={`${styles.bubble} ${styles[sender]} ${
					streaming ? styles.streaming : ""
				} ${error ? styles.error : ""} ${className || ""}`}
				role='status'
				aria-live={streaming ? "polite" : "off"}
				aria-label={`${
					sender === "user" ? "Tu mensaje" : "Mensaje del asistente"
				}: ${message}`}
			>
				<div className={styles.messageContent}>
					{message}
					{streaming && <span className={styles.cursor}>|</span>}
				</div>
				{error && (
					<div className={styles.errorContainer}>
						<span className={styles.errorText}>Error al enviar mensaje</span>
						<button
							className={styles.retryButton}
							aria-label='Reintentar envío'
						>
							🔄
						</button>
					</div>
				)}
			</div>
		);
	}
);

ChatBubble.displayName = "ChatBubble";

export default ChatBubble;
