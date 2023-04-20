import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

export type User = mongoose.InferSchemaType<typeof userSchema>;

export const UserModel = mongoose.model("User", userSchema);

// username
// password
// isAdmin: { type: Boolean, default: false }
