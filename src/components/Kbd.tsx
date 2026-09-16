import Box, { type BoxProps } from "@mui/material/Box";

export default function Kbd({ sx = [], ...props }: BoxProps) {
  return (
    <Box
      component="kbd"
      sx={[
        {
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: 22,
          height: 22,
          px: 0.75,
          borderRadius: "6px",
          border: "1px solid rgba(255,255,255,0.1)",
          bgcolor: "rgba(255,255,255,0.04)",
          color: "grey.400",
          fontFamily: "inherit",
          fontSize: "0.7rem",
          fontWeight: 500,
          lineHeight: 1,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}
    />
  );
}
