import express from "express";
import { login,signup,logout } from "../controllers/auth.controller.js";
const authrouter = express.Router();


authrouter.post("/login", login);
authrouter.post("/signup", signup);
authrouter.post("/logout", logout);


export default authrouter

