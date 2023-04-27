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
            <StyledNavLink
              to={"/post/" + post._id}
              style={{
                color: "black",
                cursor: "pointer",
                marginBottom: "1rem",
              }}
            >
              <Typography
                variant="h5"
                sx={{ marginBottom: "1rem" }}
              >
                {post.title}
              </Typography>
            </StyledNavLink>

            <Typography variant="body1">
              {post.content}
            </Typography>
            <Typography variant="body2">
              <b> {post.authorName}</b>
            </Typography>
            {user &&
              (user._id === post.author ||
                user.isAdmin) && (
                <Button
                  onClick={() =>
                    deletePost(post._id)
                  }
                >
                  Remove Post
                </Button>
              )}
          </Paper>
        ))}
      <p>
        Number of posts: {updatedPosts.length}
      </p>
    </Box>
  );
}
