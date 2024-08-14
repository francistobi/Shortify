import mongoose, { Schema } from "mongoose";
const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname: {
        type: "string",
        required: true,
    },
    lastname: {
        type: "string",
        required: true,
    },
    shortUrls: [{ type: mongoose.Types.ObjectId, ref: "ShortUrl" }],
});
const User = mongoose.model("User", userSchema);
export default User;
//# sourceMappingURL=user.model.js.map