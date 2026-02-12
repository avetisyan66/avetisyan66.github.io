"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ReactNode } from "react";
import Box from "@mui/material/Box";

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  sx?: object;
}

export default function AnimatedSection({
  children,
  delay = 0,
  direction = "up",
  sx,
}: AnimatedSectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 40 : 0,
      x: direction === "left" ? -40 : direction === "right" ? 40 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.6,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <Box
      component={motion.div}
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      sx={sx}
    >
      {children}
    </Box>
  );
}
