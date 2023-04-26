import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useContext } from "react";
import { PostContext } from "../Context/PostContext";

export default function Posts() {
  const { posts } = useContext(PostContext);

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
        </Paper>
      ))}
    </Box>
  );
}
