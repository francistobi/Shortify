import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  shortUrls: mongoose.Types.ObjectId[];
}

const userSchema: Schema = new Schema({
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

const User = mongoose.model<IUser>("User", userSchema);

export default User;
