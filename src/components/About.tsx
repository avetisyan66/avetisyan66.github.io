"use client";

import AnimatedSection from "./AnimatedSection";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import WorkIcon from "@mui/icons-material/Work";
import TranslateIcon from "@mui/icons-material/Translate";
import { useCopyEmail } from "@/hooks/useCopyEmail";
import { EMAIL } from "@/lib/constants";

const details = [
  { icon: <LocationOnIcon />, label: "Location", value: "Yerevan, Armenia" },
  {
    icon: <EmailIcon />,
    label: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
  },
  { icon: <WorkIcon />, label: "Current Role", value: "Full Stack Developer\nat RUNA" },
  { icon: <TranslateIcon />, label: "Languages", value: "Armenian, English, Russian, Spanish" },
];

const personalSkills = [
  "Team Player",
  "Adaptable",
  "Detail-Oriented",
  "Strong Communicator",
  "Problem Solver",
  "Self-Motivated",
  "Continuous Learner",
  "Independent Worker",
];

export default function About() {
  const copyEmail = useCopyEmail();

  return (
    <Box component="section" id="about" sx={{ py: { xs: 10, md: 14 }, bgcolor: "#111" }}>
      <Container maxWidth="lg">
        <AnimatedSection>
          <Box textAlign="center" mb={8}>
            <Typography
              variant="overline"
              color="primary.main"
              fontWeight={500}
              letterSpacing={3}
            >
              Get To Know Me
            </Typography>
            <Typography variant="h2" color="white" sx={{ mt: 1, fontSize: { xs: "2rem", md: "2.5rem" } }}>
              About Me
            </Typography>
            <Divider
              sx={{
                width: 64,
                mx: "auto",
                mt: 2,
                borderColor: "primary.main",
                borderWidth: 2,
                borderRadius: 1,
              }}
            />
          </Box>
        </AnimatedSection>

        <Grid container spacing={6}>
          <Grid item xs={12} lg={6}>
            <AnimatedSection direction="left">
              <Stack spacing={2.5}>
                <Typography color="grey.300" lineHeight={1.8}>
                  I graduated from <strong style={{ color: "white" }}>Yerevan State University</strong> with
                  a degree in Informatics and Applied Mathematics, where I built strong programming
                  foundations in C++.
                </Typography>
                <Typography color="grey.300" lineHeight={1.8}>
                  While still a student, I began my professional journey at{" "}
                  <a href="https://tumo.org/" target="_blank" rel="noopener noreferrer" style={{ color: "#c8a97e", textDecoration: "none", fontWeight: 600 }}>TUMO Center for Creative Technologies</a> as a
                  coach, mentoring students and helping them develop their technical skills.
                </Typography>
                <Typography color="grey.300" lineHeight={1.8}>
                  Driven by a passion for JavaScript, I expanded into web and mobile development, working
                  across multiple companies - from building scalable web applications to developing complex
                  mobile apps with React Native. I&apos;ve collaborated with teams at{" "}
                  <a href="https://zoftify.com/" target="_blank" rel="noopener noreferrer" style={{ color: "#c8a97e", textDecoration: "none", fontWeight: 600 }}>Zoftify</a>,{" "}
                  <a href="https://codeex.io/" target="_blank" rel="noopener noreferrer" style={{ color: "#c8a97e", textDecoration: "none", fontWeight: 600 }}>Codeex</a>, and{" "}
                  <a href="https://earnhcm.com/" target="_blank" rel="noopener noreferrer" style={{ color: "#c8a97e", textDecoration: "none", fontWeight: 600 }}>EarnHCM</a>, delivering impactful and
                  user-focused solutions.
                </Typography>
                <Typography color="grey.300" lineHeight={1.8}>
                  Following successful freelance work with international clients, I now work as a{" "}
                  Full Stack Developer at <a href="https://app.runahr.com/" target="_blank" rel="noopener noreferrer" style={{ color: "#c8a97e", textDecoration: "none", fontWeight: 600 }}>RUNA</a>, an
                  American-based company, contributing to payroll application development and system
                  improvements.
                </Typography>
                <Typography color="grey.300" lineHeight={1.8}>
                  With over{" "}
                  <Box component="span" sx={{ color: "primary.main", fontWeight: 600 }}>
                    9+ years of professional experience
                  </Box>
                  , I remain committed to continuous learning, growth, and building meaningful,
                  high-quality products.
                </Typography>
              </Stack>
            </AnimatedSection>
          </Grid>

          <Grid item xs={12} lg={6}>
            <AnimatedSection direction="right">
              <Stack spacing={3}>
                <Box>
                  <Grid container spacing={2}>
                    {details.map((detail) => (
                      <Grid item xs={12} sm={6} key={detail.label}>
                        <Card>
                          <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
                            <Stack direction="row" spacing={1.5} alignItems="flex-start">
                              <Box
                                sx={{
                                  width: 40,
                                  height: 40,
                                  borderRadius: 2,
                                  bgcolor: "rgba(200,169,126,0.1)",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  color: "primary.main",
                                  flexShrink: 0,
                                }}
                              >
                                {detail.icon}
                              </Box>
                              <Box>
                                <Typography variant="caption" color="text.secondary" textTransform="uppercase" letterSpacing={1}>
                                  {detail.label}
                                </Typography>
                                {detail.href ? (
                                  <Typography
                                    component="a"
                                    href={detail.href}
                                    onClick={(event) => {
                                      event.preventDefault();
                                      copyEmail();
                                    }}
                                    title="Click to copy"
                                    variant="body2"
                                    sx={{
                                      display: "block",
                                      color: "white",
                                      textDecoration: "none",
                                      mt: 0.3,
                                      "&:hover": { color: "primary.main" },
                                      transition: "color 0.3s",
                                    }}
                                  >
                                    {detail.value}
                                  </Typography>
                                ) : (
                                  <Typography variant="body2" color="white" sx={{ mt: 0.3, whiteSpace: "pre-line" }}>
                                    {detail.value}
                                  </Typography>
                                )}
                              </Box>
                            </Stack>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>

                <Card>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="subtitle1" color="white" fontWeight={600} gutterBottom>
                      Personal Strengths
                    </Typography>
                    <Stack direction="row" flexWrap="wrap" gap={1}>
                      {personalSkills.map((skill) => (
                        <Chip
                          key={skill}
                          label={skill}
                          size="small"
                          variant="outlined"
                          sx={{
                            borderColor: "rgba(200,169,126,0.2)",
                            color: "primary.main",
                            bgcolor: "rgba(200,169,126,0.05)",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              bgcolor: "primary.main",
                              color: "#0a0a0a",
                              borderColor: "primary.main",
                            },
                          }}
                        />
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              </Stack>
            </AnimatedSection>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
