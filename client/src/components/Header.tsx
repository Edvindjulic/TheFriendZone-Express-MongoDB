import { Box, Typography } from "@mui/material";

export default function Header() {
  return (
    <Box
      sx={{
        height: "auto",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          padding: "0.5rem",
          color: "primary.main",
          mb: "3rem",
        }}
      >
        The Friend Zone
      </Typography>
    </Box>
  );
}
