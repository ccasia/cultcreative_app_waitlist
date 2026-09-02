"use client";

import { motion } from "framer-motion";

export default function LoadingDots() {
	return (
		<span className="inline-flex items-center gap-[3px]">
			{[0, 1, 2].map((i) => (
				<motion.span
					key={i}
					className="inline-block h-[4px] w-[4px] rounded-full bg-current"
					initial={{ opacity: 0.3 }}
					animate={{ opacity: [0.3, 1, 0.3] }}
					transition={{
						duration: 0.9,
						repeat: Infinity,
						ease: "easeInOut",
						delay: i * 0.15,
					}}
				/>
			))}
		</span>
	);
}
