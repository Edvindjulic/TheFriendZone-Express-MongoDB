import express from "express";
import { createPost, getAllPosts, getPostById } from "./post-controller";

const postRouter = express
  .Router()
  .get("/posts", getAllPosts)
  .get("/posts/:id", getPostById) // not working
  .post("/posts", createPost);

//TODO:

//get all posts
//get specific post
//get user posts
//delete own post
//delete other post(admin)
//put own post

export default postRouter;
