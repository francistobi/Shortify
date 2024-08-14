import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const renderHomePage = (req, res) => {
    const filePath = path.join(__dirname, "../../", "src", "public", "index.html");
    res.sendFile(filePath);
};
export const renderLoginPage = (req, res) => {
    const filePath = path.join(__dirname, "../../", "src", "public", "login.html");
    res.sendFile(filePath);
};
export const getRegPage = (req, res) => {
    const filePath = path.join(__dirname, "../../", "src", "public", "register.html");
    res.sendFile(filePath);
};
//# sourceMappingURL=pageControler.js.map