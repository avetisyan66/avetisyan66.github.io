"use client";

import AnimatedSection from "./AnimatedSection";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import SchoolIcon from "@mui/icons-material/School";
import ComputerIcon from "@mui/icons-material/Computer";
import LayersIcon from "@mui/icons-material/Layers";
import CodeIcon from "@mui/icons-material/Code";

const educations = [
  {
    icon: <SchoolIcon fontSize="large" />,
    period: "2017 Sep — 2021 Aug",
    title: "Bachelor's Degree",
    subtitle: "Informatics and Applied Mathematics",
    institution: "Yerevan State University",
  },
  {
    icon: <ComputerIcon fontSize="large" />,
    period: "2024 Aug — 2025 Jan",
    title: "Backend Course (.NET)",
    subtitle: "Server-side Development",
    institution: "Epam Training",
  },
  {
    icon: <LayersIcon fontSize="large" />,
    period: "2022 Apr — 2022 Jun",
    title: "FullStack Course",
    subtitle: "ReactJS | NodeJS",
    institution: "Armenian Code Academy (ACA)",
  },
  {
    icon: <CodeIcon fontSize="large" />,
    period: "2021 Oct — 2022 Apr",
    title: "Advanced JS/React Course",
    subtitle: "JavaScript & React Development",
    institution: "Basic IT Center",
  },
];

export default function Education() {
  return (
    <Box component="section" id="education" sx={{ py: { xs: 10, md: 14 } }}>
      <Container maxWidth="lg">
        <AnimatedSection>
          <Box textAlign="center" mb={8}>
            <Typography variant="overline" color="primary.main" fontWeight={500} letterSpacing={3}>
              Learning Path
            </Typography>
            <Typography variant="h2" color="white" sx={{ mt: 1, fontSize: { xs: "2rem", md: "2.5rem" } }}>
              Education
            </Typography>
            <Divider
              sx={{ width: 64, mx: "auto", mt: 2, borderColor: "primary.main", borderWidth: 2, borderRadius: 1 }}
            />
          </Box>
        </AnimatedSection>

        <Grid container spacing={3}>
          {educations.map((edu, index) => (
            <Grid item xs={12} sm={6} lg={3} key={index}>
              <AnimatedSection delay={index * 0.1} sx={{ height: "100%" }}>
                <Card
                  sx={{
                    height: "100%",
                    textAlign: "center",
                    cursor: "default",
                    "& .edu-icon": {
                      transition: "all 0.3s ease",
                    },
                    "&:hover .edu-icon": {
                      bgcolor: "rgba(200,169,126,0.2)",
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      p: 3,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      className="edu-icon"
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: 3,
                        bgcolor: "rgba(200,169,126,0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 2,
                        color: "primary.main",
                      }}
                    >
                      {edu.icon}
                    </Box>
                    <Typography variant="caption" color="primary.main" fontWeight={500} letterSpacing={1}>
                      {edu.period}
                    </Typography>
                    <Typography variant="h6" color="white" fontWeight={700} mt={1}>
                      {edu.title}
                    </Typography>
                    <Typography variant="body2" color="grey.400" mt={0.5}>
                      {edu.subtitle}
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Typography variant="body2" color="text.secondary" mt={1.5}>
                      {edu.institution}
                    </Typography>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
