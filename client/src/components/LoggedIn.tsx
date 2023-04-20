import {
  AppBar,
  Box,
  Button,
  TextField,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { PostContext } from "../Context/PostContext";
import Posts from "./PostComponent";
import { theme } from "./theme";

function LoggedIn() {
  const [postText, setPostText] = useState("");
  const { addPost } = useContext(PostContext);

  const handlePostSubmit = () => {
    addPost({ title: "Nytt inlägg", content: postText });
    setPostText("");
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <AppBar position="static" sx={{ marginBottom: 4 }}>
          <Toolbar sx={{ justifyContent: "flex-end" }}>
            <Typography variant="h6" sx={{ order: 2 }}>
              Ditt coola user name
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "1.2rem",

            borderRadius: ".3rem",
            marginBottom: ".5rem",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <TextField
              fullWidth
              label="Skriv ditt inlägg..."
              variant="outlined"
              size="medium"
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
            />
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePostSubmit}
            sx={{
              marginLeft: "10px",
              "&:hover": {
                backgroundColor: "#E3653D",
              },
            }}
          >
            Posta
          </Button>
        </Box>
        <Posts />
      </div>
    </ThemeProvider>
  );
}

export default LoggedIn;
