import express from "express";
import * as dotenv from "dotenv";
import { routes } from "./routes/index.js";
import bodyParser from "body-parser";
import { connectDB } from "./db/connect.js";

dotenv.config();


const app = express();

const port = process.env.PORT || 4000


app.use(bodyParser.json())
app.use(express.json());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  connectDB();
  routes(app)
});
