"use client";

import { useEffect, useState } from "react";

/**
 * Returns true when the page should show the "form" state.
 *
 * Desktop: mouse below 55% of the viewport height.
 * Touch:   any scroll past 15% of the viewport.
 *
 * Respects prefers-reduced-motion by pinning to the form state,
 * so the email input is always reachable.
 */
export function usePointerState() {
	const [isFormState, setIsFormState] = useState(false);
	const [isTouch, setIsTouch] = useState(false);
	// Tracks the lg breakpoint so the phone can use a different layout on
	// mobile (stacked) vs desktop (side by side).
	const [isDesktop, setIsDesktop] = useState(true);

	useEffect(() => {
		const mq = window.matchMedia("(min-width: 1024px)");
		const sync = () => setIsDesktop(mq.matches);
		sync();
		mq.addEventListener("change", sync);
		return () => mq.removeEventListener("change", sync);
	}, []);

	useEffect(() => {
		const reduced = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		if (reduced) {
			setIsFormState(true);
			return;
		}

		const touch = window.matchMedia("(hover: none)").matches;
		setIsTouch(touch);

		if (touch) {
			const onScroll = () => {
				setIsFormState(window.scrollY > window.innerHeight * 0.15);
			};
			window.addEventListener("scroll", onScroll, { passive: true });
			onScroll();
			return () => window.removeEventListener("scroll", onScroll);
		}

		// Hysteresis: separate enter/exit thresholds stop the state
		// flickering when the cursor hovers near the boundary.
		let active = false;
		const onMove = (e: MouseEvent) => {
			const y = e.clientY / window.innerHeight;
			if (!active && y > 0.65) {
				active = true;
				setIsFormState(true);
			} else if (active && y < 0.35) {
				active = false;
				setIsFormState(false);
			}
		};

		window.addEventListener("mousemove", onMove, { passive: true });
		return () => window.removeEventListener("mousemove", onMove);
	}, []);

	return { isFormState, isTouch, isDesktop };
}
