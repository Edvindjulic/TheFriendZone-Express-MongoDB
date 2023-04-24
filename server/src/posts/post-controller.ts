import { Request, Response } from "express";
import { PostModel } from "./post-model";

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

interface CastError extends Error {
  name: "CastError";
  kind: "ObjectId";
}

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

export async function getPostById(req: Request, res: Response) {
  const id = req.params.id;

  try {
    const post = await PostModel.findById(id);

    if (post) {
      res.status(200).json({
        _id: post._id,
        title: post.title,
        content: post.content,
        author: post.author,
      });
    } else {
      res.status(404).json(`${id} not found!`);
      console.log(post);
    }
  } catch (error: CastError | unknown) {
    if (
      (error as CastError).name === "CastError" &&
      (error as CastError).kind === "ObjectId"
    ) {
      res.status(404).json({ message: `${id} not found!` });
    } else {
      console.error("Error finding post", error);
      res.status(500).json({
        message: "Error finding post",
        error: (error as any).message,
      });
    }
  }
}

export async function deletePost(req: Request, res: Response) {
  try {
    console.log("params id:", req.params.id);
    const post = await PostModel.findById(req.params.id);

    const loggedInUserId = req.session?._id;

    if (!post || undefined) {
      const responseOjb = req.params.id + "Post not found";
      res.status(404).json(responseOjb);
      return;
    }
    console.log(post?._id);

    if (loggedInUserId !== post?.author?.toString()) {
      res.status(403).json("You are not authorized to delete this post");
      return;
    }
    await PostModel.findByIdAndDelete(req.params.id);

    res.status(204).json(post);
  } catch (error) {
    res.status(404).json({
      message: "Error finding the post",
      error: (error as any).message,
    });
  }
}
