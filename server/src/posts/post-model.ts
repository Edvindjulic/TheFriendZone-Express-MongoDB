import mongoose from "mongoose";

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
    type: String,
  },
});

export type Post = mongoose.InferSchemaType<typeof postSchema>;

export const PostModel = mongoose.model("Post", postSchema);
export default PostModel;
