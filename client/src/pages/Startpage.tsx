import { Box } from "@mui/system";
import LoggedIn from "../components/LoggedIn";
import SignIn from "../components/SignIn";
import { Typography } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import Posts from "../components/Posts";

export default function Startpage() {
  const { user } = useContext(UserContext);

  return (
    <Box
      sx={{
        height: "auto",
        width: "100%",
        display: "flex",
        flexDirection: "row",
      }}
    >
      {user ? (
        <Box sx={{ width: "100%", margin: "0rem 0rem" }}>
          <LoggedIn />
        </Box>
      ) : (
        <>
          <Box sx={{ width: "30%", margin: "2rem 1rem 4rem 2rem" }}>
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
              <span className="highlight">The Friend Zone</span> finns det gott
              om dem att hitta!
            </Typography>
            <SignIn />
          </Box>
          <Box sx={{ width: "70%", margin: "0rem 3rem" }}>
            <Posts />
          </Box>
        </>
      )}
    </Box>
  );
}
