import { NextFunction, Request, Response } from "express";

export function auth(req: Request, res: Response, next: NextFunction) {
  if (!req.session?.username) {
    return res.status(401).json("You must login!");
  }
  next();
}

export function adminAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.session?.isAdmin) {
    return res.status(401).json("You are not an administrator");
  }
  next();
}
