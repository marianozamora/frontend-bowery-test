import { useEffect, useRef, RefObject, useCallback } from "react";

interface UseAutoScrollProps {
	dependency?: any; // Variable que dispara el scroll
	enabled?: boolean;
	behavior?: ScrollBehavior;
}

export const useAutoScroll = <T extends HTMLElement>({
	dependency,
	enabled = true,
	behavior = "smooth",
}: UseAutoScrollProps = {}) => {
	const ref = useRef<T>(null);

	// Memoize scroll function to prevent unnecessary re-renders
	const scrollToBottom = useCallback(() => {
		if (!ref.current) return;

		const element = ref.current;
		element.scrollTo({
			top: element.scrollHeight,
			behavior,
		});
	}, [behavior]);

	useEffect(() => {
		if (!enabled) return;

		scrollToBottom();
	}, [dependency, enabled, scrollToBottom]);

	return ref;
};
