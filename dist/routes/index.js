import express from "express";
import { createShortUrl, handleRedirect, getAnalytics, } from "../controllers/shorturl.controller.js";
import { generateQRCode } from "../controllers/qrcode.controller.js";
import validateResource from "../middleware/validate.js";
import destinationSchema from "../schemas/createshorturl.schema.js";
const router = express.Router();
router.post("/url", validateResource(destinationSchema), createShortUrl);
router.get("/:shortId", handleRedirect);
router.get("/analytics", getAnalytics);
router.get("/qr/:shortId", generateQRCode);
export default router;
//# sourceMappingURL=index.js.map