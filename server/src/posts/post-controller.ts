import { Request, Response } from "express";
import * as yup from "yup";
import { PostModel } from "./post-model";

interface CastError extends Error {
  name: "CastError";
  kind: "ObjectId";
}

interface UpdateResult {
  n: number;
  nModified?: number;
  ok: number;
}

const testSchema = yup.object().shape({
  title: yup.string().required(),
  content: yup.string().required(),
  author: yup.string().required(),
});

export async function createPost(req: Request, res: Response) {
  try {
    const incomingPost = req.body;

    const author = req.session?._id;
    if (!author) {
      res.status(400).json({ message: "Missing author ID" });
      return;
    }

    const newPost = new PostModel({
      ...incomingPost,
      author: req.session?._id,
    });

    try {
      await testSchema.validate(newPost);
      console.log("Test-validation");
    } catch (error) {
      res.set("content-type", "application/json");
      return res.status(400).send(JSON.stringify(error.message));
    }

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

export async function updatePost(req: Request, res: Response) {
  const id = req.params.id;

  const { title, content } = req.body;

  try {
    const post = await PostModel.findById(id);

    if (!post || undefined) {
      res.status(404).json(`${id} not found`);
      return;
    }
    post.title = title;
    post.content = content;

    const result = await post.save();

    res.status(200).json(result);

    //author verification
  } catch (error) {
    res.status(404).json({
      message: "Error updating the post",
      error: (error as any).message,
    });
  }
}

export async function deletePost(req: Request, res: Response) {
  try {
    const post = await PostModel.findById(req.params.id);

    const loggedInUserId = req.session?._id;

    if (!post || undefined) {
      // const responseObj = req.params.id + "Post not found";
      res.status(404).json("Post not found"); //responseObj
      return;
    }

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
