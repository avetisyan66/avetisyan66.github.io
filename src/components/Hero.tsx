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
import TypingRoles from "./TypingRoles";
import heroBackground from "../../public/images/bg.PNG";

export default function Hero() {
  const [counters, setCounters] = useState({ years: 0, companies: 0, languages: 0 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const targets = { years: 9, companies: 6, languages: 4 };
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
        // On desktop the hero hugs its content so the next section peeks in right away
        minHeight: { xs: "100vh", lg: "auto" },
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Background Image */}
      <Box sx={{ position: "absolute", inset: 0, zIndex: 0, bgcolor: "#0a0a0a" }}>
        {/* The banner is shown at full width with its real aspect ratio, so the whole photo and signature stay visible */}
        <Box
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            top: { xs: 64, lg: 0 },
            aspectRatio: { xs: `${heroBackground.width} / ${heroBackground.height}`, lg: "auto" },
            // On desktop the photo runs almost the full hero height; extra width is trimmed from the laptop side
            height: { lg: "100%" },
            maskImage: {
              xs: "linear-gradient(to bottom, transparent, black 12%, black 80%, transparent)",
              lg: "linear-gradient(to bottom, black 55%, transparent)",
            },
            WebkitMaskImage: {
              xs: "linear-gradient(to bottom, transparent, black 12%, black 80%, transparent)",
              lg: "linear-gradient(to bottom, black 55%, transparent)",
            },
          }}
        >
          <Image src={heroBackground} alt="Background" fill sizes="100vw" style={{ objectFit: "cover", objectPosition: "right center" }} priority />
        </Box>

        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: {
              xs: "rgba(10,10,10,0.3)",
              // Top shade keeps the transparent navbar readable over the light part of the photo,
              // the left-side shade keeps the intro text readable over the laptop part
              // and the bottom fades into the About section's background so there's no seam
              lg: "linear-gradient(to bottom, rgba(10,10,10,0.85), rgba(10,10,10,0.55) 70px, rgba(10,10,10,0) 200px), linear-gradient(to bottom, rgba(17,17,17,0) 65%, #111), linear-gradient(to right, rgba(10,10,10,0.85), rgba(10,10,10,0.65) 40%, rgba(10,10,10,0.15) 70%, rgba(10,10,10,0))",
            },
          }}
        />

        {/* Soft blur band behind the navbar that fades out downwards */}
        <Box
          sx={{
            display: { xs: "none", lg: "block" },
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 160,
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            maskImage: "linear-gradient(to bottom, black 40%, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent)",
          }}
        />
      </Box>

      {/* Content */}
      <Container maxWidth="lg" sx={{
          position: "relative",
          zIndex: 1,
          // Below 1200px the content starts under the full-width banner (64px navbar + banner height)
          pt: { xs: `calc(64px + ${(heroBackground.height / heroBackground.width) * 100}vw + 24px)`, lg: 16 },
          pb: { xs: 10, lg: 8 },
        }}>
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
                mb: 2,
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
            <TypingRoles />
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
    </Box>
  );
}
