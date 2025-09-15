import type { Meta, StoryObj } from "@storybook/react";
import ChatContainer from "./ChatContainer";

const meta: Meta<typeof ChatContainer> = {
	title: "Organisms/ChatContainer",
	component: ChatContainer,
	parameters: {
		layout: "fullscreen",
		docs: {
			description: {
				component:
					"Chat container with real-time messaging, auto-scroll, and mood handling.",
			},
		},
	},
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<div style={{ height: "600px", background: "#000" }}>
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithMoodHandler: Story = {
	args: {
		onMoodChange: (mood: string) => console.log("Mood:", mood),
	},
};

export const MobileView: Story = {
	parameters: {
		viewport: { defaultViewport: "mobile1" },
	},
	decorators: [
		(Story) => (
			<div
				style={{
					height: "100vh",
					background: "#000",
					width: "375px",
					margin: "0 auto",
				}}
			>
				<Story />
			</div>
		),
	],
};
