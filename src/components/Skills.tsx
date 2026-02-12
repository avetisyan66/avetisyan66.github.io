"use client";

import { useEffect, useRef, useState } from "react";
import AnimatedSection from "./AnimatedSection";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import Divider from "@mui/material/Divider";
import CodeIcon from "@mui/icons-material/Code";
import LayersIcon from "@mui/icons-material/Layers";
import BuildIcon from "@mui/icons-material/Build";
import PsychologyIcon from "@mui/icons-material/Psychology";

interface Skill {
  name: string;
  level: string;
  width: number;
}

interface SkillCategory {
  icon: React.ReactNode;
  title: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    icon: <CodeIcon />,
    title: "Frontend & Mobile",
    skills: [
      { name: "React.js", level: "Expert", width: 95 },
      { name: "React Native", level: "Expert", width: 93 },
      { name: "JavaScript", level: "Expert", width: 95 },
      { name: "TypeScript", level: "Expert", width: 93 },
      { name: "HTML / CSS", level: "Expert", width: 95 },
    ],
  },
  {
    icon: <LayersIcon />,
    title: "State & Data",
    skills: [
      { name: "Redux / Toolkit", level: "Expert", width: 92 },
      { name: "React Context & Query", level: "Advanced", width: 90 },
      { name: "REST API / CRUD", level: "Expert", width: 94 },
      { name: "GraphQL / gRPC", level: "Advanced", width: 80 },
      { name: "React Hooks / Lifecycles", level: "Expert", width: 95 },
    ],
  },
  {
    icon: <BuildIcon />,
    title: "Tools & Practices",
    skills: [
      { name: "Material UI / Tailwind", level: "Advanced", width: 88 },
      { name: "Git / Bitbucket", level: "Advanced", width: 90 },
      { name: "Testing (Unit/E2E)", level: "Advanced", width: 82 },
      { name: "Figma / Zeplin", level: "Advanced", width: 85 },
      { name: "Xcode / Android Studio", level: "Intermediate", width: 75 },
    ],
  },
  {
    icon: <PsychologyIcon />,
    title: "Core Knowledge",
    skills: [
      { name: "OOP", level: "Advanced", width: 88 },
      { name: "Data Structures & Algorithms", level: "Advanced", width: 85 },
      { name: "Agile / Scrum", level: "Advanced", width: 90 },
    ],
  },
];

function SkillCategoryCard({ category, index }: { category: SkillCategory; index: number }) {
  const [animate, setAnimate] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatedSection delay={index * 0.15}>
      <Card ref={ref} sx={{ height: "100%" }}>
        <CardContent sx={{ p: 3 }}>
          <Stack direction="row" alignItems="center" spacing={1.5} mb={3}>
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
              }}
            >
              {category.icon}
            </Box>
            <Typography variant="h6" color="white" fontWeight={700}>
              {category.title}
            </Typography>
          </Stack>

          <Stack spacing={2.5}>
            {category.skills.map((skill) => (
              <Box key={skill.name}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={0.5}>
                  <Typography variant="body2" color="grey.300">
                    {skill.name}
                  </Typography>
                  <Typography variant="caption" color="primary.main" fontWeight={500}>
                    {skill.level}
                  </Typography>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={animate ? skill.width : 0}
                  sx={{
                    transition: "all 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                />
              </Box>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </AnimatedSection>
  );
}

export default function Skills() {
  return (
    <Box component="section" id="skills" sx={{ py: { xs: 10, md: 14 }, bgcolor: "#111" }}>
      <Container maxWidth="lg">
        <AnimatedSection>
          <Box textAlign="center" mb={8}>
            <Typography variant="overline" color="primary.main" fontWeight={500} letterSpacing={3}>
              What I Work With
            </Typography>
            <Typography variant="h2" color="white" sx={{ mt: 1, fontSize: { xs: "2rem", md: "2.5rem" } }}>
              Technical Skills
            </Typography>
            <Divider
              sx={{ width: 64, mx: "auto", mt: 2, borderColor: "primary.main", borderWidth: 2, borderRadius: 1 }}
            />
          </Box>
        </AnimatedSection>

        <Grid container spacing={3}>
          {skillCategories.map((category, index) => (
            <Grid item xs={12} md={6} key={category.title}>
              <SkillCategoryCard category={category} index={index} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
