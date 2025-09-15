import type { Meta, StoryObj } from "@storybook/react";
import { ChatBubble } from "../../../globals";

const meta: Meta<typeof ChatBubble> = {
	title: "Atoms/ChatBubble",
	component: ChatBubble,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"Chat bubble component that differentiates between user and assistant messages.",
			},
		},
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const UserMessage: Story = {
	args: {
		message: "Hello, can you help me with this question?",
		sender: "user",
	},
};

export const AssistantMessage: Story = {
	args: {
		message: "Hello! I'd be happy to help you. What's your question?",
		sender: "assistant",
	},
};

export const StreamingMessage: Story = {
	args: {
		message: "This message is being typed in real-time",
		sender: "assistant",
		streaming: true,
	},
};

export const ErrorMessage: Story = {
	args: {
		message: "This message failed to send",
		sender: "user",
		error: true,
	},
};

export const LongMessage: Story = {
	args: {
		message:
			"This is a very long message that demonstrates how chat bubbles behave when the content is extensive. The text should wrap correctly within the container and maintain readability.",
		sender: "assistant",
	},
};
