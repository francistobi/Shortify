import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const authenticate = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, "57f87fyivb9u97t8hj", (err, data) => {
            if (err) {
                res.redirect("/api/v1/auth/login");
            }
            else {
                req.user = data;
                next();
            }
        });
    }
    else {
        console.log("There was no token");
        res.redirect("/api/v1/auth/login");
    }
};
//# sourceMappingURL=authenticate.js.map