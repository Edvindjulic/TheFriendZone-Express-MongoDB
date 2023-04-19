import argon2 from "argon2";
import express from "express";
import { db } from "../app";

const userRouter = express
  .Router()
  // Admin priveleges?! :O
  .get("/users", async (req, res) => {
    try {
      const userCollection = db.collection("users");

      const users = await userCollection.find().toArray();

      res.status(200).json({ message: "All users", data: users });
    } catch (error) {
      console.error("Error finding users:", error);
      res.status(500).json({
        message: "Error finding users",
        error: (error as any).message,
      });
    }
  })
  .post("/users", async (req, res) => {
    try {
      const { username, password } = req.body;
      const hashedPassword = await argon2.hash(password);

      const userCollection = db.collection("users");

      const user = { username, password: hashedPassword };
      const result = await userCollection.insertOne(user);

      res.status(201).json({ message: "User inserted", data: user });
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
