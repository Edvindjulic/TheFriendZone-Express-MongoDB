import argon2 from "argon2";
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

userSchema.pre("save", async function (next) {
  this.password = await argon2.hash(this.password);
  next();
});

export type User = mongoose.InferSchemaType<typeof userSchema>;

export const UserModel = mongoose.model("User", userSchema);

// username
// password
// isAdmin: { type: Boolean, default: false }
