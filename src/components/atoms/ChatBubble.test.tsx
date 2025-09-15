import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ChatBubble from "./ChatBubble";

describe("ChatBubble", () => {
	beforeEach(() => {
		vi.clearAllTimers();
		vi.useFakeTimers();
	});

	it("should render user message correctly", () => {
		render(<ChatBubble message='Hello Iris' sender='user' />);

		expect(screen.getByText("Hello Iris")).toBeInTheDocument();
		const bubble = screen.getByRole("status");
		// Check that it has the correct CSS classes (CSS modules add hashes)
		expect(bubble.className).toContain("bubble");
		expect(bubble.className).toContain("user");
	});

	it("should render assistant message correctly", () => {
		render(
			<ChatBubble message='Hello! How can I help you?' sender='assistant' />
		);

		expect(screen.getByText("Hello! How can I help you?")).toBeInTheDocument();
		const bubble = screen.getByRole("status");
		expect(bubble.className).toContain("bubble");
		expect(bubble.className).toContain("assistant");
	});

	it("should show error state for failed messages", () => {
		render(<ChatBubble message='Failed message' sender='user' error={true} />);

		const bubble = screen.getByRole("status");
		expect(bubble.className).toContain("error");
		expect(screen.getByText("Error al enviar mensaje")).toBeInTheDocument();
		expect(screen.getByLabelText("Reintentar envío")).toBeInTheDocument();
	});

	it("should show streaming cursor for streaming messages", () => {
		render(
			<ChatBubble message='Streaming...' sender='assistant' streaming={true} />
		);

		const bubble = screen.getByRole("status");
		expect(bubble.className).toContain("streaming");
		expect(screen.getByText("|")).toBeInTheDocument(); // Cursor
	});

	it("should have correct aria attributes", () => {
		render(<ChatBubble message='Test message' sender='user' />);

		const bubble = screen.getByRole("status");
		expect(bubble).toHaveAttribute("aria-live", "off");
		expect(bubble).toHaveAttribute("aria-label", "Tu mensaje: Test message");
	});

	it("should have aria-live=polite for streaming messages", () => {
		render(
			<ChatBubble
				message='Streaming message'
				sender='assistant'
				streaming={true}
			/>
		);

		const bubble = screen.getByRole("status");
		expect(bubble).toHaveAttribute("aria-live", "polite");
		expect(bubble).toHaveAttribute(
			"aria-label",
			"Mensaje del asistente: Streaming message"
		);
	});

	it("should apply custom className when provided", () => {
		render(
			<ChatBubble
				message='Test message'
				sender='user'
				className='custom-class'
			/>
		);

		expect(screen.getByRole("status")).toHaveClass("custom-class");
	});

	it("should handle empty message gracefully", () => {
		render(<ChatBubble message='' sender='assistant' />);

		const bubble = screen.getByRole("status");
		expect(bubble).toBeInTheDocument();
		expect(bubble).toHaveAttribute("aria-label", "Mensaje del asistente: ");
	});

	it("should show retry button for error messages", async () => {
		render(<ChatBubble message='Failed message' sender='user' error={true} />);

		const retryButton = screen.getByLabelText("Reintentar envío");
		expect(retryButton).toBeInTheDocument();
		expect(retryButton.tagName).toBe("BUTTON");
	});

	it("should combine all CSS classes correctly", () => {
		render(
			<ChatBubble
				message='Test message'
				sender='assistant'
				streaming={true}
				error={true}
				className='custom'
			/>
		);

		const bubble = screen.getByRole("status");
		expect(bubble.className).toContain("assistant");
		expect(bubble.className).toContain("streaming");
		expect(bubble.className).toContain("error");
		expect(bubble.className).toContain("custom");
	});
});
