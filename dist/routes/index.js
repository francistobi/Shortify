import express from "express";
import { createShortUrl, handleRedirect, getAnalytics, getLinkHistory, } from "../controllers/shorturl.controller.js";
import { generateQRCode } from "../controllers/qrcode.controller.js";
import validateResource from "../middleware/validate.js";
import destinationSchema from "../schemas/createshorturl.schema.js";
import { authenticate } from "../middleware/authenticate.js";
const router = express.Router();
router.post("/url", validateResource(destinationSchema), authenticate, createShortUrl);
router.get("/:shortId", handleRedirect);
router.get("/analytics/:id", getAnalytics);
router.get("/qr/:shortId", generateQRCode);
router.get("/mylinks/:id", authenticate, getLinkHistory);
export default router;
//# sourceMappingURL=index.js.map