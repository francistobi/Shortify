import express from "express";
import dotenv from "dotenv";
import router from "./routes/index.js";
import path from "path";
import authrouter from "./routes/auth.route.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { connectDB } from "./db/connect.js";
import { limiter } from "./middleware/rate.limiter.js";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../../.env") });
const app = express();
const port = process.env.PORT;
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use(limiter);
app.use("/api/v1", router);
app.use("/api/v1/auth", authrouter);
app.get("/", (req, res) => {
    res.json({
        message: "welcome to shortify"
    });
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    connectDB();
});
//# sourceMappingURL=server.js.map