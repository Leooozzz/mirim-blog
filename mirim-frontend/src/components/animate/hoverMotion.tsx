"use client";

import { motion, MotionProps } from "framer-motion";
import { ReactNode } from "react";

interface HoverMotionProps extends MotionProps {
  children: ReactNode;
  className?: string;
  scale?: number;
  y?: number;
  rotate?: number;
  shadow?: boolean;
}

export function HoverMotion({
  children,
  className,
  scale = 1.05,
  y = -6,
  rotate = 0,
  shadow = true,
  ...props
}: HoverMotionProps) {
  return (
    <motion.div
      whileHover={{
        scale,
        y,
        rotate,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      className={className}
      {...props}
    >
      <div
        className={`transition-shadow duration-300 ${
          shadow ? "hover:shadow-2xl" : ""
        }`}
      >
        {children}
      </div>
    </motion.div>
  );
}