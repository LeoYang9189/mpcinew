"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const GlowingBorder = ({
    children,
    className,
    containerClassName,
}: {
    children: React.ReactNode;
    className?: string;
    containerClassName?: string;
}) => {
    return (
        <div className={cn("relative group", containerClassName)}>
            <div className="absolute -inset-[1px] bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500 rounded-xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500 animate-gradient-xy" />
            <motion.div
                className="absolute -inset-[1px] bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear",
                }}
                style={{
                    backgroundSize: "200% 200%",
                }}
            />
            <div className={cn("relative bg-white rounded-xl", className)}>
                {children}
            </div>
        </div>
    );
};
