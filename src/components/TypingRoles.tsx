"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const ROLES = [
  "Full Stack Developer",
  "React.js Engineer",
  "React Native Developer",
  "Next.js & TypeScript Enthusiast",
];

const TYPE_DELAY_MS = 70;
const DELETE_DELAY_MS = 35;
const HOLD_DELAY_MS = 1800;

export default function TypingRoles() {
  const reducedMotion = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;

    const role = ROLES[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text === role) {
      timeout = setTimeout(() => setDeleting(true), HOLD_DELAY_MS);
    } else if (deleting && text === "") {
      timeout = setTimeout(() => {
        setDeleting(false);
        setRoleIndex((index) => (index + 1) % ROLES.length);
      }, TYPE_DELAY_MS * 4);
    } else {
      timeout = setTimeout(
        () => setText(role.slice(0, text.length + (deleting ? -1 : 1))),
        deleting ? DELETE_DELAY_MS : TYPE_DELAY_MS
      );
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, roleIndex, reducedMotion]);

  return (
    <Typography
      component="p"
      aria-label={ROLES.join(", ")}
      sx={{
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
        fontSize: { xs: "1.05rem", md: "1.4rem" },
        color: "primary.light",
        minHeight: "1.6em",
        mb: 3,
      }}
    >
      <Box component="span" aria-hidden sx={{ color: "grey.600", mr: 1.5 }}>
        &gt;
      </Box>
      <Box component="span" aria-hidden>
        {reducedMotion ? ROLES[0] : text}
      </Box>
      <Box
        component="span"
        aria-hidden
        sx={{
          display: "inline-block",
          width: "0.55em",
          height: "1.1em",
          ml: 0.5,
          verticalAlign: "text-bottom",
          bgcolor: "primary.main",
          animation: "caretBlink 1s steps(1) infinite",
        }}
      />
    </Typography>
  );
}
