"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert, { type AlertColor } from "@mui/material/Alert";

interface ToastOptions {
  severity?: AlertColor;
  action?: ReactNode;
}

interface Toast extends ToastOptions {
  key: number;
  message: string;
}

type ShowToast = (message: string, options?: ToastOptions) => void;

const ToastContext = createContext<ShowToast | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<Toast | null>(null);
  const [open, setOpen] = useState(false);

  const showToast = useCallback<ShowToast>((message, options) => {
    setToast({ key: Date.now(), message, ...options });
    setOpen(true);
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <Snackbar
        key={toast?.key}
        open={open}
        autoHideDuration={3500}
        onClose={(_, reason) => reason !== "clickaway" && setOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={toast?.severity ?? "success"}
          action={toast?.action}
          onClose={() => setOpen(false)}
          sx={{
            alignItems: "center",
            bgcolor: "#1a1a1a",
            color: "grey.100",
            border: "1px solid rgba(200,169,126,0.3)",
            boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
            "& .MuiAlert-icon": { color: "primary.main" },
          }}
        >
          {toast?.message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
}
