import {
  Box,
  Button,
  Paper,
  Typography,
} from "@mui/material";
import {
  useContext,
  useEffect,
  useState,
} from "react";
import { NavLink } from "react-router-dom";
import { PostContext } from "../Context/PostContext";
import { UserContext } from "../Context/UserContext";
import styled from "@emotion/styled";

export default function Posts() {
  const { posts, deletePost } =
    useContext(PostContext);
  const { user, getUsernameById } =
    useContext(UserContext);
  const [updatedPosts, setUpdatedPosts] =
    useState(posts);

  useEffect(() => {
    const fetchUsernames = async () => {
      const updatedPosts = await Promise.all(
        posts.map(async (post) => {
          const username = await getUsernameById(
            post.author
          );
          return {
            ...post,
            authorName: username,
          };
        })
      );
      setUpdatedPosts(updatedPosts);
    };

    fetchUsernames();
  }, [posts, getUsernameById]);

  const StyledNavLink = styled(NavLink)({
    textDecoration: "none",
    color: "black",
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      {[...updatedPosts]
        .reverse()
        .map((post, index) => (
          <Paper
            key={index}
            elevation={2}
            sx={{
              position: "relative",
              p: 7,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              height: "auto",
              width: "97%",
              maxWidth: "1200px",
              margin: "0 auto",
              backgroundColor: "white",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                position: "absolute",
                top: 8,
                left: 8,
              }}
            >
              <b>{post.authorName}</b>
            </Typography>
            <StyledNavLink
              to={"/post/" + post._id}
              style={{
                color: "black",
                cursor: "pointer",
                marginBottom: "1rem",
                alignSelf: "center",
              }}
            >
              <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
                {post.title}
              </Typography>
            </StyledNavLink>

            <Typography variant="body1" sx={{margin: "0.5rem"}}>{post.content}</Typography>
            {user &&
              (user._id === post.author || user.isAdmin) && (
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => deletePost(post._id)}
                  sx={{
                    position: "absolute",
                    bottom: 8,
                    right: 8,
                    
                  }}
                >
                  Remove Post
                </Button>
              )}
          </Paper>
        ))}
    </Box>
  );
}