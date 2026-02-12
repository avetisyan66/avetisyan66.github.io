"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navLinks.map((link) =>
        document.querySelector(link.href)
      );
      const scrollPos = window.scrollY + 100;

      sections.forEach((section, index) => {
        if (section) {
          const el = section as HTMLElement;
          if (
            scrollPos >= el.offsetTop &&
            scrollPos < el.offsetTop + el.offsetHeight
          ) {
            setActiveSection(navLinks[index].href);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AppBar
      component={motion.nav}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: scrolled ? "rgba(10,10,10,0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
        transition: "all 0.3s ease",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: "space-between", py: scrolled ? 0.5 : 1 }}>
          <Box
            component="a"
            href="#"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              textDecoration: "none",
              "&:hover .logo-text": { color: "primary.main" },
              transition: "all 0.3s",
            }}
          >
            <Image
              src="/images/logo.jpeg"
              alt="Ani Avetisyan"
              width={36}
              height={36}
              style={{ borderRadius: "50%", objectFit: "cover" }}
            />
            <Typography
              className="logo-text"
              variant="h5"
              sx={{
                fontWeight: 700,
                color: "white",
                transition: "color 0.3s",
              }}
            >
              Ani Avetisyan
            </Typography>
          </Box>

          {/* Desktop Nav */}
          <Box
            component="ul"
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 4,
              listStyle: "none",
              m: 0,
              p: 0,
              alignItems: "center",
            }}
          >
            {navLinks.map((link) => (
              <Box component="li" key={link.href}>
                <Typography
                  component="a"
                  href={link.href}
                  sx={{
                    fontSize: "0.8rem",
                    fontWeight: 500,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    color: activeSection === link.href ? "primary.main" : "grey.400",
                    position: "relative",
                    transition: "color 0.3s",
                    "&:hover": { color: "primary.main" },
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: -4,
                      left: 0,
                      width: "100%",
                      height: 2,
                      bgcolor: "primary.main",
                      transform: activeSection === link.href ? "scaleX(1)" : "scaleX(0)",
                      transformOrigin: "right",
                      transition: "transform 0.3s ease",
                    },
                    "&:hover::after": {
                      transform: "scaleX(1)",
                      transformOrigin: "left",
                    },
                  }}
                >
                  {link.label}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Mobile Toggle */}
          <IconButton
            onClick={() => setMobileOpen(!mobileOpen)}
            sx={{ display: { md: "none" }, color: "white" }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Toolbar>
      </Container>

      {/* Mobile Menu */}
      <Collapse in={mobileOpen}>
        <Box
          sx={{
            display: { md: "none" },
            bgcolor: "rgba(17,17,17,0.95)",
            backdropFilter: "blur(12px)",
            borderTop: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <Container maxWidth="lg">
            <List sx={{ py: 2 }}>
              {navLinks.map((link) => (
                <ListItemButton
                  key={link.href}
                  component="a"
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  sx={{
                    borderRadius: 2,
                    "&:hover": { bgcolor: "rgba(200,169,126,0.1)" },
                  }}
                >
                  <ListItemText
                    primary={link.label}
                    primaryTypographyProps={{
                      fontSize: "1.1rem",
                      color: activeSection === link.href ? "primary.main" : "grey.300",
                    }}
                  />
                </ListItemButton>
              ))}
            </List>
          </Container>
        </Box>
      </Collapse>
    </AppBar>
  );
}
