import {
  AppBar,
  Box,
  Button,
  Grid,
  TextField,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { PostContext } from "../Context/PostContext";
import Posts from "./PostComponent";
import { theme } from "./theme";
import { UserContext } from "../Context/UserContext";



function LoggedIn() {
  const [postText, setPostText] = useState("");
  const { addPost } = useContext(PostContext);

  const handlePostSubmit = () => {
    addPost({ title: "Nytt inlägg", content: postText });
    setPostText("");
  };

  const { user } = useContext(UserContext);

  return (
    <ThemeProvider theme={theme}>
      <div>
        <AppBar position="static" sx={{ marginBottom: 4 }}>
          <Toolbar sx={{ justifyContent: "flex-end" }}>
            <Typography variant="h6" sx={{ order: 2 }}>
              {user?.username}
            </Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{ padding: "1.2rem" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={9}>
              <TextField
                fullWidth
                label="Skriv ditt inlägg..."
                variant="outlined"
                size="medium"
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handlePostSubmit}
                fullWidth
                sx={{
                  marginTop: { xs: 2, sm: 0 },
                  "&:hover": {
                    backgroundColor: "",
                  },
                }}
              >
                Posta
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Posts />
      </div>
    </ThemeProvider>
  );
}

export default LoggedIn;
