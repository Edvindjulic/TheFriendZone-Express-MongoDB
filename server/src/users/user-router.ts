import express from "express";

import { adminAuth } from "../middlewares";
import {
  getAllUsers,
  loginUser,
  logoutUser,
  registerUser,
} from "./user-controller";

const userRouter = express
  .Router()
  .get("/users", adminAuth, getAllUsers)
  // .get("/users/auth", adminAuth, getSelf)
  .post("/users/register", registerUser)
  .post("/login", loginUser)
  .post("/logout", logoutUser);

// Delete user
// Update user
// Get a specific user

export default userRouter;
