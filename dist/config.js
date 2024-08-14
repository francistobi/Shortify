// src/config.ts
import dotenv from "dotenv";
dotenv.config();
const env = {
    JWT_SECRET: process.env.JWT_SECRET,
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
};
export default env;
//# sourceMappingURL=config.js.map