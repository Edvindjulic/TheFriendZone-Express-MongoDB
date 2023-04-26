import { Box, Button, Paper } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { PostContext } from "../Context/PostContext";
import { User } from "../Context/UserContext";

export default function Posts() {
  const { posts, deletePost } = useContext(PostContext);
  const [currentUser, setCurrentUser] = useState<User>({
    _id: "",
    username: "",
    isAdmin: false,
  });

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("/api/users/me");
      const data = await response.json();
      setCurrentUser(data);
    };

    fetchUser();
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
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
            height: "10vh",
          }}
        >
          <h4 style={{ marginBottom: "1rem" }}>{post.title}</h4>
          <p>{post.content}</p>
          {currentUser._id === post.ownerId || currentUser.isAdmin ? (
            <Button onClick={() => deletePost(post._id, index)}>Remove Post</Button>
          ) : null}
        </Paper>
      ))}
      <p>Number of posts: {posts.length}</p>
    </Box>
  );
}
