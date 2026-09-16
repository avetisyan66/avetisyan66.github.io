"use client";

import AnimatedSection from "./AnimatedSection";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";

const experiences = [
  {
    period: "2025 Feb — Present",
    title: "Full Stack Developer",
    company: "RUNA",
    companyUrl: "https://app.runahr.com/",
    description:
      "Building RUNA's payroll website, contributing to both frontend and backend development for scalable and reliable solutions at American-based company.",
    tags: ["React.js", "Next.js", "TypeScript", "Full Stack", "Payroll", "gRPC"],
  },
  {
    period: "2024 Sep — 2025 Mar",
    title: "Senior React & React Native Developer",
    company: "Freelance",
    description:
      "Built high-performance mobile apps and websites for international clients. Managed projects independently, handling client expectations and delivering high-quality solutions across various industries.",
    tags: ["React Native", "React.js", "TypeScript", "JavaScript", "International Clients"],
  },
  {
    period: "2024 Jan — 2024 Aug",
    title: "Middle React Native Developer",
    company: "EarnHCM Software Dev. Company",
    companyUrl: "https://earnhcm.com/",
    description:
      "Successfully developed and deployed a payroll mobile application, gaining deep expertise in complex business logic and enterprise-level mobile development.",
    tags: ["React Native", "TypeScript", "Mobile Dev", "Payroll", "Redux", "REST API"],
  },
  {
    period: "2022 Feb — 2024 Jan",
    title: "React Native Developer",
    company: "Codeex Software Dev. Company",
    companyUrl: "https://codeex.io/",
    description:
      "Contributed as an experienced Web & Mobile App Developer, focusing on PetPace and Vone mobile applications and three production websites using React.js.",
    tags: ["React Native", "TypeScript", "JavaScript", "PetPace", "Vone", "Mobile Dev"],
  },
  {
    period: "2020 Mar — 2021 Dec",
    title: "React Developer",
    company: "Zofti Software Dev. Company",
    companyUrl: "https://zoftify.com/",
    description:
      "Created multiple impactful websites using React.js library and gained valuable experience in professional software development workflows.",
    tags: ["React.js", "Next.js", "JavaScript", "Web Development", "Redux"],
  },
  {
    period: "2019 Jan — 2021 Aug",
    title: "Coach & JS Developer",
    company: "Tumo Center for Creative Technologies",
    companyUrl: "https://tumo.org/",
    description:
      "Taught programming to students and helped them grow technical skills. Developed the tumo.org website using React, combining education with hands-on development.",
    tags: ["React.js", "JavaScript", "Teaching", "Web Development"],
  },
];

export default function Experience() {
  return (
    <Box component="section" id="experience" sx={{ py: { xs: 10, md: 14 } }}>
      <Container maxWidth="lg">
        <AnimatedSection>
          <Box textAlign="center" mb={8}>
            <Typography variant="overline" color="primary.main" fontWeight={500} letterSpacing={3}>
              My Journey
            </Typography>
            <Typography variant="h2" color="white" sx={{ mt: 1, fontSize: { xs: "2rem", md: "2.5rem" } }}>
              Work Experience
            </Typography>
            <Divider
              sx={{ width: 64, mx: "auto", mt: 2, borderColor: "primary.main", borderWidth: 2, borderRadius: 1 }}
            />
          </Box>
        </AnimatedSection>

        {/* Timeline */}
        <Box sx={{ position: "relative" }}>
          {/* Timeline Line - Desktop only */}
          <Box
            sx={{
              display: { xs: "none", md: "block" },
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: 1,
              background:
                "linear-gradient(to bottom, transparent, rgba(200,169,126,1) 10%, rgba(200,169,126,1) 90%, transparent)",
            }}
          />

          <Stack spacing={6}>
            {experiences.map((exp, index) => (
              <AnimatedSection
                key={index}
                delay={index * 0.1}
                direction={index % 2 === 0 ? "left" : "right"}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: index % 2 === 0 ? "row" : "row-reverse" },
                    alignItems: "flex-start",
                    gap: { xs: 1, md: 4 },
                  }}
                >
                  {/* Date */}
                  <Box
                    sx={{
                      display: { xs: "none", md: "block" },
                      width: "50%",
                      textAlign: index % 2 === 0 ? "right" : "left",
                      pr: index % 2 === 0 ? 4 : 0,
                      pl: index % 2 !== 0 ? 4 : 0,
                      pt: 1,
                    }}
                  >
                    <Typography variant="body2" color="primary.main" fontWeight={500}>
                      {exp.period}
                    </Typography>
                  </Box>

                  {/* Dot */}
                  <Box
                    sx={{
                      display: { xs: "none", md: "flex" },
                      position: "absolute",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      bgcolor: "primary.main",
                      border: "4px solid #0a0a0a",
                      zIndex: 1,
                    }}
                  />

                  {/* Card */}
                  <Box
                    sx={{
                      width: { xs: "100%", md: "50%" },
                      pl: { md: index % 2 === 0 ? 4 : 0 },
                      pr: { md: index % 2 !== 0 ? 4 : 0 },
                    }}
                  >
                    {/* Mobile date */}
                    <Typography
                      variant="body2"
                      color="primary.main"
                      fontWeight={500}
                      sx={{ display: { md: "none" }, mb: 1 }}
                    >
                      {exp.period}
                    </Typography>

                    <Card>
                      <CardContent sx={{ p: 3 }}>
                        <Box mb={1.5}>
                          <Typography variant="h6" color="white" fontWeight={700}>
                            {exp.title}
                          </Typography>
                          <Stack direction="row" alignItems="center" spacing={1} mt={0.5}>
                            {exp.companyUrl ? (
                              <Typography
                                component="a"
                                href={exp.companyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                variant="body2"
                                sx={{
                                  color: "text.secondary",
                                  textDecoration: "none",
                                  "&:hover": { color: "primary.main" },
                                  transition: "color 0.3s",
                                }}
                              >
                                {exp.company}
                              </Typography>
                            ) : (
                              <Typography variant="body2" color="text.secondary">
                                {exp.company}
                              </Typography>
                            )}
                          </Stack>
                        </Box>
                        <Typography variant="body2" color="grey.500" lineHeight={1.7} mb={2}>
                          {exp.description}
                        </Typography>
                        <Stack direction="row" flexWrap="wrap" gap={1}>
                          {exp.tags.map((tag) => (
                            <Chip
                              key={tag}
                              label={tag}
                              size="small"
                              sx={{
                                bgcolor: "rgba(255,255,255,0.05)",
                                color: "grey.400",
                                fontSize: "0.75rem",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                  bgcolor: "primary.main",
                                  color: "#0a0a0a",
                                },
                              }}
                            />
                          ))}
                        </Stack>
                      </CardContent>
                    </Card>
                  </Box>
                </Box>
              </AnimatedSection>
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
