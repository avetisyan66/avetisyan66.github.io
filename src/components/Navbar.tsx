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
import Stack from "@mui/material/Stack";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import ButtonBase from "@mui/material/ButtonBase";
import Image from "next/image";
import Kbd from "./Kbd";
import { OPEN_COMMAND_PALETTE_EVENT } from "./CommandPalette";
import { NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [modifierKey, setModifierKey] = useState("Ctrl");

  useEffect(() => {
    if (/Mac|iPhone|iPad/.test(navigator.userAgent)) setModifierKey("⌘");
  }, []);

  const openCommandPalette = () => {
    setMobileOpen(false);
    window.dispatchEvent(new Event(OPEN_COMMAND_PALETTE_EVENT));
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = NAV_LINKS.map((link) =>
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
            setActiveSection(NAV_LINKS[index].href);
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
        bgcolor: scrolled ? "rgba(10,10,10,0.98)" : "rgba(10,10,10,0)",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        // Keep the border always present and only fade its color, so it never animates from the white text color
        borderBottom: "1px solid",
        borderColor: scrolled ? "rgba(200,169,126,0.15)" : "rgba(200,169,126,0)",
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

          <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, md: 3 }}>
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
              {NAV_LINKS.map((link) => (
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

            {/* Command Palette */}
            <ButtonBase
              onClick={openCommandPalette}
              aria-label="Open command palette"
              sx={{
                gap: 1,
                height: 40,
                minWidth: 40,
                px: { xs: 1, md: 1.25 },
                borderRadius: 50,
                color: "grey.400",
                border: { md: "1px solid rgba(255,255,255,0.1)" },
                bgcolor: { md: "rgba(255,255,255,0.03)" },
                transition: "all 0.3s",
                "&:hover": { color: "primary.main", borderColor: "rgba(200,169,126,0.4)" },
              }}
            >
              <SearchIcon fontSize="small" />
              <Stack direction="row" spacing={0.5} sx={{ display: { xs: "none", md: "flex" } }}>
                <Kbd>{modifierKey}</Kbd>
                <Kbd>K</Kbd>
              </Stack>
            </ButtonBase>

            {/* Mobile Toggle */}
            <IconButton
              onClick={() => setMobileOpen(!mobileOpen)}
              sx={{ display: { md: "none" }, color: "white" }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </Stack>
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
              {NAV_LINKS.map((link) => (
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
