"use client";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Image from "next/image";
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/lib/constants";

const socials = [
  { icon: <EmailIcon />, href: `mailto:${EMAIL}`, label: "Email" },
  { icon: <GitHubIcon />, href: GITHUB_URL, label: "GitHub" },
  { icon: <LinkedInIcon />, href: LINKEDIN_URL, label: "LinkedIn" },
];

export default function Footer() {
  return (
    <Box component="footer" sx={{ borderTop: "1px solid rgba(255,255,255,0.05)", py: 4 }}>
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
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

          <Stack direction="row" spacing={1}>
            {socials.map((social) => (
              <IconButton
                key={social.label}
                component="a"
                href={social.href}
                target={social.href.startsWith("mailto") ? undefined : "_blank"}
                rel={social.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                aria-label={social.label}
                sx={{
                  color: "grey.500",
                  bgcolor: "rgba(255,255,255,0.03)",
                  "&:hover": {
                    color: "primary.main",
                    bgcolor: "rgba(200,169,126,0.1)",
                  },
                }}
              >
                {social.icon}
              </IconButton>
            ))}
          </Stack>

          <Typography variant="body2" color="text.secondary">
            &copy; {new Date().getFullYear()} Ani Avetisyan
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
