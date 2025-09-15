import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useStreamingMessages } from "./useStreamingMessages";

describe("useStreamingMessages", () => {
	beforeEach(() => {
		vi.clearAllTimers();
		vi.useFakeTimers();
	});

	it("should initialize with empty messages and not typing", () => {
		const { result } = renderHook(() => useStreamingMessages());

		expect(result.current.messages).toEqual([]);
		expect(result.current.isTyping).toBe(false);
	});

	it("should add user message instantly", () => {
		const { result } = renderHook(() => useStreamingMessages());

		act(() => {
			result.current.addUserMessage("Hello");
		});

		expect(result.current.messages).toHaveLength(1);
		expect(result.current.messages[0]).toMatchObject({
			text: "Hello",
			sender: "user",
		});
		// User messages don't have streaming property
		expect(result.current.messages[0].streaming).toBeUndefined();
	});

	it("should stream assistant message character by character", async () => {
		const { result } = renderHook(() => useStreamingMessages({ speed: 1000 })); // 1000 chars/sec for fast testing

		act(() => {
			result.current.streamAssistantMessage("Hi");
		});

		// Initially typing should be true and message should be empty
		expect(result.current.isTyping).toBe(true);
		expect(result.current.messages).toHaveLength(1);
		expect(result.current.messages[0].text).toBe("");
		expect(result.current.messages[0].streaming).toBe(true);

		// After 1ms (1 char at 1000 chars/sec), should have 'H'
		act(() => {
			vi.advanceTimersByTime(1);
		});
		expect(result.current.messages[0].text).toBe("H");

		// After another 1ms, should have 'Hi'
		act(() => {
			vi.advanceTimersByTime(1);
		});
		expect(result.current.messages[0].text).toBe("Hi");
		expect(result.current.messages[0].streaming).toBe(false);
		expect(result.current.isTyping).toBe(false);
	});

	it("should handle error messages", () => {
		const { result } = renderHook(() => useStreamingMessages());

		act(() => {
			result.current.addErrorMessage("Error occurred");
		});

		expect(result.current.messages).toHaveLength(1);
		expect(result.current.messages[0]).toMatchObject({
			text: "Error occurred",
			sender: "assistant",
			error: true,
		});
		expect(result.current.isTyping).toBe(false);
	});

	it("should mark existing message as error", () => {
		const { result } = renderHook(() => useStreamingMessages());

		// Add a user message first
		let messageId: string;
		act(() => {
			messageId = result.current.addUserMessage("Test message");
		});

		// Mark it as error
		act(() => {
			result.current.addErrorMessage("Failed to send", messageId);
		});

		expect(result.current.messages).toHaveLength(1);
		expect(result.current.messages[0].error).toBe(true);
		expect(result.current.messages[0].streaming).toBe(false);
	});

	it("should clear all messages", () => {
		const { result } = renderHook(() => useStreamingMessages());

		act(() => {
			result.current.addUserMessage("Message 1");
			result.current.addUserMessage("Message 2");
		});

		expect(result.current.messages).toHaveLength(2);

		act(() => {
			result.current.clearMessages();
		});

		expect(result.current.messages).toEqual([]);
		expect(result.current.isTyping).toBe(false);
	});

	it("should respect custom speed parameter", () => {
		const { result } = renderHook(() => useStreamingMessages({ speed: 500 })); // 500 chars/sec

		act(() => {
			result.current.streamAssistantMessage("AB");
		});

		// At 500 chars/sec, interval should be 2ms per character
		act(() => {
			vi.advanceTimersByTime(2);
		});
		expect(result.current.messages[0].text).toBe("A");

		act(() => {
			vi.advanceTimersByTime(2);
		});
		expect(result.current.messages[0].text).toBe("AB");
		expect(result.current.messages[0].streaming).toBe(false);
	});
});
