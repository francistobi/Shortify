import { Request, Response } from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const renderHomePage = (req: Request, res: Response) => {
  const filePath = path.join(
    __dirname,
    "../../",
    "src",
    "public",
    "index.html"
  );
  res.sendFile(filePath);
};

export const renderLoginPage = (req: Request, res: Response) => {
   const filePath = path.join(
     __dirname,
     "../../",
     "src",
     "public",
     "login.html"
   );
  res.sendFile(filePath);
};

export const getRegPage = (req: Request, res: Response) => {
  const filePath = path.join(
    __dirname,
    "../../",
    "src",
    "public",
    "register.html"
  );
  res.sendFile(filePath);
};