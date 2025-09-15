// Global exports - import all components and hooks from here
export { default as AnimatedButton } from "./components/atoms/AnimatedButton/AnimatedButton";
export { default as ChatBubble } from "./components/atoms/ChatBubble/ChatBubble";
export { default as Input } from "./components/atoms/Input/Input";
export { default as TypingIndicator } from "./components/atoms/TypingIndicator/TypingIndicator";
export * from "./components/atoms/Icons/Icons";
export { default as ChatContainer } from "./components/organisms/ChatContainer";
export { default as IrisInterface } from "./components/organisms/IrisInterface";

// Global hooks
export { useStreamingMessages } from "./hooks/useStreamingMessages";
export { useAutoScroll } from "./hooks/useAutoScroll";