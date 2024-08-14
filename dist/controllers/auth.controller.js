import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";
import User from "../models/user.model.js";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../env") });
const JWT_SECRET = process.env.JWT_SECRET;
console.log(JWT_SECRET);
const age = 60 * 60;
const createJwt = (userId, email) => {
    return jwt.sign({ id: userId, email }, JWT_SECRET, {
        expiresIn: age,
    });
};
const signup = async (req, res) => {
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
        res.status(201).json({ user });
        res.redirect("/api/v1/auth/login");
    }
    catch (err) {
        console.log(err);
        res.status(400).redirect("/api/v1/auth/signup");
    }
};
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            if (await bcrypt.compare(password, user.password)) {
                const token = createJwt(user.id, email);
                res.cookie("jwt", token, { httpOnly: true });
                res.json(token);
            }
            else {
                res.redirect("/api/v1/auth/login");
            }
        }
        else {
            res.redirect("/api/v1/auth/login");
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).redirect("/api/v1/auth/login");
    }
};
const logout = async (req, res) => {
    res.clearCookie("jwt");
    res.render("login");
};
export { signup, login, logout };
//# sourceMappingURL=auth.controller.js.map