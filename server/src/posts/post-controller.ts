import { Request, Response } from "express";
import * as yup from "yup";
import { PostModel } from "./post-model";

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
      res.status(400).json("Missing author ID");
      return;
    }

    const newPost = new PostModel({
      ...incomingPost,
      author: req.session?._id,
    });

    try {
      await testSchema.validate(newPost);
    } catch (error: any) {
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
  } catch (error) {
    if (error) {
      res.status(404).json({ message: `${id} not found!` });
    } else {
      console.error("Error finding post");
      res.status(500).json(error);
    }
  }
}

const updatePostSchema = yup.object().shape({
  title: yup.string().required(),
  content: yup.string().required(),
  author: yup.string().required(),
});

export async function updatePost(req: Request, res: Response) {
  const id = req.params.id;
  const { title, content, author } = req.body; // Add author to destructuring

  try {
    const post = await PostModel.findById(id);

    if (!post) {
      res.status(404).json(`${id} not found`);
      return;
    }

    const loggedInUserId = req.session?._id;

    if (!req.session?.isAdmin) {
      if (!post.author || post.author.toString() !== loggedInUserId) {
        res.status(403).json("You are not authorized to edit this post");
        return;
      }
    }

    if (title === undefined || content === undefined || author === undefined) {
      res.status(400).json("Missing title, content or author");
      return;
    }
    const updatedPost = {
      _id: post._id,
      title: title || post.title,
      content: content || post.content,
      author: author || post.author,
    };

    try {
      await updatePostSchema.validate(updatedPost);
    } catch (error: any) {
      res.set("content-type", "application/json");
      return res.status(400).json(error.message);
    }

    post.title = updatedPost.title;
    post.content = updatedPost.content;
    post.author = updatedPost.author;

    const result = await post.save();

    res.status(200).json(result);
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
      const responseObj = req.params.id + "not found";
      res.status(404).json(responseObj);
      return;
    }

    if (!req.session?.isAdmin) {
      if (loggedInUserId !== post?.author?.toString()) {
        res.status(403).json("You are not authorized to delete this post");
        return;
      }
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
