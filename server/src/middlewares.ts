import { NextFunction, Request, Response } from "express";

export function auth(req: Request, res: Response, next: NextFunction) {
  if (!req.session?.email) {
    return res.status(401).json("You must login!");
  }
  next();
}

export function adminAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.session?.admin) {
    return res.status(401).json("You are not an administrator");
  }
  next();
}
