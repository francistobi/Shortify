import shortUrl from "../models/shorturl.model.js";
import QRCode from "qrcode";
export async function generateQRCode(req, res) {
    const { shortId } = req.params;
    try {
        const short = await shortUrl.findOne({ shortId });
        if (!short) {
            return res.status(404).send("Short URL not found");
        }
        const qrCodeUrl = await QRCode.toDataURL(short.destination);
        res.json({ qrCodeUrl });
    }
    catch (error) {
        console.error("Error generating QR code:", error);
        res.status(500).send("Internal Server Error");
    }
}
//# sourceMappingURL=qrcode.controller.js.map