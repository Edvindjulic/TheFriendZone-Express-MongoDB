import express from "express";

import { getAllUsers, loginUser, registerUser } from "./user-controller";

const userRouter = express
  .Router()
  .get("/users", getAllUsers)
  .post("/users/register", registerUser)
  .post("/login", loginUser);
//   .put("/users", async (req, res) => {})
//   .delete("/users", async (req, res) => {});

export default userRouter;
