import validator from "validator";
import shortUrl from "../models/shorturl.model.js";
import analytics from "../models/analytics.model.js";
export async function createShortUrl(req, res) {
    const { destination, customSlug } = req.body;
    if (customSlug) {
        const existingUrl = await shortUrl.findOne({ customSlug });
        if (existingUrl) {
            return res.status(400).json({ message: "Custom slug is already in use." });
        }
    }
    if (!validator.isURL(destination)) {
        return res.status(400).json({ error: "Invalid URL" });
    }
    const newUrl = await shortUrl.create({ destination, customSlug });
    res.send(newUrl);
}
export async function handleRedirect(req, res) {
    const { shortId } = req.params;
    const { customSlug } = req.query;
    try {
        const short = await shortUrl.findOne({ shortId }).lean();
        if (!short) {
            return res.sendStatus(404);
        }
        analytics.create({
            shortUrl: short._id,
            customSlug: customSlug,
        });
        const destination = typeof customSlug === "string" ? customSlug : short.destination;
        console.log(`Redirecting to: ${destination}`);
        res.redirect(destination);
    }
    catch (error) {
        console.error("Error handling redirect:", error);
        res.sendStatus(500);
    }
}
export async function getAnalytics(req, res) {
    const allAnalytics = await analytics.find({}).lean();
    return res.send(allAnalytics);
}
//# sourceMappingURL=shorturl.controller.js.map