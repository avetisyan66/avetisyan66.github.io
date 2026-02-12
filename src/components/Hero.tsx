"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Image from "next/image";

export default function Hero() {
  const [counters, setCounters] = useState({ years: 0, companies: 0, languages: 0 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const targets = { years: 9, companies: 6, languages: 3 };
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setCounters({
        years: Math.round(eased * targets.years),
        companies: Math.round(eased * targets.companies),
        languages: Math.round(eased * targets.languages),
      });
      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const StatItem = ({
    value,
    label,
    showPlus = false,
  }: {
    value: number;
    label: string;
    showPlus?: boolean;
  }) => (
    <Box>
      <Stack direction="row" alignItems="baseline">
        <Typography variant="h3" fontWeight={700} color="white">
          {value}
        </Typography>
        {showPlus && (
          <Typography variant="h5" color="primary.main" ml={0.5}>
            +
          </Typography>
        )}
      </Stack>
      <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: "block" }}>
        {label}
      </Typography>
    </Box>
  );

  return (
    <Box
      component="section"
      id="hero"
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Background Image */}
      <Box sx={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Image
          src="/images/bg.PNG"
          alt="Background"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(10,10,10,0.6), rgba(10,10,10,0.4), rgba(10,10,10,1))",
          }}
        />
      </Box>

      {/* Content */}
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, pt: 16, pb: 10 }}>
        <Box maxWidth={700}>
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Chip
              label="Full Stack Developer"
              variant="outlined"
              sx={{
                borderColor: "rgba(200,169,126,0.3)",
                bgcolor: "rgba(200,169,126,0.05)",
                color: "primary.main",
                fontWeight: 500,
                letterSpacing: "0.05em",
                mb: 3,
              }}
            />
          </Box>

          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Typography variant="h6" color="grey.500" fontWeight={300} gutterBottom>
              Hello, I&apos;m
            </Typography>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "3rem", md: "4.5rem" },
                color: "white",
                mb: 3,
              }}
            >
              Ani{" "}
              <Box
                component="span"
                sx={{
                  background: "linear-gradient(90deg, #dcc5a0, #c8a97e, #a88a5e)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Avetisyan
              </Box>
            </Typography>
          </Box>

          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <Typography
              variant="h6"
              color="grey.300"
              fontWeight={400}
              sx={{ maxWidth: 600, lineHeight: 1.7, mb: 5 }}
            >
              Crafting modern web & mobile experiences with{" "}
              <Box component="span" sx={{ color: "primary.main", fontWeight: 600 }}>
                9+ years
              </Box>{" "}
              of expertise in the React ecosystem
            </Typography>
          </Box>

          <Stack
            component={motion.div}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ mb: 8 }}
          >
            <Button
              variant="contained"
              href="#contact"
              size="large"
              sx={{
                bgcolor: "primary.main",
                color: "#0a0a0a",
                "&:hover": {
                  bgcolor: "primary.light",
                  boxShadow: "0 8px 30px rgba(200,169,126,0.2)",
                },
              }}
            >
              Get In Touch
            </Button>
            <Button
              variant="outlined"
              href="#experience"
              size="large"
              sx={{
                borderColor: "rgba(255,255,255,0.2)",
                color: "white",
                "&:hover": {
                  borderColor: "primary.main",
                  color: "primary.main",
                },
              }}
            >
              View My Work
            </Button>
          </Stack>

          <Stack
            component={motion.div}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0 }}
            direction="row"
            spacing={{ xs: 4, md: 8 }}
          >
            <StatItem value={counters.years} label="Years Experience" showPlus />
            <StatItem value={counters.companies} label="Companies" showPlus />
            <StatItem value={counters.languages} label="Languages Spoken" />
          </Stack>
        </Box>
      </Container>

      {/* Scroll Indicator */}
      <Box
        component={motion.a}
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        sx={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1.5,
          color: "grey.500",
          textDecoration: "none",
          "&:hover": { color: "primary.main" },
          transition: "color 0.3s",
        }}
      >
        <Box className="mouse-scroll" />
        <Typography variant="caption" sx={{ letterSpacing: "0.2em", textTransform: "uppercase" }}>
          Scroll
        </Typography>
      </Box>
    </Box>
  );
}
