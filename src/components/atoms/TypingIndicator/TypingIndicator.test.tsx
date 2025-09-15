import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TypingIndicator } from "../../../globals";

describe("TypingIndicator", () => {
	it("should render the typing indicator", () => {
		render(<TypingIndicator />);

		const indicator = screen.getByRole("status");
		expect(indicator).toBeInTheDocument();
		expect(indicator.className).toContain("typing");
	});

	it("should render three animated dots", () => {
		render(<TypingIndicator />);

		const indicator = screen.getByRole("status");
		const dots = indicator.querySelectorAll("span");
		expect(dots).toHaveLength(3);
	});

	it("should have proper accessibility attributes", () => {
		render(<TypingIndicator />);

		const indicator = screen.getByRole("status");
		expect(indicator).toHaveAttribute(
			"aria-label",
			"El asistente está escribiendo"
		);
		expect(indicator).toHaveAttribute("role", "status");
	});

	it("should apply typing CSS class", () => {
		render(<TypingIndicator />);

		const indicator = screen.getByRole("status");
		expect(indicator.className).toContain("typing");
	});

	it("should render consistently", () => {
		const { rerender } = render(<TypingIndicator />);

		expect(screen.getByRole("status")).toBeInTheDocument();

		rerender(<TypingIndicator />);
		expect(screen.getByRole("status")).toBeInTheDocument();
	});

	it("should be accessible to screen readers", () => {
		render(<TypingIndicator />);

		const indicator = screen.getByLabelText("El asistente está escribiendo");
		expect(indicator).toBeInTheDocument();
	});

	it("should have the correct structure", () => {
		render(<TypingIndicator />);

		const indicator = screen.getByRole("status");
		expect(indicator.tagName).toBe("DIV");
		expect(indicator.children).toHaveLength(3);

		// All children should be span elements
		Array.from(indicator.children).forEach((child) => {
			expect(child.tagName).toBe("SPAN");
		});
	});
});
