import { Box, Button, Paper } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { PostContext } from "../Context/PostContext";
import { UserContext } from "../Context/UserContext";

export default function Posts() {
  const { posts, deletePost } = useContext(PostContext);
  const { user } = useContext(UserContext);
  const [updatedPosts, setUpdatedPosts] = useState(posts);

  useEffect(() => {
    setUpdatedPosts(posts);
  }, [posts]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      {[...updatedPosts].reverse().map((post, index) => (
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
          <NavLink
            to={"/post/" + post._id}
            style={{
              color: "black",
              cursor: "pointer",
              marginBottom: "1rem",
            }}
          >
            <h4 style={{ marginBottom: "1rem" }}>{post.title}</h4>
          </NavLink>

          <p>{post.content}</p>

          {user && (user._id === post.author || user.isAdmin) && (
            <Button onClick={() => deletePost(post._id)}>Remove Post</Button>
          )}

        </Paper>
      ))}
      <p>Number of posts: {updatedPosts.length}</p>
    </Box>
  );
}
