import { Box, Card, CardContent, Paper } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostContext } from "../Context/PostContext";
import { UserContext } from "../Context/UserContext";
import UpdateForm from "./UpdateForm";

export default function SinglePost() {
  const params = useParams();
  const { posts } = useContext(PostContext);
  const { user, getUsernameById } = useContext(UserContext);

  const selectedPost = posts.find((post) => post._id === params.id);

  const [authorName, setAuthorName] = useState("");

  useEffect(() => {
    const fetchAuthorName = async () => {
      if (selectedPost) {
        const username = await getUsernameById(selectedPost.author);
        setAuthorName(username);
      }
    };

    fetchAuthorName();
  }, [selectedPost, getUsernameById]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={2}
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "auto",
          width: "97%",
          maxWidth: "1200px",
          margin: "0 auto",
          backgroundColor: "white",
        }}
      >
        <Card sx={{ width: "100%", mb: 2 }}>
          <CardContent>
            <h2>{selectedPost?.title}</h2>
            <p>{selectedPost?.content}</p>
            <p>
              {" "}
              <b> {authorName}</b>
            </p>
          </CardContent>
        </Card>
        {user && (selectedPost?.author === user._id || user.isAdmin) && (
          <UpdateForm id={selectedPost?._id} />
        )}
      </Paper>
    </Box>
  );
}
