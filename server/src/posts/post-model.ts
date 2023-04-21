import mongoose, { SchemaTypes } from "mongoose";

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
    type: SchemaTypes.ObjectId,
  },
});

interface Author {
  _id: string;
}

export type Post = mongoose.InferSchemaType<typeof postSchema>;

export const PostModel = mongoose.model("Post", postSchema);
export default PostModel;
