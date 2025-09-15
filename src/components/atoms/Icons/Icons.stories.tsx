import type { Meta, StoryObj } from "@storybook/react";
import {
	MicIcon,
	ChatIcon,
	InsightsIcon,
	ExploreIcon,
	IrisIcon,
	TypeIcon,
} from "./Icons";

const meta: Meta = {
	title: "Atoms/Icons",
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: "Collection of SVG icons used throughout the application.",
			},
		},
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AllIcons: Story = {
	render: () => (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: "repeat(3, 1fr)",
				gap: "24px",
				padding: "20px",
				color: "white",
			}}
		>
			{[
				{ Component: MicIcon, name: "MicIcon" },
				{ Component: ChatIcon, name: "ChatIcon" },
				{ Component: InsightsIcon, name: "InsightsIcon" },
				{ Component: ExploreIcon, name: "ExploreIcon" },
				{ Component: IrisIcon, name: "IrisIcon" },
				{ Component: TypeIcon, name: "TypeIcon" },
			].map(({ Component, name }) => (
				<div
					key={name}
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						gap: "8px",
					}}
				>
					<Component size={32} />
					<span style={{ fontSize: "12px" }}>{name}</span>
				</div>
			))}
		</div>
	),
};

export const DifferentSizes: Story = {
	render: () => (
		<div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
			<MicIcon size={16} />
			<MicIcon size={24} />
			<MicIcon size={32} />
			<MicIcon size={48} />
		</div>
	),
};