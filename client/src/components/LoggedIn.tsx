import {
  AppBar,
  Box,
  Button,
  Grid,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { PostContext } from "../Context/PostContext";
import Posts from "./Posts";
import { UserContext } from "../Context/UserContext";



export default function LoggedIn() {
  const [postText, setPostText] = useState("");
  const { addPost } = useContext(PostContext);

  const handlePostSubmit = () => {
    addPost({ title: "Nytt inlägg", content: postText });
    setPostText("");
  };

  const { user } = useContext(UserContext);

  return (
      <Box sx={{ width: "100%", backgroundColor: "background.paper", padding: "2rem" }}>
        <Box>
          <AppBar position="static" sx={{ marginBottom: 4 }}>
            <Toolbar sx={{ justifyContent: "flex-end" }}>
            <Typography variant="h6" sx={{ order: 2}}>
              {user?.username}
              {user?.isAdmin && (
              <span> 👑 </span>
              )}
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
        </Box>
      </Box>
  );
}
