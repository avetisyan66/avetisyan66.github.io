"use client";

import { useCallback } from "react";
import Button from "@mui/material/Button";
import { useToast } from "@/components/providers/ToastProvider";
import { EMAIL } from "@/lib/constants";

export function useCopyEmail() {
  const showToast = useToast();

  return useCallback(async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      showToast("Email copied to clipboard", {
        action: (
          <Button href={`mailto:${EMAIL}`} size="small" sx={{ py: 0.25, px: 1.5, color: "primary.main" }}>
            Open mail
          </Button>
        ),
      });
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  }, [showToast]);
}
