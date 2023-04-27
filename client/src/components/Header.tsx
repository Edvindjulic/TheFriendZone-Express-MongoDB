import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import AccountMenu from "./AccountMenu";

export default function Header() {
  const StyledNavLink = styled(NavLink)({
    textDecoration: "none",
  });

  return (
    <Box
      sx={{
        height: "auto",
      }}
    >
      <StyledNavLink to="/">
        <Typography
          variant="h5"
          sx={{
            padding: "0.5rem",
            color: "primary.main",
            mb: "0.8rem",
          }}
        >
          The Friend Zone
        </Typography>
      </StyledNavLink>
    </Box>
  );
}
