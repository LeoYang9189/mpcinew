"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BackgroundBeams = ({ className }: { className?: string }) => {
    return (
        <div
            className={cn(
                "absolute inset-0 z-0 h-full w-full overflow-hidden bg-transparent",
                className
            )}
        >
            <div className="absolute h-full w-full bg-transparent">
                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f766e10_1px,transparent_1px),linear-gradient(to_bottom,#0f766e10_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

                {/* Animated Beams */}
                <motion.div
                    initial={{ opacity: 0.5, x: "-100%" }}
                    animate={{ opacity: [0.5, 1, 0.5], x: "200%" }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear",
                        delay: 0,
                    }}
                    className="absolute top-[10%] left-0 h-[1px] w-[40%] bg-gradient-to-r from-transparent via-teal-500 to-transparent blur-sm"
                />
                <motion.div
                    initial={{ opacity: 0.3, x: "-100%" }}
                    animate={{ opacity: [0.3, 0.8, 0.3], x: "200%" }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear",
                        delay: 2,
                    }}
                    className="absolute top-[40%] left-0 h-[1px] w-[60%] bg-gradient-to-r from-transparent via-teal-400 to-transparent blur-md"
                />
                <motion.div
                    initial={{ opacity: 0.4, x: "-100%" }}
                    animate={{ opacity: [0.4, 0.9, 0.4], x: "200%" }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "linear",
                        delay: 5,
                    }}
                    className="absolute top-[70%] left-0 h-[1px] w-[50%] bg-gradient-to-r from-transparent via-teal-600 to-transparent blur-sm"
                />

                {/* Vertical Beams */}
                <motion.div
                    initial={{ opacity: 0.5, y: "-100%" }}
                    animate={{ opacity: [0.5, 1, 0.5], y: "200%" }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear",
                        delay: 1,
                    }}
                    className="absolute left-[20%] top-0 w-[1px] h-[40%] bg-gradient-to-b from-transparent via-teal-500 to-transparent blur-sm"
                />
                <motion.div
                    initial={{ opacity: 0.3, y: "-100%" }}
                    animate={{ opacity: [0.3, 0.8, 0.3], y: "200%" }}
                    transition={{
                        duration: 14,
                        repeat: Infinity,
                        ease: "linear",
                        delay: 4,
                    }}
                    className="absolute right-[20%] top-0 w-[1px] h-[60%] bg-gradient-to-b from-transparent via-teal-400 to-transparent blur-md"
                />
            </div>
        </div>
    );
};
