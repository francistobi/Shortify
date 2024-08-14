import express, { Request, Response } from "express";
import dotenv from "dotenv"
import cors from "cors"
import router from "./routes/index.js";
import pagerouter from "./routes/pageroutes.js"
import path from "path";
import authrouter from "./routes/auth.route.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { connectDB } from "./db/connect.js";
import { limiter } from "./middleware/rate.limiter.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../env") });

const app = express();

const port = process.env.PORT 
console.log(port);

app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(limiter);

app.use(express.static(path.join(__dirname, "../src/public")));
app.use(
  cors({
    origin: "http://127.0.0.1:5500", 
    methods: "GET,POST,PUT,DELETE", 
    credentials: true, 
  })
);

app.use("/api/v1", router);
app.use("/api/v1/auth", authrouter);
app.use("/api/v1", pagerouter);

// app.get("/", (req: Request, res: Response) => {
//   const filePath = path.join(__dirname, "..", "src", "public", "register.html");
//   res.sendFile(filePath);
// });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  connectDB();
});
