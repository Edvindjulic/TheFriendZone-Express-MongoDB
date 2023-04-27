import { Typography, useMediaQuery, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { useContext } from "react";
import LoggedIn from "../components/LoggedIn";
import Posts from "../components/Posts";
import SignIn from "../components/SignIn";
import { UserContext } from "../Context/UserContext";

export default function Startpage() {
  const { user } = useContext(UserContext);
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Box
      sx={{
        height: "auto",
        width: "100%",
        display: "flex",
        flexDirection: isSmallScreen ? "column" : "row",
        alignItems: isSmallScreen ? "center" : "flex-start",
        justifyContent: isSmallScreen ? "center" : "flex-start",
      }}
    >
      {user ? (
        <Box sx={{ width: "100%", margin: "0rem 0rem" }}>
          <LoggedIn />
        </Box>
      ) : (
        <>
          <Box
            sx={{
              width: isSmallScreen ? "100%" : isMediumScreen ? "30%" : "30%",
              margin: isSmallScreen ? "2rem 1rem" : "2rem 1rem 4rem 2rem",
            }}
          >
            {isLargeScreen && (
              <Typography
                variant="h5"
                sx={{
                  margin: "1rem 0",
                  "& .highlight": {
                    color: "primary.main",
                    fontWeight: "bold",
                  },
                }}
              >
                Livet är bättre med vänner – och här på{" "}
                <span className="highlight">The Friend Zone</span> finns det
                gott om dem att hitta!
              </Typography>
            )}
            <SignIn />
          </Box>
          <Box
            sx={{
              width: isSmallScreen ? "100%" : isMediumScreen ? "70%" : "70%",
              margin: "0rem 3rem",
            }}
          >
            <Posts />
          </Box>
        </>
      )}
    </Box>
  );
}
