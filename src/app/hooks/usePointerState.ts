"use client";

import { useEffect, useState } from "react";
import {
	useMotionValue,
	useMotionValueEvent,
	useSpring,
	type MotionValue,
} from "framer-motion";

const SETTLE_DELAY = 140;
const WHEEL_RANGE = 600;
const TOUCH_RANGE = 0.5;

export type PointerState = {
	progress: MotionValue<number>;
	isFormState: boolean;
	isTouch: boolean;
	isDesktop: boolean;
};

export function usePointerState(): PointerState {
	const raw = useMotionValue(0);
	const progress = useSpring(raw, {
		stiffness: 260,
		damping: 34,
		mass: 0.9,
	});

	const [isFormState, setIsFormState] = useState(false);
	const [isTouch, setIsTouch] = useState(false);
	// mobile (stacked) vs desktop (side by side).
	const [isDesktop, setIsDesktop] = useState(true);

	useEffect(() => {
		const mq = window.matchMedia("(min-width: 1024px)");
		const sync = () => setIsDesktop(mq.matches);
		sync();
		mq.addEventListener("change", sync);
		return () => mq.removeEventListener("change", sync);
	}, []);

	useMotionValueEvent(progress, "change", (v) => {
		setIsFormState(v > 0.5);
	});

	useEffect(() => {
		const reduced = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		if (reduced) {
			raw.set(1);
			return;
		}

		const touch = window.matchMedia("(hover: none)").matches;
		setIsTouch(touch);

		let settleTimer: ReturnType<typeof setTimeout> | undefined;
		const settle = () => {
			clearTimeout(settleTimer);
			settleTimer = setTimeout(() => {
				raw.set(raw.get() > 0.5 ? 1 : 0);
			}, SETTLE_DELAY);
		};

		if (touch) {
			const onScroll = () => {
				const span = window.innerHeight * TOUCH_RANGE;
				const next = Math.min(1, Math.max(0, window.scrollY / span));
				raw.set(next);
				settle();
			};
			window.addEventListener("scroll", onScroll, { passive: true });
			onScroll();
			return () => {
				window.removeEventListener("scroll", onScroll);
				clearTimeout(settleTimer);
			};
		}

		const onWheel = (e: WheelEvent) => {
			// Ignore horizontal scrolling entirely.
			if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

			const next = Math.min(
				1,
				Math.max(0, raw.get() + e.deltaY / WHEEL_RANGE),
			);
			raw.set(next);
			settle();
		};

		const onKey = (e: KeyboardEvent) => {
			const target = e.target as HTMLElement | null;
			if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;

			const down = ["ArrowDown", "PageDown", " ", "End"].includes(e.key);
			const up = ["ArrowUp", "PageUp", "Home"].includes(e.key);
			if (!down && !up) return;

			e.preventDefault();
			clearTimeout(settleTimer);
			raw.set(down ? 1 : 0);
		};

		window.addEventListener("wheel", onWheel, { passive: true });
		window.addEventListener("keydown", onKey);
		return () => {
			window.removeEventListener("wheel", onWheel);
			window.removeEventListener("keydown", onKey);
			clearTimeout(settleTimer);
		};
	}, [raw]);

	return { progress, isFormState, isTouch, isDesktop };
}
