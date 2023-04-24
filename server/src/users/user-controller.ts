import argon2 from "argon2";
import { Request, Response } from "express";
import { UserModel } from "./user-model";
export async function registerUser(req: Request, res: Response) {
  try {
    const { username, password, isAdmin = false } = req.body;
    const user = new UserModel({ username, password, isAdmin });

    // Check for missing or incorrect values
    if (!username || typeof username !== "string") {
      const message =
        "Invalid request: Username is missing or has an incorrect format";
      res.set("content-type", "application/json");
      return res.status(400).send(JSON.stringify({ message }));
    }

    if (!password || typeof password !== "string") {
      const message =
        "Invalid request: Password is missing or has an incorrect format";
      res.set("content-type", "application/json");

      return res.status(400).send(JSON.stringify({ message }));
    }

    const users = await UserModel.find({ username: username });
    if (users.length > 0) {
      res.set("content-type", "application/json");
      return res.status(409).send(JSON.stringify("Username already in use"));
    }

    // const hashedPassword = await argon2.hash(password);
    // user.password = hashedPassword;

    const result = await user.save();

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

    user.isAdmin = newIsAdmin;
    await user.save();

    const { password, ...userWithoutPassword } = user.toObject();

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
