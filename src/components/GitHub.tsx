"use client";

import { useEffect, useState } from "react";
import AnimatedSection from "./AnimatedSection";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";
import GitHubIcon from "@mui/icons-material/GitHub";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { GITHUB_URL, GITHUB_USERNAME } from "@/lib/constants";

interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  created_at: string;
}

interface GitHubRepo {
  language: string | null;
  fork: boolean;
}

interface GitHubData {
  user: GitHubUser;
  repos: GitHubRepo[];
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Java: "#b07219",
  CSS: "#663399",
  HTML: "#e34c26",
  "C#": "#178600",
  "C++": "#f34b7d",
  Python: "#3572a5",
  Kotlin: "#a97bff",
  Swift: "#f05138",
};

const getLanguageColor = (language: string) => LANGUAGE_COLORS[language] ?? "#c8a97e";

function getTopLanguages(repos: GitHubRepo[]) {
  const counts = new Map<string, number>();
  repos
    .filter((repo) => !repo.fork && repo.language)
    .forEach((repo) => counts.set(repo.language!, (counts.get(repo.language!) ?? 0) + 1));

  const total = Array.from(counts.values()).reduce((sum, count) => sum + count, 0);
  return Array.from(counts.entries())
    .sort(([, a], [, b]) => b - a)
    .map(([name, count]) => ({ name, percent: Math.round((count / total) * 100) }));
}

const skeletonSx = { bgcolor: "rgba(255,255,255,0.06)" };

