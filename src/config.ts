// src/config.ts
import dotenv from "dotenv";

dotenv.config();


interface Env {
  JWT_SECRET: string;
  PORT?: string;
  MONGO_URI :string;
}


const env: Env = {
  JWT_SECRET: process.env.JWT_SECRET as string,
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,

};

export default env;
