import {Express,Request,Response}from "express";
import {
  createShortUrl,
  handleRedirect,
  getAnalytics,
} from "../controllers/shorturl.controller.js";
import{generateQRCode} from "../controllers/qrcode.controller.js"
import validateResource from "../middleware/validate.js";
import destinationSchema from "../schemas/createshorturl.schema.js"


export function routes (app: Express) {
    
  app.post("/api/url", validateResource(destinationSchema), createShortUrl);


  app.get("/:shortId", handleRedirect)
  app.get("/api/analytics", getAnalytics);
  app.get("/qr/:shortId", generateQRCode);
  
}