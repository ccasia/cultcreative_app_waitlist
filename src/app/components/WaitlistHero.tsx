"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { motion, useTransform } from "framer-motion";
import { usePointerState } from "../hooks/usePointerState";
import PhoneMockup from "./phone/PhoneMockup";
import LoadingDots from "./LoadingDots";

const BRANDS = [
	{ src: "/images/brands/grab.png", alt: "Grab" },
	{ src: "/images/brands/uniqlo.png", alt: "Uniqlo" },
	{ src: "/images/brands/samsung.png", alt: "Samsung" },
	{ src: "/images/brands/spritzer.png", alt: "Spritzer" },
	{ src: "/images/brands/shopee.png", alt: "Shopee" },
	{ src: "/images/brands/nespresso.png", alt: "Nespresso" },
];

const SPRING = {
	type: "spring" as const,
	stiffness: 290,
	damping: 20,
	mass: 1.1,
};

const FORM_SPRING = {
	type: "spring" as const,
	stiffness: 300,
	damping: 11,
	mass: 0.9,
};

/**
 * Endpoints the phone interpolates between as progress runs 0 -> 1.
 * Desktop pivots around the viewport centre; mobile stays centred
 * horizontally and slides down the page.
 */
const PHONE_TRACK = {
	desktop: {
		top: ["50%", "50%"],
		left: ["50%", "78%"],
		y: ["-50%", "-50%"],
		rotate: [15.38, 0],
		scale: [1, 0.85],
	},
	mobile: {
		top: ["22vh", "calc(26vh)"],
		left: ["50%", "50%"],
		y: ["0%", "0%"],
		rotate: [15.38, 0],
		scale: [0.8, 0.75],
	},
};

