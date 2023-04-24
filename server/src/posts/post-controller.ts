import { Request, Response } from "express";
import PostModel from "./post-model";

export async function skapaPost(req: Request, res: Response) {
  try {
    const incomingPost = req.body;
    console.log(incomingPost);
    console.log("this is the req.session id:", req.session?._id);
    const user = new PostModel({ ...incomingPost, author: req.session?._id });

    const result = await user.save();

    const responseObj = {
      message: "Post inserted",
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
