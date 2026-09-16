"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function ScrollProgress() {
  const { scrollY, scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  const [showBackToTop, setShowBackToTop] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setShowBackToTop(latest > window.innerHeight * 0.8);
  });

  return (
    <>
      <Box
        component={motion.div}
        style={{ scaleX }}
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          transformOrigin: "0%",
          background: "linear-gradient(90deg, #a88a5e, #c8a97e, #dcc5a0)",
          boxShadow: "0 0 12px rgba(200,169,126,0.5)",
          zIndex: (theme) => theme.zIndex.appBar + 1,
        }}
      />

      <AnimatePresence>
        {showBackToTop && (
          <Box
            component={motion.div}
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 20 }}
            transition={{ duration: 0.25 }}
            sx={{ position: "fixed", right: { xs: 16, md: 32 }, bottom: { xs: 16, md: 32 }, zIndex: "speedDial" }}
          >
            <Fab
              size="medium"
              aria-label="Back to top"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              sx={{
                bgcolor: "rgba(26,26,26,0.85)",
                backdropFilter: "blur(12px)",
                color: "primary.main",
                border: "1px solid rgba(200,169,126,0.3)",
                boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
                "&:hover": { bgcolor: "primary.main", color: "#0a0a0a" },
              }}
            >
              <KeyboardArrowUpIcon />
            </Fab>
          </Box>
        )}
      </AnimatePresence>
    </>
  );
}
