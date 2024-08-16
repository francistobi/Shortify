import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";
import { Request, Response, NextFunction } from "express";
import User from "../models/user.model.js";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../env") });

const JWT_SECRET = process.env.JWT_SECRET 
const age = 60 * 60;

interface JwtPayload {
  id: string;
  email: string;
}

const createJwt = (userId: string, email: string): string => {
  return jwt.sign({ id: userId, email } as JwtPayload, JWT_SECRET as string, {
    expiresIn: age,
  });
};

const signup = async (req: Request, res: Response) => {
  const { email, firstname, lastname, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      firstname,
      lastname,
      password: hashedPassword,
    });
    console.log("User created successfully:", user);
    const token = createJwt(user.id, email);
    res.cookie("jwt", token, { httpOnly: true });
    res.status(201).json({user});
  } catch (err) {
    console.log(err);
    res.status(400).json({err})
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        const token = createJwt(user.id, email);
         return res.status(200).json({
           success: true,
           message: "Login successful",
           token,
         });
      } else {
        return res.status(401).json({
          success: false,
          message: "Invalid password",
        });
      }
    } else {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (err) {
    console.error("Error during login:", err);
    return res.status(500).json({
      success: false,
      message: "An error occurred during login. Please try again later.",
    });
  }
};


const logout = async (req: Request, res: Response) => {
  res.clearCookie("jwt");
  res.render("login");
};

export { signup, login, logout };