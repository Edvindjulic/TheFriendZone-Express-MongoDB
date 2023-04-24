import { Request, Response } from "express";
import PostModel from "./post-model";

export async function createPost(req: Request, res: Response) {
  try {
    const incomingPost = req.body;

    const newPost = new PostModel({
      ...incomingPost,
      author: req.session?._id,
    });

    const result = await newPost.save();

    const responseObj = {
      message: "Post created",
      ...result.toJSON(),
    };

    res.set("content-type", "application/json");
    res.status(201).send(JSON.stringify(responseObj));
  } catch (error) {
    console.error("Error inserting user:", error);
    res.set("content-type", "application/json");
    res.status(500).send(
      JSON.stringify({
        message: "Error inserting user",
        error: (error as any).message,
      })
    );
  }
}
