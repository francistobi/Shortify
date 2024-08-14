import mongoose, {Document} from "mongoose";
import {ShortUrl} from "../models/shorturl.model.js";

interface Analytics extends Document {
  shortUrl: ShortUrl;
}

const schema = new mongoose.Schema(
  {
    shortUrl: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "shortUrl",
      required: true,
    },
    ipAddress: { type: String },
  },
  { timestamps: true }
);

const analytics = mongoose.model<Analytics>("analytics", schema);

export default analytics;
