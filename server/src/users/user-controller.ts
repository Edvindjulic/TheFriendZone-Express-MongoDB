import argon2 from "argon2";
import { Request, Response } from "express";
import { db } from "../app";

export async function registerUser(req: Request, res: Response) {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await argon2.hash(password);
    const userCollection = db.collection("users");
    const user = { username, email, password: hashedPassword };

    const allUsers = await userCollection.find().toArray();

    const mailCheck = allUsers.find((user) => user.email === email);
    const usernameCheck = allUsers.find((user) => user.username === username);
    if (mailCheck) {
      return res.status(400).json({
        message: "Email already in use",
        error: "Email already in use",
      });
    }
    if (usernameCheck) {
      return res.status(400).json({
        message: "Username already in use",
        error: "Username already in use",
      });
    }

    const result = await userCollection.insertOne(user);
    res.status(201).json({
      message: "User inserted",
      data: { ...user, _id: result.insertedId },
    });
  } catch (error) {
    console.error("Error inserting user:", error);
    res.status(500).json({
      message: "Error inserting user",
      error: (error as any).message,
    });
  }
}

export async function getAllUsers(req: Request, res: Response) {
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
}
