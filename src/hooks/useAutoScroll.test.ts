import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useAutoScroll } from "./useAutoScroll";

// Mock scrollTo
const mockScrollTo = vi.fn();
Object.defineProperty(Element.prototype, "scrollTo", {
	writable: true,
	value: mockScrollTo,
});

describe("useAutoScroll", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.runOnlyPendingTimers();
		vi.useRealTimers();
	});

	it("should return a ref object", () => {
		const { result } = renderHook(() => useAutoScroll());

		expect(result.current).toHaveProperty("current");
		expect(result.current.current).toBeNull();
	});

	it("should scroll when dependency changes", () => {
		const { result, rerender } = renderHook(
			({ dependency }) => useAutoScroll({ dependency }),
			{ initialProps: { dependency: 0 } }
		);

		// Create a mock element and set scrollHeight
		const mockElement = document.createElement("div");
		Object.defineProperty(mockElement, "scrollHeight", {
			writable: true,
			value: 1000,
		});
		result.current.current = mockElement;

		// Change dependency
		rerender({ dependency: 1 });

		expect(mockScrollTo).toHaveBeenCalledWith({
			top: 1000,
			behavior: "smooth",
		});
	});

	it("should not scroll when disabled", () => {
		const { result, rerender } = renderHook(
			({ dependency }) => useAutoScroll({ dependency, enabled: false }),
			{ initialProps: { dependency: 0 } }
		);

		const mockElement = document.createElement("div");
		result.current.current = mockElement;

		rerender({ dependency: 1 });

		expect(mockScrollTo).not.toHaveBeenCalled();
	});

	it("should not scroll when no element is attached", () => {
		const { rerender } = renderHook(
			({ dependency }) => useAutoScroll({ dependency }),
			{ initialProps: { dependency: 0 } }
		);

		// Change dependency without attaching element
		rerender({ dependency: 1 });

		expect(mockScrollTo).not.toHaveBeenCalled();
	});

	it("should use custom scroll behavior", () => {
		const { result, rerender } = renderHook(
			({ dependency }) => useAutoScroll({ dependency, behavior: "auto" }),
			{ initialProps: { dependency: 0 } }
		);

		const mockElement = document.createElement("div");
		Object.defineProperty(mockElement, "scrollHeight", {
			writable: true,
			value: 500,
		});
		result.current.current = mockElement;

		rerender({ dependency: 1 });

		expect(mockScrollTo).toHaveBeenCalledWith({
			top: 500,
			behavior: "auto",
		});
	});

	it("should handle multiple dependency changes", () => {
		const { result, rerender } = renderHook(
			({ dependency }) => useAutoScroll({ dependency }),
			{ initialProps: { dependency: 0 } }
		);

		const mockElement = document.createElement("div");
		Object.defineProperty(mockElement, "scrollHeight", {
			writable: true,
			value: 300,
		});
		result.current.current = mockElement;

		// Multiple changes
		rerender({ dependency: 1 });
		rerender({ dependency: 2 });

		expect(mockScrollTo).toHaveBeenCalledTimes(2);
		expect(mockScrollTo).toHaveBeenLastCalledWith({
			top: 300,
			behavior: "smooth",
		});
	});
});
