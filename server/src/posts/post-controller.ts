import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { db } from "../app";
import postModel from "./post-model";

export async function getAllPosts(req: Request, res: Response) {
  try {
    const postCollection = db.collection("posts");

    const posts = await postCollection.find().toArray();

    res.status(200).json({ message: "All posts", data: posts });
  } catch (error) {
    console.error("Error finding posts", error);
    res.status(500).json({
      message: "Error finding posts",
      error: (error as any).message,
    });
  }
}

export async function createPost(req: Request, res: Response) {
  try {
    const { title, content } = req.body;
    const author = req.session!.user._id;

    const postCollection = db.collection("posts");

    const post = new postModel({ content /* author: req.session!.user */ });
    const result = await postCollection.insertOne(post);
    res.status(201).json({ message: "Post created", data: post });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Error creating post", error: (error as any).message });
  }
}
//currently not working!
export async function getPostById(req: Request, res: Response) {
  const id = req.params.id;

  try {
    const postCollection = db.collection("posts");
    const post = await postCollection.findOne({ _id: new ObjectId(id) });

    if (post) {
      res.status(200).json({ message: "Post found!", data: post });
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  } catch (error) {
    console.error("Error finding post", error);
    {
      res.status(500).json({ message: "Error finding post", error: (error as any).message });
    }
  }
}
