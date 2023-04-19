import { Box, Typography } from "@mui/material";

export default function Header() {
  return (
    <Box
      sx={{
        height: "auto",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          padding: "0.5rem",
          color: "primary.main",
        }}
      >
        The Friend Zone
      </Typography>
    </Box>
  );
}
