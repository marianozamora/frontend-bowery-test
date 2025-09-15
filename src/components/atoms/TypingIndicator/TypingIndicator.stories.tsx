import type { Meta, StoryObj } from "@storybook/react";
import { TypingIndicator } from "../../../globals";

const meta: Meta<typeof TypingIndicator> = {
	title: "Atoms/TypingIndicator",
	component: TypingIndicator,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"Animated indicator showing when the AI assistant is typing.",
			},
		},
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InChatBubble: Story = {
	render: () => (
		<div
			style={{
				background:
					"linear-gradient(135deg, #6c757d 0%, #495057 50%, #343a40 100%)",
				padding: "14px 18px",
				borderRadius: "20px",
				borderBottomLeftRadius: "8px",
				maxWidth: "200px",
			}}
		>
			<TypingIndicator />
		</div>
	),
};
