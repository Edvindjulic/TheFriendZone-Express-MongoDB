import argon2 from "argon2";
import { Request, Response } from "express";
import { UserModel } from "./user-model";
export async function registerUser(req: Request, res: Response) {
  try {
    const { username, password, isAdmin = false } = req.body;

    const users = await UserModel.find({ username: username });
    if (users.length > 0) {
      res.set("content-type", "application/json");
      return res.status(409).send(JSON.stringify("Username already in use"));
    }

    const hashedPassword = await argon2.hash(password);
    const user = { username, password: hashedPassword, isAdmin };

    const result = await UserModel.create(user);

    const responseObj = {
      message: "User inserted",
      ...user,
      password: undefined,
      _id: result._id,
    };

    res.set("content-type", "application/json");
    res.status(201).send(JSON.stringify(responseObj));
  } catch (error) {
    console.error("Error inserting user:", error);
    res.set("content-type", "application/json");
    res.status(500).send(
      JSON.stringify({
        message: "Error inserting user",
        error: (error as any).message,
      })
    );
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
