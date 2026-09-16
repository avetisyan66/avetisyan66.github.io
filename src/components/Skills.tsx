"use client";

import { useInView } from "react-intersection-observer";
import AnimatedSection from "./AnimatedSection";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import LinearProgress from "@mui/material/LinearProgress";
import Divider from "@mui/material/Divider";
import CodeIcon from "@mui/icons-material/Code";
import LayersIcon from "@mui/icons-material/Layers";
import BuildIcon from "@mui/icons-material/Build";
import PsychologyIcon from "@mui/icons-material/Psychology";

type SkillLevel = "Expert" | "Advanced" | "Intermediate";

interface Skill {
  name: string;
  level: SkillLevel;
}

interface SkillCategory {
  icon: React.ReactNode;
  title: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    icon: <CodeIcon />,
    title: "Frontend: Web & Mobile",
    skills: [
      { name: "React.js / Next.js", level: "Expert" },
      { name: "React Native", level: "Expert" },
      { name: "JavaScript", level: "Expert" },
      { name: "TypeScript", level: "Expert" },
      { name: "HTML / CSS", level: "Expert" },
      { name: "Responsive & Mobile-First UI", level: "Expert" },
    ],
  },
  {
    icon: <LayersIcon />,
    title: "State & Data",
    skills: [
      { name: "Redux / Toolkit", level: "Expert" },
      { name: "React Context & Query", level: "Expert" },
      { name: "REST API / CRUD", level: "Expert" },
      { name: "React Hooks / Lifecycles", level: "Expert" },
      { name: "GraphQL / gRPC", level: "Advanced" },
      { name: "Typesense (Search)", level: "Advanced" },
    ],
  },
  {
    icon: <BuildIcon />,
    title: "Tools & Practices",
    skills: [
      { name: "Material UI / Tailwind", level: "Expert" },
      { name: "Figma / Zeplin", level: "Expert" },
      { name: "Git / Bitbucket", level: "Advanced" },
      { name: "Testing (Unit/E2E)", level: "Advanced" },
      { name: "Xcode / Android Studio", level: "Advanced" },
    ],
  },
  {
    icon: <PsychologyIcon />,
    title: "Core Knowledge",
    skills: [
      { name: "OOP", level: "Advanced" },
      { name: "Data Structures & Algorithms", level: "Advanced" },
      { name: "Design Patterns / SOLID", level: "Advanced" },
      { name: "Web Performance & Accessibility", level: "Advanced" },
      { name: "Agile / Scrum", level: "Advanced" },
    ],
  },
];

const levelProgress: Record<SkillLevel, number> = {
  Expert: 100,
  Advanced: 85,
  Intermediate: 70,
};

const levelBadgeSx: Record<SkillLevel, object> = {
  Expert: {
    bgcolor: "rgba(200,169,126,0.15)",
    color: "primary.main",
    borderColor: "rgba(200,169,126,0.4)",
  },
  Advanced: {
    bgcolor: "rgba(255,255,255,0.05)",
    color: "grey.300",
    borderColor: "rgba(255,255,255,0.12)",
  },
  Intermediate: {
    bgcolor: "transparent",
    color: "grey.500",
    borderColor: "rgba(255,255,255,0.08)",
  },
};

function SkillCategoryCard({ category, index }: { category: SkillCategory; index: number }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <AnimatedSection delay={index * 0.15} sx={{ height: "100%" }}>
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
            {category.skills.map((skill, skillIndex) => (
              <Box key={skill.name} sx={{ "&:hover .skill-name": { color: "white" } }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} mb={1}>
                  <Typography className="skill-name" variant="body2" color="grey.300" sx={{ transition: "color 0.3s" }}>
                    {skill.name}
                  </Typography>
                  <Chip
                    label={skill.level}
                    size="small"
                    variant="outlined"
                    sx={{ height: 22, fontSize: "0.7rem", flexShrink: 0, ...levelBadgeSx[skill.level] }}
                  />
                </Stack>
                <LinearProgress
                  variant="determinate"
                  aria-label={`${skill.name}: ${skill.level}`}
                  value={inView ? levelProgress[skill.level] : 0}
                  sx={{
                    "& .MuiLinearProgress-bar": {
                      transition: `transform 1.2s cubic-bezier(0.4, 0, 0.2, 1) ${0.3 + skillIndex * 0.1}s`,
                    },
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
