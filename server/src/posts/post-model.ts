import mongoose from "mongoose";
import User from "./users/user-model";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: User,
  },
});

export type Post = mongoose.InferSchemaType<typeof postSchema>;

export const PostModel = mongoose.model("Post", postSchema);
export default PostModel;
