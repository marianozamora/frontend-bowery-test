import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Input from "./Input";

const meta: Meta<typeof Input> = {
	title: "Atoms/Input",
	component: Input,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: "Text input field with integrated send button.",
			},
		},
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const InputWrapper = (args: any) => {
	const [value, setValue] = useState(args.value || "");

	return (
		<div style={{ width: "300px" }}>
			<Input
				{...args}
				value={value}
				onChange={(e) => setValue(e.target.value)}
				onSend={() => {
					console.log("Sending:", value);
					setValue("");
				}}
			/>
		</div>
	);
};

export const Default: Story = {
	render: InputWrapper,
	args: {
		placeholder: "Type your message...",
	},
};

export const WithValue: Story = {
	render: InputWrapper,
	args: {
		value: "Sample message",
		placeholder: "Type your message...",
	},
};

export const Disabled: Story = {
	render: InputWrapper,
	args: {
		placeholder: "Disabled field",
		disabled: true,
	},
};
