import React, { useState, useCallback, memo, useMemo } from "react";
import { ChatBubble, TypingIndicator, Input, useStreamingMessages, useAutoScroll } from "../../globals";
import styles from "./ChatContainer.module.scss";

interface ChatContainerProps {
	onMoodChange?: (mood: string) => void;
	className?: string;
}

const ChatContainer: React.FC<ChatContainerProps> = memo(
	({ onMoodChange, className }) => {
		const [inputValue, setInputValue] = useState("");
		const [isConnected, setIsConnected] = useState(true);

		const {
			messages,
			isTyping,
			addUserMessage,
			streamAssistantMessage,
			addErrorMessage,
		} = useStreamingMessages({ speed: 60 });

		const messagesEndRef = useAutoScroll<HTMLDivElement>({
			dependency: [messages, isTyping],
			enabled: true,
		});

		// Memoize responses to prevent recreating on every render
		const responses = useMemo(
			() => [
				"¡Hola! Es un placer hablar contigo. ¿En qué puedo ayudarte hoy?",
				"Entiendo tu pregunta. Déjame pensar en la mejor respuesta para ti.",
				"Esa es una excelente pregunta. Te explico paso a paso:",
				"Me parece muy interesante lo que comentas. Mi perspectiva es:",
				"Gracias por compartir eso conmigo. Creo que podemos explorar algunas opciones:",
			],
			[]
		);

		// Simular respuestas del asistente
		const simulateAssistantResponse = useCallback(
			(userMessage: string) => {
				const randomResponse =
					responses[Math.floor(Math.random() * responses.length)];

				// Simular delay de procesamiento
				setTimeout(() => {
					if (Math.random() > 0.1) {
						// 90% éxito
						streamAssistantMessage(randomResponse);

						// Cambiar mood basado en el contenido
						if (
							userMessage.toLowerCase().includes("help") ||
							userMessage.toLowerCase().includes("ayuda")
						) {
							onMoodChange?.("supportive");
						} else if (userMessage.toLowerCase().includes("gracias")) {
							onMoodChange?.("happy");
						} else {
							onMoodChange?.("neutral");
						}
					} else {
						// 10% error
						addErrorMessage(
							"Lo siento, no pude procesar tu mensaje. Por favor intenta de nuevo."
						);
					}
				}, 1000 + Math.random() * 2000); // 1-3 segundos de delay
			},
			[streamAssistantMessage, addErrorMessage, onMoodChange, responses]
		);

		const handleSendMessage = useCallback(async () => {
			if (!inputValue.trim() || isTyping) return;

			const messageText = inputValue.trim();
			setInputValue("");

			// Agregar mensaje del usuario
			addUserMessage(messageText);

			// Simular envío y respuesta
			if (isConnected) {
				simulateAssistantResponse(messageText);
			} else {
				addErrorMessage(
					"Sin conexión. Verifica tu conexión a internet e intenta de nuevo."
				);
			}
		}, [
			inputValue,
			isTyping,
			isConnected,
			addUserMessage,
			simulateAssistantResponse,
			addErrorMessage,
		]);

		const handleKeyPress = useCallback(
			(e: React.KeyboardEvent) => {
				if (e.key === "Enter" && !e.shiftKey) {
					e.preventDefault();
					handleSendMessage();
				}
			},
			[handleSendMessage]
		);

		const toggleConnection = useCallback(() => {
			setIsConnected((prev) => !prev);
		}, []);

		return (
			<div className={`${styles.chatContainer} ${className || ""}`}>
				{/* Debug controls */}
				<div className={styles.debugControls}>
					<button
						onClick={toggleConnection}
						className={`${styles.connectionButton} ${
							isConnected ? styles.connected : styles.disconnected
						}`}
					>
						{isConnected ? "🟢 Conectado" : "🔴 Desconectado"}
					</button>
				</div>

				{/* Messages container */}
				<div className={styles.messagesContainer} ref={messagesEndRef}>
					{messages.length === 0 && (
						<div className={styles.welcomeMessage}>
							<h3>¡Hola! Soy Iris 👋</h3>
							<p>Estoy aquí para ayudarte. ¿En qué puedo asistirte hoy?</p>
						</div>
					)}

					{messages.map((message) => (
						<div
							key={message.id}
							className={`${styles.messageWrapper} ${styles[message.sender]}`}
						>
							<ChatBubble
								message={message.text}
								sender={message.sender}
								streaming={message.streaming}
								error={message.error}
							/>
						</div>
					))}

					{isTyping && (
						<div className={`${styles.messageWrapper} ${styles.assistant}`}>
							<TypingIndicator />
						</div>
					)}
				</div>

				{/* Input container */}
				<div className={styles.inputContainer}>
					<Input
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						onKeyPress={handleKeyPress}
						placeholder={
							isTyping ? "Iris está escribiendo..." : "Escribe tu mensaje..."
						}
						disabled={isTyping || !isConnected}
						onSend={handleSendMessage}
						className={styles.chatInput}
					/>
				</div>
			</div>
		);
	}
);

ChatContainer.displayName = "ChatContainer";

export default ChatContainer;
