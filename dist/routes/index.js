import { createShortUrl, handleRedirect, } from "../controllers/shorturl.controller.js";
import validateResource from "../middleware/validate.js";
import destinationSchema from "../schemas/createshorturl.schema.js";
export function routes(app) {
    app.post("/api/url", validateResource(destinationSchema), createShortUrl);
    app.get("/:shortId", handleRedirect);
}
//# sourceMappingURL=index.js.map