import shortUrl from "../models/shorturl.model.js";
import analytics from "../models/analytics.model.js";
export async function createShortUrl(req, res) {
    const { destination } = req.body;
    const newUrl = await shortUrl.create({ destination });
    res.send(newUrl);
}
export async function handleRedirect(req, res) {
    const { shortId } = req.params;
    try {
        const short = await shortUrl.findOne({ shortId }).lean();
        if (!short) {
            return res.sendStatus(404);
        }
        analytics.create({
            shortUrl: short._id,
        });
        console.log(`Redirecting to: ${short.destination}`);
        res.redirect(short.destination);
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