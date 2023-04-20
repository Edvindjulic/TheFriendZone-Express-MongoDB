import express from "express";
import { createPost, getAllPosts, getPostById } from "./post-controller";

const postRouter = express
  .Router()
  .get("/api/posts", getAllPosts)
  .get("/api/posts/:id", getPostById) // not working
  .post("/api/posts", createPost);

//TODO:

//get all posts
//get specific post
//get user posts
//delete own post
//delete other post(admin)
//put own post

export default postRouter;
