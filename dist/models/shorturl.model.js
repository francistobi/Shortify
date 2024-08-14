import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz123456789", 8);
const schema = new mongoose.Schema({
    shortId: {
        type: String,
        unique: true,
        required: true,
        default: () => nanoid(),
    },
    destination: {
        type: String,
        required: true,
    },
    customSlug: { type: String, unique: true, sparse: true },
    clicks: { type: Number, default: 0 },
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
});
const shortUrl = mongoose.model("shortUrl", schema);
export default shortUrl;
//# sourceMappingURL=shorturl.model.js.map