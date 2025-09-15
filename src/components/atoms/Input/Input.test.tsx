import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { Input } from "../../../globals";

// Component wrapper to handle state for testing
const InputWrapper = ({
	onSend = vi.fn(),
	disabled = false,
	placeholder = "Type a message...",
	className,
	initialValue = "",
}: {
	onSend?: () => void;
	disabled?: boolean;
	placeholder?: string;
	className?: string;
	initialValue?: string;
}) => {
	const [value, setValue] = useState(initialValue);

	const handleSend = () => {
		if (value.trim()) {
			onSend();
			setValue("");
		}
	};

	return (
		<Input
			value={value}
			onChange={(e) => setValue(e.target.value)}
			onSend={handleSend}
			disabled={disabled}
			placeholder={placeholder}
			className={className}
		/>
	);
};

describe("Input", () => {
	it("should render input field correctly", () => {
		render(<InputWrapper placeholder='Type a message...' />);

		expect(
			screen.getByPlaceholderText("Type a message...")
		).toBeInTheDocument();
		expect(screen.getByRole("button")).toBeInTheDocument();
	});

	it("should handle text input changes", async () => {
		const user = userEvent.setup();

		render(<InputWrapper />);

		const input = screen.getByRole("textbox");
		await user.type(input, "Hello world");

		expect(input).toHaveValue("Hello world");
	});

	it("should call onSend when submit button is clicked with text", async () => {
		const user = userEvent.setup();
		const onSend = vi.fn();

		render(<InputWrapper onSend={onSend} />);

		const input = screen.getByRole("textbox");
		const button = screen.getByRole("button");

		await user.type(input, "Test message");
		await user.click(button);

		expect(onSend).toHaveBeenCalled();
	});

	it("should call onSend when Enter key is pressed", async () => {
		const user = userEvent.setup();
		const onSend = vi.fn();

		render(<InputWrapper onSend={onSend} />);

		const input = screen.getByRole("textbox");
		await user.type(input, "Test message");
		await user.keyboard("{enter}");

		expect(onSend).toHaveBeenCalled();
	});

	it("should not send when button clicked with empty input", async () => {
		const user = userEvent.setup();
		const onSend = vi.fn();

		render(<InputWrapper onSend={onSend} />);

		const button = screen.getByRole("button");

		// Button should be disabled when input is empty
		expect(button).toBeDisabled();

		// Even if we could click it, onSend should not be called
		expect(onSend).not.toHaveBeenCalled();
	});

	it("should not send whitespace-only messages", async () => {
		const user = userEvent.setup();
		const onSend = vi.fn();

		render(<InputWrapper onSend={onSend} />);

		const input = screen.getByRole("textbox");
		const button = screen.getByRole("button");

		await user.type(input, "   ");

		// Button should still be disabled with whitespace-only input
		expect(button).toBeDisabled();
		expect(onSend).not.toHaveBeenCalled();
	});

	it("should clear input after sending message", async () => {
		const user = userEvent.setup();
		const onSend = vi.fn();

		render(<InputWrapper onSend={onSend} />);

		const input = screen.getByRole("textbox");
		await user.type(input, "Test message");
		await user.keyboard("{enter}");

		expect(input).toHaveValue("");
	});

	it("should disable input and button when disabled prop is true", () => {
		render(<InputWrapper disabled={true} />);

		const input = screen.getByRole("textbox");
		const button = screen.getByRole("button");

		expect(input).toBeDisabled();
		expect(button).toBeDisabled();
	});

	it("should disable button when input is empty", () => {
		render(<InputWrapper />);

		const button = screen.getByRole("button");
		expect(button).toBeDisabled();
	});

	it("should enable button when input has text", async () => {
		const user = userEvent.setup();

		render(<InputWrapper />);

		const input = screen.getByRole("textbox");
		const button = screen.getByRole("button");

		expect(button).toBeDisabled();

		await user.type(input, "Test");
		expect(button).toBeEnabled();
	});

	it("should apply custom className", () => {
		render(<InputWrapper className='custom-input' />);

		const container = screen.getByRole("textbox").closest("div");
		expect(container).toHaveClass("custom-input");
	});

	it("should have proper accessibility attributes", () => {
		render(<InputWrapper placeholder='Type your message' />);

		const input = screen.getByRole("textbox");

		expect(input).toHaveAttribute("placeholder", "Type your message");
		expect(input).toHaveAttribute("aria-label", "Type your message");
	});

	it("should use default placeholder when none provided", () => {
		render(<InputWrapper />);

		const input = screen.getByRole("textbox");
		expect(input).toHaveAttribute("placeholder", "Type a message...");
	});

	it("should not call onSend when disabled and Enter is pressed", async () => {
		const user = userEvent.setup();
		const onSend = vi.fn();

		render(
			<InputWrapper onSend={onSend} disabled={true} initialValue='Test' />
		);

		const input = screen.getByRole("textbox");
		await user.keyboard("{enter}");

		expect(onSend).not.toHaveBeenCalled();
	});
});
