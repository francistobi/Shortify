import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
      };
    }
  }
}

declare namespace NodeJS {
  interface ProcessEnv {
    JWT_SECRET: string;
    PORT?: string;
    MONGO_URI: string;
  }
}