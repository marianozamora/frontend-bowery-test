import { useEffect, useRef, RefObject } from "react";

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

	useEffect(() => {
		if (!enabled || !ref.current) return;

		const element = ref.current;

		// Scroll al final del contenedor
		element.scrollTo({
			top: element.scrollHeight,
			behavior,
		});
	}, [dependency, enabled, behavior]);

	return ref;
};
