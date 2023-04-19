import express from "express";

import { getAllUsers, registerUser } from "./user-controller";

const userRouter = express
  .Router()
  .get("/users", getAllUsers)
  .post("/users/register", registerUser)
  .put("/users", async (req, res) => {})
  .delete("/users", async (req, res) => {});

export default userRouter;
