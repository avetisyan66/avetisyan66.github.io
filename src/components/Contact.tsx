"use client";

import AnimatedSection from "./AnimatedSection";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useCopyEmail } from "@/hooks/useCopyEmail";
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/lib/constants";

const contactCards = [
  {
    icon: <EmailIcon fontSize="large" />,
    title: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    external: false,
    copyEmail: true,
  },
  {
    icon: <GitHubIcon fontSize="large" />,
    title: "GitHub",
    value: "github.com/avetisyan66",
    href: GITHUB_URL,
    external: true,
  },
  {
    icon: <LinkedInIcon fontSize="large" />,
    title: "LinkedIn",
    value: "linkedin.com/in/avetisyan66",
    href: LINKEDIN_URL,
    external: true,
  },
  {
    icon: <LocationOnIcon fontSize="large" />,
    title: "Location",
    value: "Yerevan, Armenia",
    href: "https://maps.google.com/?q=Yerevan,Armenia",
    external: true,
  },
];

export default function Contact() {
  const copyEmail = useCopyEmail();

  return (
    <Box component="section" id="contact" sx={{ py: { xs: 10, md: 14 } }}>
      <Container maxWidth="lg">
        <AnimatedSection>
          <Box textAlign="center" mb={8}>
            <Typography variant="overline" color="primary.main" fontWeight={500} letterSpacing={3}>
              Let&apos;s Connect
            </Typography>
            <Typography variant="h2" color="white" sx={{ mt: 1, fontSize: { xs: "2rem", md: "2.5rem" } }}>
              Get In Touch
            </Typography>
            <Divider
              sx={{ width: 64, mx: "auto", mt: 2, borderColor: "primary.main", borderWidth: 2, borderRadius: 1 }}
            />
          </Box>
        </AnimatedSection>

        <AnimatedSection>
          <Typography
            variant="h6"
            color="grey.400"
            fontWeight={400}
            textAlign="center"
            maxWidth={600}
            mx="auto"
            mb={6}
            lineHeight={1.7}
          >
            I&apos;m always open to discussing new projects, creative ideas, or opportunities to be
            part of your team. Feel free to reach out!
          </Typography>
        </AnimatedSection>

        <Grid container spacing={3} justifyContent="center">
          {contactCards.map((card, index) => (
            <Grid item xs={12} sm={6} lg={3} key={card.title}>
              <AnimatedSection delay={index * 0.1}>
                <Card
                  sx={{
                    textAlign: "center",
                    "& .contact-icon": {
                      transition: "all 0.3s ease",
                    },
                    "&:hover .contact-icon": {
                      bgcolor: "rgba(200,169,126,0.2)",
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  <CardActionArea
                    component="a"
                    href={card.href}
                    target={card.external ? "_blank" : undefined}
                    rel={card.external ? "noopener noreferrer" : undefined}
                    onClick={
                      card.copyEmail
                        ? (event) => {
                            event.preventDefault();
                            copyEmail();
                          }
                        : undefined
                    }
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box
                        className="contact-icon"
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: 3,
                          bgcolor: "rgba(200,169,126,0.1)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mx: "auto",
                          mb: 2,
                          color: "primary.main",
                        }}
                      >
                        {card.icon}
                      </Box>
                      <Typography variant="subtitle1" color="white" fontWeight={600}>
                        {card.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" mt={0.5} sx={{ overflowWrap: "anywhere" }}>
                        {card.value}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </AnimatedSection>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
