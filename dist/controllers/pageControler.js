import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const renderHomePage = (req, res) => {
    const filePath = path.join(__dirname, "../../", "src", "view", "login.html");
    res.sendFile(filePath);
};
export const renderLoginPage = (req, res) => {
    const filePath = path.join(__dirname, "../../src/view/login.html");
    res.sendFile(filePath);
};
export const getRegPage = (req, res) => {
    const filePath = path.join(__dirname, "../../src/view/register.html");
    res.sendFile(filePath);
};
export const LinkhistoryPage = (req, res) => {
    const filePath = path.join(__dirname, "../../src/view/dashboard.html");
    res.sendFile(filePath);
};
//# sourceMappingURL=pageControler.js.map