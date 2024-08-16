import { Router } from "express";
import { renderHomePage, renderLoginPage, getRegPage, LinkhistoryPage, } from "../controllers/pageControler.js";
const pagerouter = Router();
pagerouter.get("/", renderHomePage);
pagerouter.get("/loginP", renderLoginPage);
pagerouter.get("/signupP", getRegPage);
pagerouter.get("/linkhistoryP", LinkhistoryPage);
export default pagerouter;
//# sourceMappingURL=pageroutes.js.map