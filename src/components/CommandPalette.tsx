"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from "react";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import InputBase from "@mui/material/InputBase";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import CodeIcon from "@mui/icons-material/Code";
import GitHubIcon from "@mui/icons-material/GitHub";
import SchoolIcon from "@mui/icons-material/School";
import ForumIcon from "@mui/icons-material/Forum";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import Kbd from "./Kbd";
import { useCopyEmail } from "@/hooks/useCopyEmail";
import { EMAIL, GITHUB_URL, LINKEDIN_URL, NAV_LINKS } from "@/lib/constants";

export const OPEN_COMMAND_PALETTE_EVENT = "open-command-palette";

const GROUPS = ["Navigate", "Contact", "Links"] as const;

const NAV_ICONS: Record<string, ReactNode> = {
  "#about": <PersonIcon fontSize="small" />,
  "#experience": <WorkIcon fontSize="small" />,
  "#skills": <CodeIcon fontSize="small" />,
  "#github": <GitHubIcon fontSize="small" />,
  "#education": <SchoolIcon fontSize="small" />,
  "#contact": <ForumIcon fontSize="small" />,
};

interface Command {
  id: string;
  label: string;
  group: (typeof GROUPS)[number];
  icon: ReactNode;
  keywords?: string;
  external?: boolean;
  /** Scrolling is deferred until the dialog has closed and released the scroll lock. */
  runAfterClose?: boolean;
  run: () => void;
}

