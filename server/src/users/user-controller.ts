import argon2 from "argon2";
import { Request, Response } from "express";
import { db } from "../app";
export async function registerUser(req: Request, res: Response) {
  try {
    const { username, password, isAdmin = false } = req.body;
    const hashedPassword = await argon2.hash(password);
    const userCollection = db.collection("users");
    const user = { username, password: hashedPassword, isAdmin };

    const result = await userCollection.insertOne(user);

    // const allUsers = await userCollection.find().toArray();
    // const usernameCheck = allUsers.find((user) => user.username === username);

    // if (usernameCheck) {
    //   return res.status(400).json({
    //     message: "Username already in use",
    //     error: "Username already in use",
    //   });
    // }

    const responseObj = {
      message: "User inserted",
      ...user,
      password: undefined,
      _id: result.insertedId.toString(),
    };

    console.log("Response object:", responseObj);

    res.status(201).json(responseObj);
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

export async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;
  const userCollection = db.collection("users");
  const users = await userCollection.find().toArray();

  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(400).json("No user with that email registered");
  }

  const isAuth = await argon2.verify(user.password, password);
  if (!isAuth) {
    return res.status(400).json("Incorrect password");
  }

  req.session!.email = user.email;
  if (user.admin === true) {
    req.session!.admin = true;
  } else {
    req.session!.admin = false;
  }

  res.status(200).json("Login sucessful!");
}

export function logoutUser(req: Request, res: Response) {
  req.session = null;
  res.status(200).json({ message: "Logged out successfully" });
}
