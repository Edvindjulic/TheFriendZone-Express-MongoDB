import express from "express";
import { auth } from "../middlewares";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
} from "./post-controller";

const postRouter = express
  .Router()
  .get("/api/posts", getAllPosts)
  .get("/api/posts/:id", getPostById) // not working
  .post("/api/posts", auth, createPost)
  .delete("/api/posts/:id", auth, deletePost);

//TODO:

//get all posts
//get specific post
//get user posts
//delete own post
//delete other post(admin)
//put own post

export default postRouter;
