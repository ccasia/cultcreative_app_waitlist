"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { TABS, type TabId } from "./tabs";

export default function PhoneMockup({ interactive }: { interactive: boolean }) {
	const [activeTab, setActiveTab] = useState<TabId>("campaigns");
	const active = TABS.find((t) => t.id === activeTab)!;

	return (
		<div className="relative aspect-[938/1920] w-full">
			{/* Screen — sits under the frame, inset to the bezel opening */}
			<div className="absolute inset-x-[3.95%] inset-y-[1.6%] overflow-hidden rounded-[14.8%/6.9%] bg-[#231F20] z-20">
				<Image
					src="/images/app/status-bar.png"
					alt=""
					width={1572}
					height={230}
					priority
					className="pointer-events-none absolute inset-x-0 top-0 z-10 w-full"
				/>

				<AnimatePresence mode="wait">
					<motion.div
						key={activeTab}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.18 }}
						className="relative h-full w-full"
					>
						<Image
							src={active.screen}
							alt=""
							fill
							sizes="340px"
							className="object-contain"
							priority={activeTab === "campaigns"}
						/>
					</motion.div>
				</AnimatePresence>

				<div
					className="absolute bottom-[2%] left-[3.5%] right-[3.5%] flex items-center justify-between rounded-[24px] p-2"
					style={{
						background:
							"linear-gradient(180deg, rgba(58,58,60,0.6) 0%, #3A3A3C 50%, #3A3A3C 100%)",
						borderTop: "0.5px solid #8E8E93",
					}}
				>
					{TABS.map((tab) => {
						const isActive = tab.id === activeTab;
						return (
							<button
								key={tab.id}
								onClick={interactive ? () => setActiveTab(tab.id) : undefined}
								disabled={!interactive}
								aria-label={tab.label}
								aria-current={isActive ? "page" : undefined}
								className={`flex flex-1 flex-col items-center justify-center gap-[2px] rounded-[16px] py-1.5 transition-colors ${
									isActive ? "bg-[#8A5AFE]/50" : ""
								} ${interactive ? "cursor-pointer" : "cursor-default"}`}
							>
								<img
									src={tab.icon}
									alt=""
									className="h-[16px] w-[16px]"
									style={{
										filter: "brightness(0) invert(1)",
										opacity: isActive ? 1 : 0.55,
									}}
								/>
								<span
									className={`text-[8px] font-medium leading-none ${
										isActive ? "text-white" : "text-white/55"
									}`}
								>
									{tab.label}
								</span>
							</button>
						);
					})}

					{/* Avatar — not a tab */}
					<Image
						src="/images/app/avatar-user.png"
						alt=""
						width={200}
						height={200}
						className="ml-1 h-[42px] w-[42px] shrink-0 rounded-full"
					/>
				</div>
			</div>
			{/* Bare iPhone frame — transparent screen area, drawn over the screen */}
			<Image
				src="/images/app/iphone-frame-v3.png"
				alt="Cult Creative app"
				fill
				sizes="340px"
				className="pointer-events-none z-10 select-none object-fill z-10"
				priority
				unoptimized
			/>
		</div>
	);
}
