import { Box, Button, Paper } from "@mui/material";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { PostContext } from "../Context/PostContext";
import { UserContext } from "../Context/UserContext";

export default function Posts() {
  const { posts, deletePost } = useContext(PostContext);
  const { user } = useContext(UserContext);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      {[...posts].reverse().map((post, index) => (
        <Paper
          key={index}
          elevation={2}
          sx={{
            p: 7,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "auto",
            width: "97%",
            maxWidth: "1200px",
            margin: "0 auto",
            backgroundColor: "white",
          }}
        >
          <NavLink to={"/post/" + post._id}>Gå till denna posten!</NavLink>
          <h4 style={{ marginBottom: "1rem" }}>{post.title}</h4>
          <p>{post.content}</p>
          {user && (user._id === post.author || user.isAdmin) && (
            <Button onClick={() => deletePost(post._id)}>Remove Post</Button>
          )}
        </Paper>
      ))}
      <p>Number of posts: {posts.length}</p>
    </Box>
  );
}
