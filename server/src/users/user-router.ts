import express from "express";

import { adminAuth } from "../middlewares";
import { getAllUsers, loginUser, registerUser } from "./user-controller";

const userRouter = express
  .Router()
  .get("/users", adminAuth, getAllUsers)
  .post("/users/register", registerUser)
  .post("/login", loginUser);
// Delete user
// Update user
// Get a specific user

export default userRouter;
