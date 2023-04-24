import express from "express";
import { auth } from "../middlewares";
import { createPost } from "./post-controller";

const postRouter = express.Router().post("/api/posts", auth, createPost);
// .get("/api/posts", getAllPosts);
// .get("/posts/:id", getPostById) // not working

//TODO:

//get all posts
//get specific post
//get user posts
//delete own post
//delete other post(admin)
//put own post

export default postRouter;
