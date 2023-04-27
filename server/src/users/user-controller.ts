import argon2 from "argon2";
import { Request, Response } from "express";
import mongoose from "mongoose";
import * as yup from "yup";
import { UserModel } from "./user-model";

const userSchema = yup.object().shape({
  username: yup.string().strict().required(),
  password: yup.string().strict().required(),
});

export async function registerUser(req: Request, res: Response) {
  try {
    const { username, password, isAdmin = false } = req.body;
    const user = { username, password, isAdmin };

    try {
      await userSchema.validate(user);
    } catch (error) {
      res.set("content-type", "application/json");
      return res.status(400).json(JSON.stringify(error.message));
    }

    const users = await UserModel.find({ username: username });
    if (users.length > 0) {
      res.set("content-type", "application/json");
      return res.status(409).send(JSON.stringify("Användarnamnet är upptaget"));
    }

    const result = await UserModel.create(user);

    const responseObj = {
      message: "User inserted",
      ...result.toJSON(),
      password: undefined,
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
    const users = await UserModel.find();

    const usersWithoutPassword = users.map((user) => {
      const { password, ...rest } = user.toObject();
      return rest;
    });

    res.status(200).json(usersWithoutPassword);
  } catch (error) {
    console.error("Error finding users:", error);
    res.status(500).json({
      message: "Error finding users",
      error: (error as any).message,
    });
  }
}

export async function loginUser(req: Request, res: Response) {
  const { password } = req.body;

  try {
    const user = await UserModel.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json("No user with that username registered");
    }

    const isAuth = await argon2.verify(user.password, password);
    if (!isAuth) {
      return res.status(401).json("Incorrect password");
    }

    req.session!.username = user.username;
    req.session!.isAdmin = user.isAdmin === true;
    req.session!._id = user._id;

    const { password: _, ...userData } = user.toObject();
    res.status(200).json(req.session);
  } catch (error) {
    console.error("Error finding user:", error);
    res.status(500).json({
      message: "Error finding user",
      error: (error as any).message,
    });
  }
}

export function logoutUser(req: Request, res: Response) {
  req.session = null;
  res.status(204).json({ message: "Logged out successfully" });
}

export async function updateUser(req: Request, res: Response) {
  try {
    const userId = req.params.id;
    const newIsAdmin = req.body.isAdmin;

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await UserModel.updateOne({ _id: userId }, { isAdmin: newIsAdmin });

    const updatedUser = await UserModel.findById(userId);
    const { password, ...userWithoutPassword } = updatedUser.toObject();

    res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).json({
      message: "Error updating user role",
      error: (error as any).message,
    });
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const userId = req.params.id;
    const deletedUser = await UserModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(204).end();
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({
      message: "Error deleting user",
      error: (error as any).message,
    });
  }
}

export async function getSelf(req: Request, res: Response) {
  try {
    const user = req.session;

    if (JSON.stringify(user) === "{}") {
      res.status(401).json({
        message: "You are not logged in",
      });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      error: (error as any).message,
    });
  }
}

export async function getUsernameById(req: Request, res: Response) {
  try {
    const userId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await UserModel.findOne({ _id: userId }, "username");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