export default function WaitlistHero() {
	const { progress, isFormState, isTouch, isDesktop } = usePointerState();
	const [email, setEmail] = useState("");
	const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
	const [entered, setEntered] = useState(false);

	useEffect(() => {
		const t = setTimeout(() => setEntered(true), 700);
		return () => clearTimeout(t);
	}, []);

	const track = isDesktop ? PHONE_TRACK.desktop : PHONE_TRACK.mobile;
	const phoneTop = useTransform(progress, [0, 1], track.top);
	const phoneLeft = useTransform(progress, [0, 1], track.left);
	const phoneY = useTransform(progress, [0, 1], track.y);
	const phoneRotate = useTransform(progress, [0, 1], track.rotate);
	const phoneScale = useTransform(progress, [0, 1], track.scale);

	// Branding fades out over the first half, the form fades in over the
	// second, so the two never overlap at full opacity.
	const brandingOpacity = useTransform(progress, [0, 0.45], [1, 0]);
	const formOpacity = useTransform(progress, [0.5, 1], [0, 1]);
	const formShift = useTransform(progress, [0.5, 1], [40, 0]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (status !== "idle") return;

		setStatus("loading");
		try {
			const res = await fetch("/api/waitlist", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email }),
			});
			const data = await res.json();

			if (!res.ok) {
				toast.error(data.error || "Something went wrong. Try again.");
				setStatus("idle");
				return;
			}

			toast.success("Email Registered!");
			setStatus("done");
			setEmail("");
			setTimeout(() => setStatus("idle"), 2000);
		} catch {
			toast.error("Network error. Try again.");
			setStatus("idle");
		}
	};

	const buttonText = () => {
		if (status === "loading") {
			return (
				<span className="inline-flex items-center gap-1.5">
					Registering
					<LoadingDots />
				</span>
			);
		}
		if (status === "done") return "Registered";
		if (isDesktop) return "Register for Waitlist";
		return "Register";
	};

	return (
		<main className="relative min-h-screen overflow-hidden">
			<div className="hero-glow pointer-events-none " />

			{/* Header */}
			<header className="fixed flex w-full items-start justify-between px-2 py-2 lg:px-12 lg:py-6">
				<Image
					src="/images/wordmark.png"
					alt="Cult Creative"
					width={788}
					height={320}
					className="h-10 w-auto lg:h-20"
					priority
				/>
				<p className="max-w-[120px] text-right font-medium tracking-normal text-white/60 lg:max-w-none lg:text-xl text-xs lg:py-4">
					CREATOR APP WAITLIST • 2026
				</p>
			</header>

			{/* ---------- STATE 1: branding ---------- */}
			<motion.div
				className="pointer-events-none fixed inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
				style={{ opacity: brandingOpacity }}
			>
				<h1 className="text-[15vw] font-bold leading-none tracking-[-0.06em] lg:text-[200px]">
					Cult Creative,
				</h1>
				<h2 className="font-times text-[15vw] font-normal italic leading-none tracking-[-0.04em] lg:text-[200px]">
					App waitlist.
				</h2>
			</motion.div>

			{/* ---------- THE PHONE ---------- */}
			<motion.div
				className="fixed z-20"
				initial={{ opacity: 0 }}
				animate={{ opacity: entered ? 1 : 0 }}
				transition={{ opacity: { duration: 0.7, ease: "easeOut" } }}
				style={{
					top: phoneTop,
					left: phoneLeft,
					x: "-50%",
					y: phoneY,
					rotate: phoneRotate,
					scale: phoneScale,
					width: isDesktop ? "clamp(200px, 24vw, 340px)" : "min(58vw, 260px)",
				}}
			>
				<PhoneMockup interactive={isFormState} />
			</motion.div>

			{/* ---------- STATE 2: form ---------- */}
			<motion.div
				className="pointer-events-none fixed inset-0 z-30 flex flex-col justify-start px-6 pt-24 lg:px-12 lg:justify-center lg:px-0 lg:pt-0"
				style={{
					opacity: formOpacity,
					y: formShift,
					visibility: isFormState ? "visible" : "hidden",
				}}
			>
						<div className="pointer-events-auto w-full min-h-[26vh] lg:min-h-0 lg:max-w-[46vw] lg:-mt-24 lg:ml-[calc(22vw-144.5px)]">
							<h1 className="font-serif-display text-5xl leading-[1.05] tracking-[-0.04em] lg:whitespace-nowrap lg:text-[clamp(56px,7.5vw,108px)]">
								Get paid to <span className="text-[#8a5afe]">create</span>.
							</h1>

							<p className="mt-4 text-[12px]/[16px] text-white/85 lg:mt-12 lg:text-[32px]/[36px]">
								Cult Creative connects you with brand campaigns that fit your
								feed. Pitch, sign, deliver, and invoice - one app, real income.
								Join the waitlist for early access.
							</p>
						</div>

						{/*
						 * z-30 lifts only the form above the phone (z-20), so the phone's
						 * tab bar stays clickable everywhere the form does not cover it.
						 */}
						<div className="pointer-events-auto absolute bottom-[12vh] left-6 right-6 lg:static lg:w-full lg:max-w-[46vw] lg:ml-[calc(22vw-144.5px)]">
							<form
								onSubmit={handleSubmit}
								className="flex flex-row gap-3 lg:mt-16"
							>
								<input
									type="email"
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									disabled={status !== "idle"}
									placeholder="your@email.com"
									aria-label="Email address"
									className="w-full rounded-lg border border-white/25 bg-black/40 px-4 py-3.5 text-white placeholder-white/40 outline-none transition-colors focus:border-[#8a5afe] disabled:opacity-60 sm:max-w-xs"
								/>
								<button
									type="submit"
									disabled={status !== "idle"}
									className="shrink-0 cursor-pointer rounded-lg bg-[#8a5afe] px-6 py-3.5 font-bold text-white shadow-[0px_-3px_0px_0px_#00000073_inset] transition-all duration-75 hover:bg-[#7a4aee] active:translate-y-[3px] active:shadow-[0px_0px_0px_0px_#00000073_inset] disabled:cursor-default disabled:bg-[#8a5afe]/50"
								>
									{buttonText()}
								</button>
							</form>
						</div>

						{/* Brand logos */}
						<div className="pointer-events-auto absolute bottom-[5vh] lg:bottom-20 left-3 right-3 flex flex-nowrap items-center justify-between  gap-x-1 lg:gap-x-8 gap-y-4 lg:left-12 lg:right-12 lg:left-[calc(22vw-144.5px)] lg:right-[calc(22vw-144.5px)]">
							{(isDesktop ? BRANDS : BRANDS.slice(0, 5)).map((b) => (
								<Image
									key={b.alt}
									src={b.src}
									alt={b.alt}
									width={200}
									height={100}
									className="h-5 w-auto shrink object-contain opacity-50 lg:h-[clamp(28px,3.2vw,56px)]"
								/>
							))}
						</div>
			</motion.div>

			{/* Touch devices need scroll height to scroll against */}
			{isTouch && <div className="h-[180vh]" />}

			<Toaster
				position="top-center"
				toastOptions={{
					style: {
						background: "#2a2340CC",
						color: "#fff",
						border: "1px solid rgba(255,255,255,0.12)",
					},
				}}
			/>
		</main>
	);
}
