import { useState, useEffect, useCallback } from "react";

interface StreamingMessage {
	id: string;
	text: string;
	sender: "user" | "assistant";
	streaming?: boolean;
	error?: boolean;
}

interface UseStreamingMessagesProps {
	speed?: number; // caracteres por segundo
}

export const useStreamingMessages = ({
	speed = 50,
}: UseStreamingMessagesProps = {}) => {
	const [messages, setMessages] = useState<StreamingMessage[]>([]);
	const [isTyping, setIsTyping] = useState(false);

	const addUserMessage = useCallback((text: string) => {
		const newMessage: StreamingMessage = {
			id: Date.now().toString(),
			text,
			sender: "user",
		};
		setMessages((prev) => [...prev, newMessage]);
		return newMessage.id;
	}, []);

	const streamAssistantMessage = useCallback(
		(text: string) => {
			setIsTyping(true);

			const messageId = Date.now().toString();
			const newMessage: StreamingMessage = {
				id: messageId,
				text: "",
				sender: "assistant",
				streaming: true,
			};

			// Agregar mensaje vacío inicialmente
			setMessages((prev) => [...prev, newMessage]);

			// Simular streaming caracter por caracter
			let currentIndex = 0;
			const intervalMs = 1000 / speed;

			const streamInterval = setInterval(() => {
				currentIndex++;
				const partialText = text.slice(0, currentIndex);

				setMessages((prev) =>
					prev.map((msg) =>
						msg.id === messageId ? { ...msg, text: partialText } : msg
					)
				);

				if (currentIndex >= text.length) {
					clearInterval(streamInterval);
					setMessages((prev) =>
						prev.map((msg) =>
							msg.id === messageId ? { ...msg, streaming: false } : msg
						)
					);
					setIsTyping(false);
				}
			}, intervalMs);

			return () => clearInterval(streamInterval);
		},
		[speed]
	);

	const addErrorMessage = useCallback(
		(text: string, originalMessageId?: string) => {
			if (originalMessageId) {
				// Marcar mensaje existente como error
				setMessages((prev) =>
					prev.map((msg) =>
						msg.id === originalMessageId
							? { ...msg, error: true, streaming: false }
							: msg
					)
				);
			} else {
				// Agregar nuevo mensaje de error
				const errorMessage: StreamingMessage = {
					id: Date.now().toString(),
					text,
					sender: "assistant",
					error: true,
				};
				setMessages((prev) => [...prev, errorMessage]);
			}
			setIsTyping(false);
		},
		[]
	);

	const clearMessages = useCallback(() => {
		setMessages([]);
		setIsTyping(false);
	}, []);

	return {
		messages,
		isTyping,
		addUserMessage,
		streamAssistantMessage,
		addErrorMessage,
		clearMessages,
	};
};
