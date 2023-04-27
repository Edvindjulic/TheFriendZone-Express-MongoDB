import express from "express";
import { auth } from "../middlewares";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  updatePost,
} from "./post-controller";

const postRouter = express
  .Router()
  .get("/api/posts", getAllPosts)
  .get("/api/posts/:id", getPostById)
  .post("/api/posts", auth, createPost)
  .put("/api/posts/:id", auth, updatePost)
  .delete("/api/posts/:id", auth, deletePost);

export default postRouter;
