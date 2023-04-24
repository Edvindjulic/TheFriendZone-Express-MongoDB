import express from "express";

import { adminAuth } from "../middlewares";
import {
  deleteUser,
  getAllUsers,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
} from "./user-controller";

const userRouter = express
  .Router()
  .get("/api/users", adminAuth, getAllUsers)
  .post("/api/users/register", registerUser)
  .post("/api/users/login", loginUser)
  .post("/api/users/logout", logoutUser)
  .put("/api/users/:id", adminAuth, updateUser)
  .delete("/api/users/:id", adminAuth, deleteUser);
// .get("/users/auth", adminAuth, getSelf)

export default userRouter;
