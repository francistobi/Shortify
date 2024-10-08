import validator from "validator";
import shortUrl from "../models/shorturl.model.js";
import User from "../models/user.model.js";
import analytics from "../models/analytics.model.js";
export async function createShortUrl(req, res) {
    const { destination, customSlug } = req.body;
    const userId = req.user.id;
    if (customSlug) {
        const existingUrl = await shortUrl.findOne({ customSlug });
        if (existingUrl) {
            return res.status(400).json({ message: "Custom slug is already in use." });
        }
    }
    if (!validator.isURL(destination)) {
        return res.status(400).json({ error: "Invalid URL" });
    }
    const newUrl = await shortUrl.create({
        destination,
        customSlug,
        user: userId,
    });
    await User.findByIdAndUpdate(userId, { $push: { shortUrls: newUrl._id } });
    res.status(201).json(newUrl);
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
            destination: short.destination,
            ipAddress: req.ip,
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
    const id = req.params.id;
    const allAnalytics = await analytics.find({ shortUrl: id }).lean();
    if (!allAnalytics) {
        res.status(404).send("No analytics found");
    }
    return res.send(allAnalytics);
}
export async function getLinkHistory(req, res) {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(401).send("User not authenticated");
        }
        const userLinks = await shortUrl.find({ user: userId }).lean();
        if (!userLinks || userLinks.length === 0) {
            return res.status(404).send("No links found for this user");
        }
        return res.send(userLinks);
    }
    catch (error) {
        console.error("Error fetching link history:", error);
        return res
            .status(500)
            .send("An error occurred while fetching link history");
    }
}
export const deleteShortenedUrl = async (req, res) => {
    try {
        const userid = req.user.id;
        console.log(userid);
        const { id } = req.params;
        const result = await shortUrl.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Shortened URL not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Shortened URL deleted successfully",
        });
    }
    catch (error) {
        console.error("Error deleting shortened URL:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while deleting the shortened URL",
        });
    }
};
//# sourceMappingURL=shorturl.controller.js.map