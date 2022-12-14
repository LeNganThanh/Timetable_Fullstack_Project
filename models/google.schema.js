import mongoose from "mongoose";

const Schema = mongoose.Schema;

const googleAccSchema = new Schema({
  displayName: { type: String },
  imageUrl: { type: String },
  id: { type: String },
});

const GoogleAccountCollection = mongoose.model(
  "googleaccount",
  googleAccSchema
);

export default GoogleAccountCollection;
