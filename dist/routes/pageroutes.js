import { Router } from "express";
import { renderHomePage, renderLoginPage, getRegPage, } from "../controllers/pageControler.js";
const pagerouter = Router();
pagerouter.get("/", renderHomePage);
pagerouter.get("/login", renderLoginPage);
pagerouter.get("/signup", getRegPage);
export default pagerouter;
//# sourceMappingURL=pageroutes.js.map