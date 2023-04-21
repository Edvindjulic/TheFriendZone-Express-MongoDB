import { Box } from "@mui/system";
import LoggedIn from "../components/LoggedIn";
import SignIn from "../components/SignIn";
export default function Startpage() {
  return (
    <Box
      sx={{
        height: "auto",
        width: "100%",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <SignIn />
      <LoggedIn />
    </Box>
  );
}
