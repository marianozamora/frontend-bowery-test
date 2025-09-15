import type { Meta, StoryObj } from "@storybook/react";
import { AnimatedButton } from "../../../globals";

const meta: Meta<typeof AnimatedButton> = {
	title: "Atoms/AnimatedButton",
	component: AnimatedButton,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: "Animated button with hover effects and visual variants.",
			},
		},
	},
	tags: ["autodocs"],
	args: {
		onClick: () => console.log("Button clicked"),
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		variant: "primary",
		size: "medium",
		children: "Primary Button",
	},
};

export const Secondary: Story = {
	args: {
		variant: "secondary",
		size: "medium",
		children: "Secondary Button",
	},
};

export const Disabled: Story = {
	args: {
		variant: "primary",
		size: "medium",
		children: "Disabled Button",
		disabled: true,
	},
};