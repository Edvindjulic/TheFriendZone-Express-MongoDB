import express from "express";
import { db } from "../app";

const userRouter = express
  .Router()
  .get("/users", async (req, res) => {})
  .post("/users", async (req, res) => {
    try {
      const { username, password } = req.body;
      const userCollection = db.collection("users");

      const result = await userCollection.insertOne({ username, password });
      const insertedDocument = { _id: result.insertedId, username, password }; // Create the inserted document object

      res
        .status(201)
        .json({ message: "user inserted", data: insertedDocument });
    } catch (error) {
      console.error("Error inserting user:", error);
      res.status(500).json({
        message: "Error inserting user",
        error: (error as any).message,
      });
    }
  })
  .put("/users", async (req, res) => {})
  .delete("/users", async (req, res) => {});

export default userRouter;
