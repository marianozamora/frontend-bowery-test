import React, { useState } from "react";
import Sphere from "../atoms/Sphere";
import ChatBubble from "../atoms/ChatBubble";
import TypingIndicator from "../atoms/TypingIndicator";
import Input from "../atoms/Input";
import MicButton from "../atoms/MicButton";
import Header from "../molecules/Header";
import FloatingOrbs from "../atoms/FloatingOrbs";
import InteractiveBackground from "../atoms/InteractiveBackground";
import styles from "./ChatScreen.module.scss";

interface Message {
	id: string;
	text: string;
	sender: "user" | "assistant";
	streaming?: boolean;
	error?: boolean;
}

const initialMessages: Message[] = [
	{ id: "1", text: "Hola, ¿en qué puedo ayudarte hoy?", sender: "assistant" },
];

const moodGradients: Record<string, string> = {
	orange:
		"radial-gradient(circle at 50% 80%, #FFB347 0%, #FFD700 60%, #222 100%)",
	pinkPurple:
		"radial-gradient(circle at 50% 80%, #BA55D3 0%, #FF69B4 60%, #222 100%)",
	yellow:
		"radial-gradient(circle at 50% 80%, #FFD700 0%, #FFFF99 60%, #222 100%)",
};

const sphereMoods = [
	{ mood: "orange", color: "#FFB347" },
	{ mood: "pinkPurple", color: "#BA55D3" },
	{ mood: "yellow", color: "#FFD700" },
];

const ChatScreen: React.FC = () => {
	const [messages, setMessages] = useState<Message[]>(initialMessages);
	const [input, setInput] = useState("");
	const [typing, setTyping] = useState(false);
	const [mood, setMood] = useState<"orange" | "pinkPurple" | "yellow">(
		"orange"
	);
	const [isRecording, setIsRecording] = useState(false);
	const [subtitle, setSubtitle] = useState("Chatting with Iris");

	// Microinteraction: animar esfera al enviar mensaje
	const [spherePulse, setSpherePulse] = useState(false);

	const handleSend = () => {
		if (!input.trim()) return;
		setMessages([
			...messages,
			{ id: Date.now().toString(), text: input, sender: "user" },
		]);
		setInput("");
		setTyping(true);
		setSpherePulse(true);

		// Cambiar subtitle según el contexto
		if (input.toLowerCase().includes("sam")) {
			setSubtitle("Chatting with Iris about Sam");
		} else if (input.toLowerCase().includes("rachel")) {
			setSubtitle("Chatting with Iris about someone new");
		}

		setTimeout(() => {
			setMessages((msgs) => [
				...msgs,
				{
					id: Date.now().toString(),
					text: "Respuesta del asistente...",
					sender: "assistant",
					streaming: true,
				},
			]);
			setTyping(false);
			setMood((prev) =>
				prev === "orange"
					? "yellow"
					: prev === "yellow"
					? "pinkPurple"
					: "orange"
			);
			setTimeout(() => setSpherePulse(false), 500);
		}, 1200);
	};

	const handleMicToggle = () => {
		setIsRecording(!isRecording);
	};

	return (
		<div className={styles.chatScreen}>
			<InteractiveBackground />
			<FloatingOrbs />
			<Header
				subtitle={subtitle}
				onMicToggle={handleMicToggle}
				isMicActive={isRecording}
			/>
			<main className={styles.main}>
				<div className={styles.spheres}>
					<Sphere
						mood={mood}
						size={64}
						color={sphereMoods.find((s) => s.mood === mood)?.color}
					/>
					<Sphere
						mood={mood}
						size={64}
						color={sphereMoods.find((s) => s.mood === mood)?.color}
					/>
				</div>
				<div className={styles.messages}>
					{messages.map((msg) => (
						<ChatBubble
							key={msg.id}
							message={msg.text}
							sender={msg.sender}
							streaming={msg.streaming}
							error={msg.error}
						/>
					))}
					{typing && <TypingIndicator />}
				</div>
			</main>
			<footer className={styles.footer}>
				{isRecording ? (
					<MicButton
						isActive={isRecording}
						onClick={handleMicToggle}
						size='large'
					/>
				) : (
					<Input
						value={input}
						onChange={(e) => setInput(e.target.value)}
						onSend={handleSend}
					/>
				)}
			</footer>
			{/* Microinteraction: animación de pulso en la esfera */}
			<style>{`
				.${styles.sphere} {
					animation: ${spherePulse ? "pulse 0.5s" : "none"};
				}
				@keyframes pulse {
					0% { transform: scale(1); }
					50% { transform: scale(1.15); }
					100% { transform: scale(1); }
				}
			`}</style>
		</div>
	);
};

export default ChatScreen;
