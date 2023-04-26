import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { PostContext } from "../Context/PostContext";

export default function Posts() {
  const { posts, deletePost } = useContext(PostContext);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {posts.map((post, index) => (
        <Paper
          key={index}
          elevation={2}
          sx={{
            p: 7,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "10vh",
          }}
        >
          <NavLink to={"/post/" + post._id}>Gå till denna posten!</NavLink>
          <h4 style={{ marginBottom: "1rem" }}>{post.title}</h4>
          <p>{post.content}</p>
          <Button onClick={() => deletePost(post.id, index)}>
            Remove Post
          </Button>
        </Paper>
      ))}
    </Box>
  );
}
