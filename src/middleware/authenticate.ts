import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "57f87fyivb9u97t8hj" as string, (err, data) => {
      if (err) {
        res.redirect("/api/v1/auth/login");
      } else {
        req.user = data;
        next();
      }
    });
  } else {
    console.log("There was no token");
    res.redirect("/api/v1/auth/login");
  }
};