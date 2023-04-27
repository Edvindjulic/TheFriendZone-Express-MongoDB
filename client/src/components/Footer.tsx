import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{
        height: "auto",
        width: "100%",
        position: "fixed",
        bottom: 0,
        left: 0,
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

