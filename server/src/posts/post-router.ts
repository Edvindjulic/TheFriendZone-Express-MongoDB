import express from "express";
import { auth } from "../middlewares";
import { skapaPost } from "./post-controller";

const postRouter = express.Router().post("/api/posts", auth, skapaPost);
// .get("/posts", getAllPosts)
// .get("/posts/:id", getPostById) // not working

//TODO:

//get all posts
//get specific post
//get user posts
//delete own post
//delete other post(admin)
//put own post

export default postRouter;
