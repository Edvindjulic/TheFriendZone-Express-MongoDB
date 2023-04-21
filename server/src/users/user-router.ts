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
  .get("/api/users", adminAuth, getAllUsers)
  // .get("/users/auth", adminAuth, getSelf)
  .post("/api/users/register", registerUser)
  .post("/api/users/login", loginUser)
  .post("/api/users/logout", logoutUser);

// Delete user
// Update user
// Get a specific user

export default userRouter;
