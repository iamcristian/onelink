import mongoose, { Document, Schema } from "mongoose";

export interface ISocialNetwork {
  id: number;
  name: string;
  url: string;
  enabled: boolean;
  clicks: number;
}

// Document includes properties like save, validate, and remove
export interface IUser extends Document {
  handle: string;
  name: string;
  email: string;
  password: string;
  description: string;
  image: string;
  links: ISocialNetwork[];
  profileTheme: string;
}

const socialNetworkSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  url: {
    type: String,
    trim: true,
    default: "",
  },
  enabled: {
    type: Boolean,
    default: false,
  },
  clicks: {
    type: Number,
    default: 0,
  },
}, { _id: false });

// Schema is a class used to define the structure of documents within a collection
const userSchema = new Schema({
  handle: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
  profileTheme: {
    type: String,
    default: "midnight",
  },
  links: {
    type: [socialNetworkSchema],
    default: [],
  },
});

// The model is the class with which we construct documents
const User = mongoose.model<IUser>("User", userSchema);
export default User;