const openExternal = (url: string) => window.open(url, "_blank", "noopener,noreferrer");

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const pendingAction = useRef<(() => void) | null>(null);
  const optionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const copyEmail = useCopyEmail();

  const commands = useMemo<Command[]>(
    () => [
      {
        id: "home",
        label: "Home",
        group: "Navigate",
        icon: <HomeIcon fontSize="small" />,
        keywords: "top hero start",
        runAfterClose: true,
        run: () => window.scrollTo({ top: 0, behavior: "smooth" }),
      },
      ...NAV_LINKS.map<Command>((link) => ({
        id: link.href.slice(1),
        label: link.label,
        group: "Navigate",
        icon: NAV_ICONS[link.href],
        runAfterClose: true,
        run: () => document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" }),
      })),
      {
        id: "copy-email",
        label: "Copy email address",
        group: "Contact",
        icon: <ContentCopyIcon fontSize="small" />,
        keywords: EMAIL,
        run: copyEmail,
      },
      {
        id: "send-email",
        label: "Send an email",
        group: "Contact",
        icon: <EmailIcon fontSize="small" />,
        keywords: "mail write message",
        run: () => {
          window.location.href = `mailto:${EMAIL}`;
        },
      },
      {
        id: "open-github",
        label: "Open GitHub profile",
        group: "Links",
        icon: <GitHubIcon fontSize="small" />,
        keywords: "code repositories",
        external: true,
        run: () => openExternal(GITHUB_URL),
      },
      {
        id: "open-linkedin",
        label: "Open LinkedIn profile",
        group: "Links",
        icon: <LinkedInIcon fontSize="small" />,
        keywords: "connect network",
        external: true,
        run: () => openExternal(LINKEDIN_URL),
      },
    ],
    [copyEmail]
  );

  const filtered = useMemo(() => {
    const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    return commands.filter((command) => {
      const haystack = `${command.label} ${command.group} ${command.keywords ?? ""}`.toLowerCase();
      return terms.every((term) => haystack.includes(term));
    });
  }, [commands, query]);

  const activeCommand = filtered[activeIndex];

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((current) => !current);
      }
    };
    const onOpenRequest = () => setOpen(true);

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener(OPEN_COMMAND_PALETTE_EVENT, onOpenRequest);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener(OPEN_COMMAND_PALETTE_EVENT, onOpenRequest);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
    }
  }, [open]);

  useEffect(() => {
    if (activeCommand) optionRefs.current[activeCommand.id]?.scrollIntoView({ block: "nearest" });
  }, [activeCommand]);

  const select = (command: Command) => {
    if (command.runAfterClose) {
      pendingAction.current = command.run;
    } else {
      command.run();
    }
    setOpen(false);
  };

  const handleKeyDown = (event: ReactKeyboardEvent) => {
    if (!filtered.length) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % filtered.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => (index - 1 + filtered.length) % filtered.length);
    } else if (event.key === "Enter" && activeCommand) {
      event.preventDefault();
      select(activeCommand);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      fullWidth
      maxWidth="sm"
      aria-label="Command palette"
      sx={{ "& .MuiDialog-container": { alignItems: "flex-start" } }}
      slotProps={{
        transition: {
          onExited: () => {
            pendingAction.current?.();
            pendingAction.current = null;
          },
        },
        backdrop: { sx: { bgcolor: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" } },
        paper: {
          sx: {
            mt: { xs: 10, md: "14vh" },
            mx: 2,
            width: "calc(100% - 32px)",
            bgcolor: "rgba(20,20,20,0.96)",
            backgroundImage: "none",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "16px",
            boxShadow: "0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(200,169,126,0.08)",
            overflow: "hidden",
          },
        },
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing={1.5}
        sx={{ px: 2.5, py: 1.75, borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <SearchIcon sx={{ color: "primary.main" }} />
        <InputBase
          autoFocus
          fullWidth
          placeholder="Type a command or search..."
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActiveIndex(0);
          }}
          onKeyDown={handleKeyDown}
          inputProps={{
            role: "combobox",
            "aria-label": "Search commands",
            "aria-expanded": true,
            "aria-controls": "command-palette-options",
            "aria-activedescendant": activeCommand ? `command-${activeCommand.id}` : undefined,
          }}
          sx={{ color: "white", fontSize: "1rem" }}
        />
        <Kbd>esc</Kbd>
      </Stack>

      <Box id="command-palette-options" role="listbox" sx={{ maxHeight: 360, overflowY: "auto", p: 1 }}>
        {filtered.length === 0 && (
          <Typography variant="body2" color="text.secondary" textAlign="center" py={4}>
            No results for &ldquo;{query}&rdquo;
          </Typography>
        )}

        {GROUPS.map((group) => {
          const items = filtered.filter((command) => command.group === group);
          if (!items.length) return null;

          return (
            <Box key={group} role="group" aria-label={group}>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "block", px: 1.5, pt: 1.5, pb: 0.5, letterSpacing: 1, textTransform: "uppercase" }}
              >
                {group}
              </Typography>

              {items.map((command) => {
                const index = filtered.indexOf(command);
                const isActive = index === activeIndex;

                return (
                  <Box
                    key={command.id}
                    id={`command-${command.id}`}
                    ref={(node: HTMLDivElement | null) => {
                      optionRefs.current[command.id] = node;
                    }}
                    role="option"
                    aria-selected={isActive}
                    onMouseMove={() => setActiveIndex(index)}
                    onClick={() => select(command)}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      px: 1.5,
                      py: 1.25,
                      borderRadius: "10px",
                      cursor: "pointer",
                      color: isActive ? "white" : "grey.400",
                      bgcolor: isActive ? "rgba(200,169,126,0.1)" : "transparent",
                      transition: "background-color 0.15s, color 0.15s",
                    }}
                  >
                    <Box sx={{ display: "flex", color: isActive ? "primary.main" : "grey.600" }}>
                      {command.icon}
                    </Box>
                    <Typography variant="body2" sx={{ flexGrow: 1 }}>
                      {command.label}
                    </Typography>
                    {command.external && <OpenInNewIcon sx={{ fontSize: 15, color: "grey.600" }} />}
                    {isActive && <KeyboardReturnIcon sx={{ fontSize: 16, color: "primary.main" }} />}
                  </Box>
                );
              })}
            </Box>
          );
        })}
      </Box>

      <Stack
        direction="row"
        spacing={2.5}
        sx={{
          display: { xs: "none", sm: "flex" },
          px: 2.5,
          py: 1.25,
          borderTop: "1px solid rgba(255,255,255,0.06)",
          color: "text.secondary",
        }}
      >
        {[
          { keys: ["↑", "↓"], label: "navigate" },
          { keys: ["↵"], label: "select" },
          { keys: ["esc"], label: "close" },
        ].map((hint) => (
          <Stack key={hint.label} direction="row" alignItems="center" spacing={0.5}>
            {hint.keys.map((key) => (
              <Kbd key={key}>{key}</Kbd>
            ))}
            <Typography variant="caption" pl={0.5}>
              {hint.label}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Dialog>
  );
}