function GitHubSkeleton() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={5}>
        <Card sx={{ height: "100%" }}>
          <CardContent sx={{ p: 3 }}>
            <Stack direction="row" spacing={2} alignItems="center" mb={2.5}>
              <Skeleton variant="circular" width={64} height={64} sx={skeletonSx} />
              <Box flexGrow={1}>
                <Skeleton width="50%" height={28} sx={skeletonSx} />
                <Skeleton width="30%" sx={skeletonSx} />
              </Box>
            </Stack>
            <Skeleton sx={skeletonSx} />
            <Skeleton width="80%" sx={skeletonSx} />
            <Stack direction="row" spacing={2} mt={3}>
              {[0, 1, 2].map((item) => (
                <Skeleton key={item} variant="rounded" height={56} sx={{ ...skeletonSx, flex: 1 }} />
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={7}>
        <Card sx={{ height: "100%" }}>
          <CardContent sx={{ p: 3 }}>
            <Skeleton width="35%" height={28} sx={skeletonSx} />
            <Skeleton variant="rounded" height={10} sx={{ ...skeletonSx, my: 3 }} />
            {[0, 1, 2].map((item) => (
              <Skeleton key={item} width="60%" sx={skeletonSx} />
            ))}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default function GitHub() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const request = (path: string) =>
      fetch(`https://api.github.com${path}`, { signal: controller.signal }).then((response) => {
        if (!response.ok) throw new Error(`GitHub API responded with ${response.status}`);
        return response.json();
      });

    Promise.all([
      request(`/users/${GITHUB_USERNAME}`),
      request(`/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed`),
    ])
      .then(([user, repos]: [GitHubUser, GitHubRepo[]]) => setData({ user, repos }))
      .catch((fetchError: Error) => {
        if (fetchError.name !== "AbortError") setError(true);
      });

    return () => controller.abort();
  }, []);

  const languages = data ? getTopLanguages(data.repos) : [];

  return (
    <Box component="section" id="github" sx={{ py: { xs: 10, md: 14 } }}>
      <Container maxWidth="lg">
        <AnimatedSection>
          <Box textAlign="center" mb={8}>
            <Typography variant="overline" color="primary.main" fontWeight={500} letterSpacing={3}>
              Open Source
            </Typography>
            <Typography variant="h2" color="white" sx={{ mt: 1, fontSize: { xs: "2rem", md: "2.5rem" } }}>
              GitHub Activity
            </Typography>
            <Divider
              sx={{ width: 64, mx: "auto", mt: 2, borderColor: "primary.main", borderWidth: 2, borderRadius: 1 }}
            />
          </Box>
        </AnimatedSection>

        {error && (
          <AnimatedSection>
            <Card sx={{ maxWidth: 520, mx: "auto", textAlign: "center" }}>
              <CardContent sx={{ p: 4 }}>
                <GitHubIcon sx={{ fontSize: 40, color: "primary.main", mb: 2 }} />
                <Typography color="grey.300" mb={3}>
                  GitHub data couldn&apos;t be loaded right now, but you can browse everything directly on
                  my profile.
                </Typography>
                <Button
                  variant="outlined"
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  endIcon={<OpenInNewIcon />}
                >
                  View on GitHub
                </Button>
              </CardContent>
            </Card>
          </AnimatedSection>
        )}

        {!error && !data && <GitHubSkeleton />}

        {data && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={5}>
              <AnimatedSection direction="left" sx={{ height: "100%" }}>
                <Card sx={{ height: "100%" }}>
                  <CardContent sx={{ p: 3, height: "100%", display: "flex", flexDirection: "column" }}>
                    <Stack direction="row" spacing={2} alignItems="center" mb={2.5}>
                      <Avatar
                        src={data.user.avatar_url}
                        alt={data.user.name ?? data.user.login}
                        sx={{ width: 64, height: 64, border: "2px solid rgba(200,169,126,0.4)" }}
                      />
                      <Box>
                        <Typography variant="h6" color="white" fontWeight={700}>
                          {data.user.name ?? data.user.login}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          @{data.user.login}
                        </Typography>
                      </Box>
                    </Stack>

                    {data.user.bio && (
                      <Typography variant="body2" color="grey.400" lineHeight={1.7} mb={3}>
                        {data.user.bio}
                      </Typography>
                    )}

                    <Stack direction="row" spacing={1.5} mb={3}>
                      {[
                        { label: "Repos", value: data.user.public_repos },
                        { label: "Followers", value: data.user.followers },
                        { label: "Since", value: new Date(data.user.created_at).getFullYear() },
                      ].map((stat) => (
                        <Box
                          key={stat.label}
                          sx={{
                            flex: 1,
                            py: 1.5,
                            textAlign: "center",
                            borderRadius: "12px",
                            bgcolor: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.05)",
                          }}
                        >
                          <Typography variant="h6" color="white" fontWeight={700} lineHeight={1.2}>
                            {stat.value}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {stat.label}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>

                    <Box flexGrow={1} />
                    <Button
                      variant="outlined"
                      href={GITHUB_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      startIcon={<GitHubIcon />}
                      sx={{
                        borderColor: "rgba(255,255,255,0.2)",
                        color: "white",
                        "&:hover": { borderColor: "primary.main", color: "primary.main" },
                      }}
                    >
                      Follow on GitHub
                    </Button>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </Grid>

            <Grid item xs={12} md={7}>
              <AnimatedSection direction="right" sx={{ height: "100%" }}>
                <Card sx={{ height: "100%" }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" color="white" fontWeight={700}>
                      Top Languages
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Across my original public repositories
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        height: 10,
                        borderRadius: 5,
                        overflow: "hidden",
                        gap: "2px",
                        my: 3,
                        bgcolor: "rgba(255,255,255,0.05)",
                      }}
                    >
                      {languages.map((language) => (
                        <Box
                          key={language.name}
                          title={`${language.name} ${language.percent}%`}
                          sx={{ width: `${language.percent}%`, bgcolor: getLanguageColor(language.name) }}
                        />
                      ))}
                    </Box>

                    <Grid container spacing={2}>
                      {languages.map((language) => (
                        <Grid item xs={6} key={language.name}>
                          <Stack direction="row" alignItems="center" spacing={1.25}>
                            <Box
                              sx={{
                                width: 10,
                                height: 10,
                                borderRadius: "50%",
                                bgcolor: getLanguageColor(language.name),
                                flexShrink: 0,
                              }}
                            />
                            <Typography variant="body2" color="grey.300" flexGrow={1}>
                              {language.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {language.percent}%
                            </Typography>
                          </Stack>
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
}
