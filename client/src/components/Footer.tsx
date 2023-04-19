import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{
        height: "auto",
      }}
    >
      <Typography
        variant="body1"
        color="primary.contrastText"       
         sx={{
            padding: "0.5rem",
            color: "primary.main",
            fontWeight: 600,
          }}
        >
        The Friend Zone
        {" © "}
      </Typography>
    </Box>
  );
}

