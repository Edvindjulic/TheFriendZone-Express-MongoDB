import { Request, Response } from "express";
import mongoose from "mongoose";
import { PostModel } from "./post-model";

export async function getAllPosts(req: Request, res: Response) {
  try {
    const posts = await PostModel.find();

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error finding posts", error);
    res.status(500).json({
      message: "Error finding posts",
      error: (error as any).message,
    });
  }
}

export async function createPost(req: Request, res: Response) {
  const myPost = new PostModel(req.body);
  console.log(req.body);
  console.log(req.session);

  const authorId = req.session?.user._id;
  if (authorId && mongoose.Types.ObjectId.isValid(authorId)) {
    myPost.author = authorId;
  } else {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  const newPost = await myPost.save();

  res.status(201).json({
    message: "post added to database",
    _id: newPost._id,
    title: newPost.title,
    content: newPost.content,
    author: newPost.author?.toString(),
  });
}

export async function getPostById(req: Request, res: Response) {
  const id = req.params.id;

  try {
    const post = await PostModel.findById(id);

    if (post) {
      res.status(200).json({ message: "Post found!", data: post });
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  } catch (error) {
    console.error("Error finding post", error);
    {
      res.status(500).json({
        message: "Error finding post",
        error: (error as any).message,
      });
    }
  }
}
function expect(status: (code: number) => Response<any, Record<string, any>>) {
  throw new Error("Function not implemented.");
}
